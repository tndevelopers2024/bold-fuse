"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
  type FormEvent,
} from "react";
import { PostingDescription } from "./PostingDescription";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowUp,
  ArrowUpRight,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  FileText,
  LogOut,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  Users,
  WifiOff,
  X,
} from "lucide-react";
import {
  deleteCandidate,
  deleteJob,
  logout,
  publishJob,
  updateCandidateResume,
  updateJob,
  setJobOpen,
  updateStage,
} from "@/lib/hiring/actions";
import {
  stages,
  type AdminCandidate,
  type AdminPosting,
  type Stage,
  type StageCounts,
} from "@/lib/hiring/types";
import { useLiveHiringSync } from "@/components/hiring/LiveUpdates";
import {
  CreatePostingModal,
  type PostingDraft,
} from "@/components/hiring/CreatePostingModal";
import { ConfirmDeleteDialog } from "@/components/hiring/ConfirmDeleteDialog";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function formatDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return dateFormatter.format(date);
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function stageBadgeClass(stage: Stage) {
  switch (stage) {
    case "Applied":
      return "border border-accent/40 bg-accent/12 text-accent-ink";
    case "Reviewing":
      return "border border-forest/25 bg-forest/8 text-forest";
    case "Interview":
      return "border border-forest bg-forest text-white";
    case "Hired":
      return "border border-accent-ink bg-accent-ink text-white";
    case "Rejected":
      return "border border-danger/35 bg-danger/8 text-danger";
  }
}

type StatusFilter = "all" | "open" | "closed";
type StageFilter = "All" | Stage;

interface BannerNotice {
  tone: "success" | "error";
  text: string;
}

interface AdminDashboardProps {
  postings: AdminPosting[];
  selectedJobId: string | null;
  candidates: AdminCandidate[];
  totalPipeline: StageCounts;
}

const emptyDraft: PostingDraft = {
  title: "",
  location: "",
  description: "",
};

const postingsPerPage = 8;
const candidatesPerPage = 8;

export function AdminDashboard({
  postings,
  selectedJobId,
  candidates,
  totalPipeline,
}: AdminDashboardProps) {
  const router = useRouter();
  const { state: connectionState, manualRefresh } = useLiveHiringSync(true);

  // Posting directory filters (preserved across incoming live updates)
  const [postingQuery, setPostingQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [postingPage, setPostingPage] = useState(() =>
    Math.floor(
      Math.max(0, postings.findIndex((posting) => posting.id === selectedJobId)) /
        postingsPerPage,
    ),
  );

  // Candidate workspace filters (preserved across incoming live updates)
  const [candidateQuery, setCandidateQuery] = useState("");
  const [candidatePage, setCandidatePage] = useState(0);
  const [stageFilter, setStageFilter] = useState<StageFilter>("All");
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  // Unsaved draft for "Create a posting" modal (preserved across SSE refreshes)
  const [createOpen, setCreateOpen] = useState(false);
  const [draft, setDraft] = useState<PostingDraft>(emptyDraft);
  const [editing, setEditing] = useState<(PostingDraft & { id: string }) | null>(null);
  const [publishPending, setPublishPending] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);

  // Unsaved stage selections per candidate ID (preserved across SSE refreshes)
  const [stageDrafts, setStageDrafts] = useState<Record<string, Stage>>({});
  const [savingCandidateIds, setSavingCandidateIds] = useState<
    Record<string, boolean>
  >({});
  const [candidateFeedback, setCandidateFeedback] = useState<
    Record<string, BannerNotice>
  >({});

  // Editing candidate resume URL
  const [editingResumeId, setEditingResumeId] = useState<string | null>(null);
  const [editingResumeUrl, setEditingResumeUrl] = useState("");
  const [savingResumeId, setSavingResumeId] = useState<string | null>(null);

  // Posting open/close pending state per job ID
  const [togglingJobIds, setTogglingJobIds] = useState<Record<string, boolean>>(
    {},
  );

  // Delete confirmation modal state
  const [deleteTarget, setDeleteTarget] = useState<
    | { kind: "job"; posting: AdminPosting }
    | { kind: "candidate"; candidate: AdminCandidate; jobTitle: string }
    | null
  >(null);
  const [deletePending, setDeletePending] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Global action banner
  const [notice, setNotice] = useState<BannerNotice | null>(null);

  // Job selection transition
  const [isSelectingJob, startSelectTransition] = useTransition();
  const [pendingJobId, setPendingJobId] = useState<string | null>(null);
  const candidatesSectionRef = useRef<HTMLElement>(null);

  // Manual refresh animation feedback
  const [isRefreshing, startRefreshTransition] = useTransition();
  const [refreshAnimating, setRefreshAnimating] = useState(false);
  const [refreshSpinKey, setRefreshSpinKey] = useState(0);
  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    };
  }, []);

  function handleManualRefresh() {
    setRefreshSpinKey((count) => count + 1);
    setRefreshAnimating(true);
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    refreshTimerRef.current = setTimeout(() => {
      setRefreshAnimating(false);
      refreshTimerRef.current = null;
    }, 650);
    startRefreshTransition(() => {
      manualRefresh();
    });
  }

  const showRefreshSpin = refreshAnimating || isRefreshing;

  const selectedPosting = useMemo(
    () =>
      postings.find((posting) => posting.id === selectedJobId) ??
      postings[0] ??
      null,
    [postings, selectedJobId],
  );

  const openCount = useMemo(
    () => postings.filter((posting) => posting.open).length,
    [postings],
  );
  const closedCount = postings.length - openCount;
  const totalApplications = useMemo(
    () => postings.reduce((sum, posting) => sum + posting.applicants, 0),
    [postings],
  );
  const activePipelineCount =
    totalPipeline.Applied + totalPipeline.Reviewing + totalPipeline.Interview;

  const filteredPostings = useMemo(() => {
    const query = postingQuery.trim().toLowerCase();
    return postings.filter((posting) => {
      if (statusFilter === "open" && !posting.open) return false;
      if (statusFilter === "closed" && posting.open) return false;
      if (!query) return true;
      return (
        posting.title.toLowerCase().includes(query) ||
        posting.location.toLowerCase().includes(query) ||
        posting.description.toLowerCase().includes(query)
      );
    });
  }, [postings, postingQuery, statusFilter]);

  const lastPostingPage = Math.max(
    0,
    Math.ceil(filteredPostings.length / postingsPerPage) - 1,
  );
  const currentPostingPage = Math.min(postingPage, lastPostingPage);
  const firstPostingIndex = currentPostingPage * postingsPerPage;
  const visiblePostings = filteredPostings.slice(
    firstPostingIndex,
    firstPostingIndex + postingsPerPage,
  );

  const selectedStageCounts = useMemo(() => {
    const counts: StageCounts = {
      Applied: 0,
      Reviewing: 0,
      Interview: 0,
      Hired: 0,
      Rejected: 0,
    };
    for (const candidate of candidates) {
      counts[candidate.stage] += 1;
    }
    return counts;
  }, [candidates]);

  const filteredCandidates = useMemo(() => {
    const query = candidateQuery.trim().toLowerCase();
    return candidates.filter((candidate) => {
      if (stageFilter !== "All" && candidate.stage !== stageFilter)
        return false;
      if (!query) return true;
      return (
        candidate.name.toLowerCase().includes(query) ||
        candidate.email.toLowerCase().includes(query) ||
        (candidate.phone ?? "").toLowerCase().includes(query)
      );
    });
  }, [candidates, candidateQuery, stageFilter]);

  const lastCandidatePage = Math.max(
    0,
    Math.ceil(filteredCandidates.length / candidatesPerPage) - 1,
  );
  const currentCandidatePage = Math.min(candidatePage, lastCandidatePage);
  const firstCandidateIndex = currentCandidatePage * candidatesPerPage;
  const visibleCandidates = filteredCandidates.slice(
    firstCandidateIndex,
    firstCandidateIndex + candidatesPerPage,
  );

  const hasUnsavedPostingDraft = Boolean(
    draft.title.trim() || draft.location.trim() || draft.description.trim(),
  );

  function selectPosting(id: string, scrollOnMobile = false) {
    if (selectedPosting?.id === id) {
      if (scrollOnMobile && window.innerWidth < 1024) {
        candidatesSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
    setPendingJobId(id);
    setStageFilter("All");
    setCandidateQuery("");
    setCandidatePage(0);
    setDescriptionExpanded(false);
    startSelectTransition(() => {
      router.replace(`/admin/?job=${encodeURIComponent(id)}`, {
        scroll: false,
      });
    });
    if (scrollOnMobile && window.innerWidth < 1024) {
      candidatesSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }

  async function handlePublishSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPublishError(null);
    setPublishPending(true);
    try {
      const posting = editing ?? draft;
      const formData = new FormData();
      formData.set("title", posting.title);
      formData.set("location", posting.location);
      formData.set("description", posting.description);
      if (editing) {
        formData.set("postingDate", editing.postingDate ?? "");
        const result = await updateJob(editing.id, formData);
        if (!result.ok) {
          setPublishError(result.error ?? "Could not save the posting.");
          return;
        }
        setEditing(null);
        setNotice({ tone: "success", text: result.message ?? "Posting updated." });
        router.refresh();
        return;
      }
      const result = await publishJob(formData);
      if (!result.ok) {
        setPublishError(
          result.error ?? "Could not publish the posting. Please try again.",
        );
        return;
      }
      setDraft(emptyDraft);
      setCreateOpen(false);
      setStatusFilter("all");
      setPostingQuery("");
      setPostingPage(0);
      setStageFilter("All");
      setCandidateQuery("");
      setCandidatePage(0);
      setNotice({
        tone: "success",
        text: result.message ?? "Posting published and live on Careers.",
      });
      if (result.data?.jobId) {
        setPendingJobId(result.data.jobId);
        startSelectTransition(() => {
          router.replace(`/admin/?job=${encodeURIComponent(result.data!.jobId)}`, {
            scroll: false,
          });
        });
      } else {
        router.refresh();
      }
    } catch {
      setPublishError(
        "Unable to reach the server. Your draft has been kept — please try again.",
      );
    } finally {
      setPublishPending(false);
    }
  }

  async function handleToggleJobOpen(posting: AdminPosting) {
    setTogglingJobIds((prev) => ({ ...prev, [posting.id]: true }));
    setNotice(null);
    try {
      const result = await setJobOpen(posting.id, !posting.open);
      if (!result.ok) {
        setNotice({
          tone: "error",
          text:
            result.error ?? "Could not update the posting status. Try again.",
        });
        return;
      }
      setNotice({
        tone: "success",
        text: result.message ?? "Posting status updated.",
      });
      router.refresh();
    } catch {
      setNotice({
        tone: "error",
        text: "Network error while updating the posting status. Please try again.",
      });
    } finally {
      setTogglingJobIds((prev) => {
        const next = { ...prev };
        delete next[posting.id];
        return next;
      });
    }
  }

  async function handleSaveStage(candidate: AdminCandidate) {
    const targetStage = stageDrafts[candidate.id] ?? candidate.stage;
    setSavingCandidateIds((prev) => ({ ...prev, [candidate.id]: true }));
    setCandidateFeedback((prev) => {
      const next = { ...prev };
      delete next[candidate.id];
      return next;
    });
    try {
      const result = await updateStage(candidate.id, targetStage);
      if (!result.ok) {
        setCandidateFeedback((prev) => ({
          ...prev,
          [candidate.id]: {
            tone: "error",
            text: result.error ?? "Could not save status. Try again.",
          },
        }));
        return;
      }
      setStageDrafts((prev) => {
        const next = { ...prev };
        delete next[candidate.id];
        return next;
      });
      setCandidateFeedback((prev) => ({
        ...prev,
        [candidate.id]: {
          tone: "success",
          text: result.message ?? `Saved as ${targetStage}.`,
        },
      }));
      router.refresh();
    } catch {
      setCandidateFeedback((prev) => ({
        ...prev,
        [candidate.id]: {
          tone: "error",
          text: "Network error while saving status. Your selection was kept.",
        },
      }));
    } finally {
      setSavingCandidateIds((prev) => {
        const next = { ...prev };
        delete next[candidate.id];
        return next;
      });
    }
  }

  async function handleSaveResumeUrl(candidateId: string) {
    setSavingResumeId(candidateId);
    try {
      const result = await updateCandidateResume(candidateId, editingResumeUrl);
      if (!result.ok) {
        setCandidateFeedback((prev) => ({
          ...prev,
          [candidateId]: {
            tone: "error",
            text: result.error ?? "Could not save resume link.",
          },
        }));
        return;
      }
      setEditingResumeId(null);
      setCandidateFeedback((prev) => ({
        ...prev,
        [candidateId]: {
          tone: "success",
          text: result.message ?? "Resume link updated.",
        },
      }));
      router.refresh();
    } catch {
      setCandidateFeedback((prev) => ({
        ...prev,
        [candidateId]: {
          tone: "error",
          text: "Network error while saving resume link.",
        },
      }));
    } finally {
      setSavingResumeId(null);
    }
  }

  async function handleConfirmDelete() {
    if (!deleteTarget) return;
    setDeleteError(null);
    setDeletePending(true);
    try {
      if (deleteTarget.kind === "job") {
        const deletedId = deleteTarget.posting.id;
        const result = await deleteJob(deletedId);
        if (!result.ok) {
          setDeleteError(
            result.error ?? "Could not delete the job posting. Try again.",
          );
          return;
        }
        setDeleteTarget(null);
        setNotice({
          tone: "success",
          text:
            result.message ??
            `Deleted posting “${deleteTarget.posting.title}”.`,
        });
        if (selectedPosting?.id === deletedId) {
          const fallback = postings.find((p) => p.id !== deletedId);
          setStageFilter("All");
          setCandidateQuery("");
          setCandidatePage(0);
          setDescriptionExpanded(false);
          startSelectTransition(() => {
            router.replace(
              fallback
                ? `/admin/?job=${encodeURIComponent(fallback.id)}`
                : "/admin/",
              { scroll: false },
            );
          });
        } else {
          router.refresh();
        }
      } else {
        const deletedCandidateId = deleteTarget.candidate.id;
        const result = await deleteCandidate(deletedCandidateId);
        if (!result.ok) {
          setDeleteError(
            result.error ?? "Could not delete the candidate. Try again.",
          );
          return;
        }
        setStageDrafts((prev) => {
          const next = { ...prev };
          delete next[deletedCandidateId];
          return next;
        });
        setCandidateFeedback((prev) => {
          const next = { ...prev };
          delete next[deletedCandidateId];
          return next;
        });
        setDeleteTarget(null);
        setNotice({
          tone: "success",
          text:
            result.message ??
            `Deleted candidate “${deleteTarget.candidate.name}”.`,
        });
        router.refresh();
      }
    } catch {
      setDeleteError("Network error while deleting. Please try again.");
    } finally {
      setDeletePending(false);
    }
  }

  const connectionLabel =
    connectionState === "connected"
      ? "Live updates"
      : connectionState === "offline"
        ? "Offline"
        : connectionState === "reconnecting"
          ? "Reconnecting…"
          : "Connecting…";

  return (
    <main id="main-content" className="bg-white">
      <div className="mx-auto w-full max-w-[80rem] space-y-5 px-3 py-4 sm:space-y-6 sm:px-6 sm:py-8 md:px-10 xl:px-16">
        {/* Compact Dashboard Header with Metrics, Live Status & Sign-out */}
        <header className="relative isolate overflow-hidden rounded-2xl border border-forest-soft/40 bg-forest-surface p-4 text-white sm:rounded-3xl sm:px-7 sm:py-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_0%_0%,rgba(2,170,119,0.28),transparent_55%),radial-gradient(ellipse_at_100%_100%,rgba(97,198,168,0.18),transparent_50%)]"
          >
            <svg
              viewBox="0 0 1200 320"
              preserveAspectRatio="none"
              focusable="false"
              className="absolute inset-0 h-full w-full text-accent-soft"
              fill="none"
            >
              <path
                d="M650 360C850 330 820 190 1020 210S1185 110 1260 65L1260 360Z"
                fill="currentColor"
                opacity="0.035"
              />
              <path
                d="M620 355C830 320 805 165 1005 188S1175 85 1260 40"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.14"
              />
              <path
                d="M715 360C905 330 860 220 1055 238S1215 140 1265 105"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.09"
              />
            </svg>
          </div>

          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <p className="text-xs font-semibold tracking-[0.18em] text-accent-soft uppercase">
                  Boldfuse Recruiting
                </p>
                <span
                  role="status"
                  aria-live="polite"
                  data-connection-state={connectionState}
                  className={
                    connectionState === "reconnecting" ||
                    connectionState === "offline"
                      ? "inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/15 px-2.5 py-0.5 text-xs font-semibold text-white"
                      : "inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white/95"
                  }
                >
                  {connectionState === "offline" ? (
                    <WifiOff size={12} aria-hidden="true" />
                  ) : (
                    <span
                      aria-hidden="true"
                      className={
                        connectionState === "connected"
                          ? "h-2 w-2 rounded-full bg-accent"
                          : connectionState === "reconnecting"
                            ? "h-2 w-2 rounded-full bg-white"
                            : "h-2 w-2 rounded-full bg-accent-soft"
                      }
                    />
                  )}
                  {connectionLabel}
                </span>
              </div>
              <h1 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Hiring dashboard
              </h1>
            </div>

            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setPublishError(null);
                  setCreateOpen(true);
                }}
                className="inline-flex min-h-11 w-full touch-manipulation items-center justify-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-forest hover:bg-accent-soft focus-visible:outline-accent-soft sm:min-h-10 sm:w-auto"
              >
                <Plus size={16} aria-hidden="true" />
                <span>Create a posting</span>
                {hasUnsavedPostingDraft && (
                  <span className="rounded-full bg-forest/10 px-2 py-0.5 text-xs font-semibold text-forest">
                    Draft
                  </span>
                )}
              </button>

              <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:items-center sm:gap-2.5">
                <Link
                  href="/careers/#openings"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 touch-manipulation items-center justify-center gap-1.5 rounded-full border border-white/25 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10 focus-visible:outline-accent-soft sm:min-h-10 sm:px-4 sm:text-sm"
                >
                  <span className="truncate">Public Careers</span>
                  <ArrowUpRight
                    size={14}
                    aria-hidden="true"
                    className="shrink-0"
                  />
                </Link>

                <form action={logout} className="flex">
                  <button
                    type="submit"
                    className="inline-flex min-h-11 w-full touch-manipulation items-center justify-center gap-1.5 rounded-full border border-white/25 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10 focus-visible:outline-accent-soft sm:min-h-10 sm:w-auto sm:px-4 sm:text-sm"
                  >
                    <LogOut
                      size={14}
                      aria-hidden="true"
                      className="shrink-0"
                    />
                    <span>Sign out</span>
                  </button>
                </form>
              </div>
            </div>
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-2.5 border-t border-white/15 pt-4 sm:mt-5 sm:gap-3 lg:grid-cols-4">
            <div className="min-w-0 rounded-2xl border border-white/12 bg-white/[0.05] px-3 py-2.5 sm:px-4 sm:py-3">
              <dt className="text-[11px] leading-snug font-semibold tracking-wider text-accent-soft uppercase sm:text-xs">
                Open postings
              </dt>
              <dd className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="font-heading text-xl font-bold text-white tabular-nums sm:text-2xl">
                  {openCount}
                </span>
                <span className="text-xs font-medium text-white/75">
                  Live on Careers
                </span>
              </dd>
            </div>

            <div className="min-w-0 rounded-2xl border border-white/12 bg-white/[0.05] px-3 py-2.5 sm:px-4 sm:py-3">
              <dt className="text-[11px] leading-snug font-semibold tracking-wider text-accent-soft uppercase sm:text-xs">
                Closed postings
              </dt>
              <dd className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="font-heading text-xl font-bold text-white tabular-nums sm:text-2xl">
                  {closedCount}
                </span>
                <span className="text-xs font-medium text-white/75">
                  Paused roles
                </span>
              </dd>
            </div>

            <div className="min-w-0 rounded-2xl border border-white/12 bg-white/[0.05] px-3 py-2.5 sm:px-4 sm:py-3">
              <dt className="text-[11px] leading-snug font-semibold tracking-wider text-accent-soft uppercase sm:text-xs">
                Applications
              </dt>
              <dd className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="font-heading text-xl font-bold text-white tabular-nums sm:text-2xl">
                  {totalApplications}
                </span>
                <span className="text-xs font-medium text-white/75">
                  Total received
                </span>
              </dd>
            </div>

            <div className="min-w-0 rounded-2xl border border-white/12 bg-white/[0.05] px-3 py-2.5 sm:px-4 sm:py-3">
              <dt className="text-[11px] leading-snug font-semibold tracking-wider text-accent-soft uppercase sm:text-xs">
                Active pipeline
              </dt>
              <dd className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="font-heading text-xl font-bold text-white tabular-nums sm:text-2xl">
                  {activePipelineCount}
                </span>
                <span className="text-xs font-medium text-white/75 tabular-nums">
                  {totalPipeline.Hired} hired
                </span>
              </dd>
            </div>
          </dl>
        </header>

        {/* Reconnecting / Offline Banner */}
        {(connectionState === "reconnecting" ||
          connectionState === "offline") && (
          <div
            role="status"
            aria-live="polite"
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-forest/30 bg-white px-4 py-3 text-sm font-medium text-forest"
          >
            <div className="flex items-center gap-2.5">
              {connectionState === "offline" ? (
                <WifiOff
                  size={17}
                  aria-hidden="true"
                  className="shrink-0 text-forest"
                />
              ) : (
                <RefreshCw
                  size={17}
                  aria-hidden="true"
                  className="shrink-0 text-accent-ink"
                />
              )}
              <span>
                {connectionState === "offline"
                  ? "You appear to be offline. Your unsaved edits are preserved and live updates will resume when you reconnect."
                  : "Live updates are reconnecting. Your unsaved edits are safe and changes will sync automatically."}
              </span>
            </div>
            <button
              type="button"
              onClick={handleManualRefresh}
              aria-busy={showRefreshSpin}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-forest bg-white px-4 py-1.5 text-xs font-semibold text-forest hover:bg-forest hover:text-white"
            >
              <RefreshCw
                key={refreshSpinKey}
                size={13}
                aria-hidden="true"
                data-refresh-spin={showRefreshSpin ? "true" : undefined}
              />
              {showRefreshSpin ? "Refreshing…" : "Refresh now"}
            </button>
          </div>
        )}

        {/* Action Feedback Banner */}
        {notice && (
          <div
            role={notice.tone === "error" ? "alert" : "status"}
            className={
              notice.tone === "error"
                ? "flex items-center justify-between gap-3 rounded-2xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm font-semibold text-danger"
                : "flex items-center justify-between gap-3 rounded-2xl border border-accent/35 bg-accent/10 px-4 py-3 text-sm font-semibold text-forest"
            }
          >
            <div className="flex items-center gap-2.5">
              {notice.tone === "error" ? (
                <AlertCircle
                  size={17}
                  aria-hidden="true"
                  className="shrink-0"
                />
              ) : (
                <CheckCircle2
                  size={17}
                  aria-hidden="true"
                  className="shrink-0 text-accent-ink"
                />
              )}
              <span>{notice.text}</span>
            </div>
            <button
              type="button"
              onClick={() => setNotice(null)}
              aria-label="Dismiss notification"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-current hover:bg-forest/10"
            >
              <X size={15} aria-hidden="true" />
            </button>
          </div>
        )}

        {/* Primary Master-Detail Recruiting Workspace */}
        <div className="grid items-start gap-5 sm:gap-6 lg:grid-cols-[minmax(330px,400px)_minmax(0,1fr)] xl:grid-cols-[420px_minmax(0,1fr)]">
          {/* Left Pane: Job Postings Directory */}
          <section
            id="postings"
            aria-labelledby="postings-heading"
            className="min-w-0 scroll-mt-24 rounded-2xl border border-line bg-white p-4 sm:rounded-3xl sm:p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <h2
                  id="postings-heading"
                  className="font-heading text-xl font-bold text-forest"
                >
                  Job postings
                </h2>
                <span className="rounded-full border border-line px-2.5 py-0.5 text-xs font-semibold text-muted tabular-nums">
                  {filteredPostings.length}
                  {filteredPostings.length !== postings.length
                    ? ` / ${postings.length}`
                    : ""}
                </span>
              </div>
              <button
                type="button"
                onClick={handleManualRefresh}
                aria-label="Sync latest data"
                aria-busy={showRefreshSpin}
                title={showRefreshSpin ? "Syncing…" : "Sync latest data"}
                className={
                  showRefreshSpin
                    ? "inline-flex h-10 w-10 shrink-0 touch-manipulation items-center justify-center rounded-full border border-accent-ink bg-accent/10 text-accent-ink sm:h-9 sm:w-9"
                    : "inline-flex h-10 w-10 shrink-0 touch-manipulation items-center justify-center rounded-full border border-line bg-white text-forest hover:border-forest sm:h-9 sm:w-9"
                }
              >
                <RefreshCw
                  key={refreshSpinKey}
                  size={15}
                  aria-hidden="true"
                  data-refresh-spin={showRefreshSpin ? "true" : undefined}
                />
              </button>
            </div>

            {/* Search & Status Filters */}
            <div className="mt-4 space-y-3">
              <div className="relative">
                <label htmlFor="posting-search" className="sr-only">
                  Search job postings
                </label>
                <Search
                  size={16}
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted"
                />
                <input
                  id="posting-search"
                  type="search"
                  value={postingQuery}
                  onChange={(event) => {
                    setPostingQuery(event.target.value);
                    setPostingPage(0);
                  }}
                  placeholder="Search postings by title or location…"
                  className="w-full appearance-none rounded-xl border border-line bg-white py-2.5 pr-10 pl-10 font-description text-base font-medium text-forest placeholder:text-muted/75 focus:border-accent-ink focus:outline-none focus:ring-2 focus:ring-accent-ink/20 sm:text-sm [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
                />
                {postingQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setPostingQuery("");
                      setPostingPage(0);
                    }}
                    aria-label="Clear posting search"
                    className="absolute top-1/2 right-1.5 flex h-8 w-8 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full text-muted hover:text-forest"
                  >
                    <X size={14} aria-hidden="true" />
                  </button>
                )}
              </div>

              <div
                role="group"
                aria-label="Filter postings by status"
                className="flex flex-wrap gap-1.5 sm:gap-2"
              >
                {(
                  [
                    ["all", "All", postings.length],
                    ["open", "Open", openCount],
                    ["closed", "Closed", closedCount],
                  ] as const
                ).map(([key, label, count]) => {
                  const active = statusFilter === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      aria-pressed={active}
                      onClick={() => {
                        setStatusFilter(key);
                        setPostingPage(0);
                      }}
                      className={
                        active
                          ? "inline-flex min-h-10 touch-manipulation items-center gap-1.5 rounded-full border border-forest bg-forest px-3.5 py-1.5 text-xs font-semibold text-white sm:min-h-9"
                          : "inline-flex min-h-10 touch-manipulation items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-semibold text-forest hover:border-forest sm:min-h-9"
                      }
                    >
                      <span>{label}</span>
                      <span
                        className={
                          active
                            ? "rounded-full bg-white/15 px-1.5 py-0.5 text-[11px] tabular-nums"
                            : "rounded-full bg-forest/8 px-1.5 py-0.5 text-[11px] text-muted tabular-nums"
                        }
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Postings List or Empty States */}
            <div className="mt-4 space-y-3">
              {postings.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-line px-5 py-10 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-forest/6 text-forest">
                    <Briefcase size={22} aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-bold text-forest">
                    No job postings yet
                  </h3>
                  <p className="mx-auto mt-2 max-w-xs font-description text-sm font-medium text-muted">
                    Create your first role to publish it on Boldfuse Careers and
                    review candidates here in real time.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setPublishError(null);
                      setCreateOpen(true);
                    }}
                    className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-full bg-forest px-5 py-2 text-sm font-semibold text-white hover:bg-forest-soft"
                  >
                    <Plus size={16} aria-hidden="true" />
                    Create a posting
                  </button>
                </div>
              ) : filteredPostings.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-line px-5 py-8 text-center">
                  <h3 className="font-heading text-base font-bold text-forest">
                    No matching postings
                  </h3>
                  <p className="mt-1.5 font-description text-sm font-medium text-muted">
                    Try adjusting your search or status filter to view other
                    openings.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setPostingQuery("");
                      setStatusFilter("all");
                      setPostingPage(0);
                    }}
                    className="mt-4 inline-flex min-h-9 items-center rounded-full border border-forest bg-white px-4 py-1.5 text-xs font-semibold text-forest hover:bg-forest hover:text-white"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                <ul className="overflow-hidden rounded-xl border border-line">
                  {visiblePostings.map((posting) => {
                    const isSelected = selectedPosting?.id === posting.id;
                    const isLoading =
                      isSelectingJob && pendingJobId === posting.id;

                    return (
                      <li
                        key={posting.id}
                        data-posting-id={posting.id}
                        className="border-b border-line last:border-b-0"
                      >
                        <button
                          type="button"
                          onClick={() => selectPosting(posting.id, true)}
                          aria-current={isSelected ? "true" : undefined}
                          aria-busy={isLoading}
                          aria-controls="candidates"
                          className={
                            isSelected
                              ? "flex w-full items-start justify-between gap-3 border-l-4 border-accent-ink bg-accent/8 px-3 py-2.5 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent-ink"
                              : "flex w-full items-start justify-between gap-3 border-l-4 border-transparent bg-white px-3 py-2.5 text-left hover:bg-accent/5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent-ink"
                          }
                        >
                          <span className="min-w-0">
                            <span className="block font-heading text-sm font-bold break-words text-forest">
                              {posting.title}
                            </span>
                            <span className="mt-0.5 block text-xs font-medium break-words text-muted">
                              {posting.location}
                            </span>
                          </span>
                          <span className="shrink-0 text-right text-xs font-medium tabular-nums">
                            <span
                              className={
                                posting.open
                                  ? "block font-semibold text-accent-ink"
                                  : "block font-semibold text-muted"
                              }
                            >
                              {posting.open ? "Open" : "Closed"}
                            </span>
                            <span className="mt-0.5 block text-muted">
                              {isLoading
                                ? "Loading…"
                                : `${posting.applicants} ${posting.applicants === 1 ? "applicant" : "applicants"}`}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {lastPostingPage > 0 && (
              <nav
                aria-label="Job posting pages"
                className="mt-3 flex flex-wrap items-center justify-between gap-2"
              >
                <button
                  type="button"
                  disabled={currentPostingPage === 0}
                  onClick={() => setPostingPage(currentPostingPage - 1)}
                  className="min-h-10 rounded-full border border-line px-3 text-xs font-semibold text-forest enabled:hover:border-forest disabled:opacity-50"
                >
                  Previous
                </button>
                <span aria-live="polite" className="text-xs font-medium text-muted tabular-nums">
                  {firstPostingIndex + 1}–{firstPostingIndex + visiblePostings.length} of {filteredPostings.length}
                </span>
                <button
                  type="button"
                  disabled={currentPostingPage === lastPostingPage}
                  onClick={() => setPostingPage(currentPostingPage + 1)}
                  className="min-h-10 rounded-full border border-line px-3 text-xs font-semibold text-forest enabled:hover:border-forest disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            )}
          </section>

          {/* Right Pane: Dedicated Candidate Review Workspace */}
          <section
            ref={candidatesSectionRef}
            id="candidates"
            aria-labelledby="candidates-heading"
            aria-busy={isSelectingJob}
            className="min-w-0 scroll-mt-24 rounded-2xl border border-line bg-white p-4 sm:rounded-3xl sm:p-7"
          >
            {!selectedPosting ? (
              <div className="rounded-2xl border border-dashed border-line px-6 py-16 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-forest/6 text-forest">
                  <Users size={26} aria-hidden="true" />
                </div>
                <h2
                  id="candidates-heading"
                  className="mt-4 font-heading text-xl font-bold text-forest"
                >
                  Candidate review workspace
                </h2>
                <p className="mx-auto mt-2 max-w-md font-description text-sm font-medium text-muted">
                  Once you publish an opening, select it from the postings list
                  to review candidates, filter by hiring stage, and update
                  candidate progress here.
                </p>
              </div>
            ) : (
              <div>
                {/* Selected Role Summary Header */}
                <div className="border-b border-line pb-5">
                  <div className="mb-3 lg:hidden">
                    <a
                      href="#postings"
                      className="inline-flex min-h-9 touch-manipulation items-center gap-1.5 text-xs font-semibold text-accent-ink hover:text-forest"
                    >
                      <ArrowUp size={13} aria-hidden="true" />
                      Back to job postings
                    </a>
                  </div>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold tracking-[0.16em] text-accent-ink uppercase">
                          Candidate review
                        </span>
                        <span
                          className={
                            selectedPosting.open
                              ? "inline-flex items-center gap-1.5 rounded-full border border-accent/35 bg-accent/12 px-2.5 py-0.5 text-xs font-semibold text-accent-ink"
                              : "inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-2.5 py-0.5 text-xs font-semibold text-muted"
                          }
                        >
                          <span
                            aria-hidden="true"
                            className={
                              selectedPosting.open
                                ? "h-1.5 w-1.5 rounded-full bg-accent-ink"
                                : "h-1.5 w-1.5 rounded-full bg-muted"
                            }
                          />
                          {selectedPosting.open ? "Open" : "Closed"}
                        </span>
                        {isSelectingJob && (
                          <span
                            role="status"
                            className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-0.5 text-xs font-semibold text-muted"
                          >
                            Loading candidates…
                          </span>
                        )}
                      </div>

                      <h2
                        id="candidates-heading"
                        className="mt-2 font-heading text-2xl font-bold break-words text-forest"
                      >
                        {selectedPosting.title}
                      </h2>

                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-muted">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin
                            size={15}
                            aria-hidden="true"
                            className="text-accent-ink"
                          />
                          {selectedPosting.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar
                            size={15}
                            aria-hidden="true"
                            className="text-accent-ink"
                          />
                          Posted {formatDate(selectedPosting.postedAt ?? selectedPosting.createdAt)}
                        </span>
                        <span className="inline-flex items-center gap-1.5 tabular-nums">
                          <Users
                            size={15}
                            aria-hidden="true"
                            className="text-accent-ink"
                          />
                          {candidates.length}{" "}
                          {candidates.length === 1
                            ? "candidate"
                            : "candidates"}
                        </span>
                      </div>
                    </div>

                    <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
                      <button
                        type="button"
                        onClick={() => {
                          setPublishError(null);
                          const { id, title, location, description, postedAt, createdAt } =
                            selectedPosting;
                          setEditing({
                            id,
                            title,
                            location,
                            description,
                            postingDate: (postedAt ?? createdAt).slice(0, 10),
                          });
                        }}
                        className="inline-flex min-h-10 items-center rounded-full bg-forest px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-forest-soft sm:min-h-9 sm:px-4"
                      >
                        Edit posting
                      </button>
                      {selectedPosting.open && (
                        <Link
                          href="/careers/#openings"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-10 touch-manipulation items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-semibold text-forest hover:border-forest sm:min-h-9 sm:px-4"
                        >
                          View on Careers
                          <ArrowUpRight size={14} aria-hidden="true" />
                        </Link>
                      )}
                      <button
                        type="button"
                        disabled={Boolean(togglingJobIds[selectedPosting.id])}
                        onClick={() => handleToggleJobOpen(selectedPosting)}
                        className="inline-flex min-h-10 touch-manipulation items-center rounded-full border border-forest bg-white px-3.5 py-1.5 text-xs font-semibold text-forest hover:bg-forest hover:text-white disabled:opacity-60 sm:min-h-9 sm:px-4"
                      >
                        {togglingJobIds[selectedPosting.id]
                          ? selectedPosting.open
                            ? "Closing…"
                            : "Reopening…"
                          : selectedPosting.open
                            ? "Close posting"
                            : "Reopen posting"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setDeleteError(null);
                          setDeleteTarget({
                            kind: "job",
                            posting: selectedPosting,
                          });
                        }}
                        className="inline-flex min-h-10 touch-manipulation items-center gap-1.5 rounded-full border border-danger/35 bg-white px-3.5 py-1.5 text-xs font-semibold text-danger hover:border-danger hover:bg-danger/5 sm:min-h-9 sm:px-4"
                      >
                        <Trash2 size={13} aria-hidden="true" />
                        Delete posting
                      </button>
                    </div>
                  </div>

                  {/* Collapsible Role Description */}
                  <div className="mt-4">
                    <button
                      type="button"
                      aria-expanded={descriptionExpanded}
                      onClick={() =>
                        setDescriptionExpanded((expanded) => !expanded)
                      }
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-ink hover:text-forest"
                    >
                      <ChevronDown
                        size={15}
                        aria-hidden="true"
                        className={descriptionExpanded ? "rotate-180" : ""}
                      />
                      {descriptionExpanded
                        ? "Hide role description"
                        : "Show role description"}
                    </button>
                    {descriptionExpanded && (
                      <div className="mt-3 rounded-2xl border border-line/80 bg-white p-4 font-description text-sm leading-relaxed font-medium break-words whitespace-pre-wrap text-muted">
                        <PostingDescription text={selectedPosting.description} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Stage Filter Bar & Candidate Search */}
                <div className="mt-5 space-y-3">
                  <div
                    role="group"
                    aria-label="Filter candidates by stage"
                    className="flex flex-wrap gap-1.5 sm:gap-2"
                  >
                    {(["All", ...stages] as const).map((stage) => {
                      const count =
                        stage === "All"
                          ? candidates.length
                          : selectedStageCounts[stage];
                      const active = stageFilter === stage;
                      return (
                        <button
                          key={stage}
                          type="button"
                          aria-pressed={active}
                          onClick={() => {
                            setStageFilter(stage);
                            setCandidatePage(0);
                          }}
                          className={
                            active
                              ? "inline-flex min-h-10 touch-manipulation items-center gap-1.5 rounded-full border border-forest bg-forest px-3 py-1.5 text-xs font-semibold text-white sm:min-h-9 sm:px-3.5"
                              : "inline-flex min-h-10 touch-manipulation items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-forest hover:border-forest sm:min-h-9 sm:px-3.5"
                          }
                        >
                          <span>{stage}</span>
                          <span
                            className={
                              active
                                ? "rounded-full bg-white/15 px-1.5 py-0.5 text-[11px] tabular-nums"
                                : "rounded-full bg-forest/8 px-1.5 py-0.5 text-[11px] text-muted tabular-nums"
                            }
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {candidates.length > 0 && (
                    <div className="relative max-w-md">
                      <label htmlFor="candidate-search" className="sr-only">
                        Search candidates
                      </label>
                      <Search
                        size={16}
                        aria-hidden="true"
                        className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted"
                      />
                      <input
                        id="candidate-search"
                        type="search"
                        value={candidateQuery}
                        onChange={(event) => {
                          setCandidateQuery(event.target.value);
                          setCandidatePage(0);
                        }}
                        placeholder="Filter candidates by name, email, or mobile…"
                        className="w-full appearance-none rounded-xl border border-line bg-white py-2.5 pr-10 pl-10 font-description text-base font-medium text-forest placeholder:text-muted/75 focus:border-accent-ink focus:outline-none focus:ring-2 focus:ring-accent-ink/20 sm:py-2 sm:text-sm [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
                      />
                      {candidateQuery && (
                        <button
                          type="button"
                          onClick={() => {
                            setCandidateQuery("");
                            setCandidatePage(0);
                          }}
                          aria-label="Clear candidate search"
                          className="absolute top-1/2 right-1.5 flex h-8 w-8 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full text-muted hover:text-forest"
                        >
                          <X size={14} aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Candidate list and empty states */}
                <div className="mt-5 space-y-2">
                  {candidates.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-line px-6 py-12 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-forest/6 text-forest">
                        <Users size={22} aria-hidden="true" />
                      </div>
                      <h3 className="mt-4 font-heading text-lg font-bold text-forest">
                        No applications yet
                      </h3>
                      <p className="mx-auto mt-2 max-w-md font-description text-sm font-medium text-muted">
                        {selectedPosting.open
                          ? "This opening is currently live on Boldfuse Careers. Incoming applications will appear here automatically without refreshing."
                          : "This posting is currently closed to new applications. Reopen it to start accepting candidates again."}
                      </p>
                      <div className="mt-5 flex justify-center gap-3">
                        {selectedPosting.open ? (
                          <Link
                            href="/careers/#openings"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-forest bg-white px-5 py-2 text-sm font-semibold text-forest hover:bg-forest hover:text-white"
                          >
                            View live listing
                            <ArrowUpRight size={15} aria-hidden="true" />
                          </Link>
                        ) : (
                          <button
                            type="button"
                            disabled={Boolean(
                              togglingJobIds[selectedPosting.id],
                            )}
                            onClick={() => handleToggleJobOpen(selectedPosting)}
                            className="inline-flex min-h-10 items-center rounded-full bg-forest px-5 py-2 text-sm font-semibold text-white hover:bg-forest-soft disabled:opacity-60"
                          >
                            Reopen posting
                          </button>
                        )}
                      </div>
                    </div>
                  ) : filteredCandidates.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-line px-6 py-10 text-center">
                      <h3 className="font-heading text-base font-bold text-forest">
                        No candidates match this filter
                      </h3>
                      <p className="mt-1.5 font-description text-sm font-medium text-muted">
                        Clear the stage filter or search query to view all{" "}
                        {candidates.length} candidates for this role.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setStageFilter("All");
                          setCandidateQuery("");
                          setCandidatePage(0);
                        }}
                        className="mt-4 inline-flex min-h-9 items-center rounded-full border border-forest bg-white px-4 py-1.5 text-xs font-semibold text-forest hover:bg-forest hover:text-white"
                      >
                        Show all candidates
                      </button>
                    </div>
                  ) : (
                    visibleCandidates.map((person) => {
                      const draftStage = stageDrafts[person.id];
                      const selectedStage = draftStage ?? person.stage;
                      const isDirty =
                        draftStage !== undefined && draftStage !== person.stage;
                      const isSaving = Boolean(savingCandidateIds[person.id]);
                      const feedback = candidateFeedback[person.id];

                      return (
                        <details
                          key={person.id}
                          name="candidate-review"
                          data-candidate-id={person.id}
                          className="group rounded-xl border border-line bg-white"
                        >
                          <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-3 rounded-xl px-3 py-2.5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent-ink sm:px-4 [&::-webkit-details-marker]:hidden">
                            <span className="min-w-0">
                              <span className="block font-heading text-sm font-bold break-words text-forest">
                                {person.name}
                              </span>
                              <span className="mt-0.5 block text-xs font-medium text-muted">
                                Applied {formatDate(person.createdAt)}
                              </span>
                              {isDirty && (
                                <span className="mt-0.5 block text-xs font-semibold text-accent-ink">
                                  Unsaved status change
                                </span>
                              )}
                            </span>
                            <span className="flex shrink-0 items-center gap-2">
                              <span
                                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${stageBadgeClass(person.stage)}`}
                              >
                                {person.stage}
                              </span>
                              <ChevronDown
                                size={15}
                                aria-hidden="true"
                                className="text-muted group-open:rotate-180"
                              />
                            </span>
                          </summary>

                          <div className="grid gap-3 border-t border-line px-3 py-3 sm:px-4">
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-muted">
                              <a
                                href={`mailto:${person.email}`}
                                className="inline-flex min-w-0 items-center gap-1.5 break-all hover:text-forest"
                              >
                                <Mail
                                  size={14}
                                  aria-hidden="true"
                                  className="shrink-0 text-accent-ink"
                                />
                                <span className="break-all">
                                  {person.email}
                                </span>
                              </a>
                              {person.phone && (
                                <a
                                  href={`tel:${person.phone.replace(/[^\d+]/g, "")}`}
                                  className="inline-flex items-center gap-1.5 hover:text-forest"
                                >
                                  <Phone
                                    size={14}
                                    aria-hidden="true"
                                    className="shrink-0 text-accent-ink"
                                  />
                                  <span>{person.phone}</span>
                                </a>
                              )}
                              {person.resumeUrl && (
                                <a
                                  href={person.resumeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 font-semibold text-accent-ink hover:underline"
                                  title={person.resumeUrl}
                                >
                                  <ExternalLink
                                    size={14}
                                    aria-hidden="true"
                                    className="shrink-0"
                                  />
                                  <span>Resume link</span>
                                </a>
                              )}
                              {person.hasResumeFile && (
                                <a
                                  href={`/api/admin/resume/${person.id}?download=1`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  download={person.resumeFileName || "resume.pdf"}
                                  className="inline-flex items-center gap-1.5 font-semibold text-accent-ink hover:underline"
                                  title={`Download ${person.resumeFileName || "resume.pdf"}`}
                                >
                                  <FileText
                                    size={14}
                                    aria-hidden="true"
                                    className="shrink-0"
                                  />
                                  <span>
                                    {person.resumeFileName || "Resume PDF"}
                                    {person.resumeFileSize
                                      ? ` (${formatFileSize(person.resumeFileSize)})`
                                      : ""}
                                  </span>
                                </a>
                              )}
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingResumeId(
                                    editingResumeId === person.id
                                      ? null
                                      : person.id,
                                  );
                                  setEditingResumeUrl(person.resumeUrl || "");
                                }}
                                className="inline-flex items-center gap-1 text-xs font-semibold text-forest/75 hover:text-forest hover:underline"
                              >
                                <Pencil size={11} aria-hidden="true" />
                                <span>
                                  {person.resumeUrl
                                    ? "Edit link"
                                    : "Add resume link"}
                                </span>
                              </button>
                            </div>

                            {editingResumeId === person.id && (
                              <form
                                onSubmit={(event) => {
                                  event.preventDefault();
                                  void handleSaveResumeUrl(person.id);
                                }}
                                className="flex flex-wrap items-center gap-2 rounded-xl border border-line bg-forest/5 p-2.5 sm:p-3"
                              >
                                <label
                                  htmlFor={`edit-resume-${person.id}`}
                                  className="sr-only"
                                >
                                  Resume link URL
                                </label>
                                <input
                                  id={`edit-resume-${person.id}`}
                                  type="url"
                                  value={editingResumeUrl}
                                  placeholder="https://drive.google.com/... or linkedin.com/in/..."
                                  onChange={(e) =>
                                    setEditingResumeUrl(e.target.value)
                                  }
                                  className="min-h-9 flex-1 rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-medium text-forest placeholder:text-muted/70 focus:border-accent-ink focus:outline-none focus:ring-1 focus:ring-accent-ink"
                                />
                                <button
                                  type="submit"
                                  disabled={savingResumeId === person.id}
                                  className="inline-flex min-h-9 items-center justify-center rounded-full bg-forest px-4 py-1.5 text-xs font-semibold text-white hover:bg-forest-soft disabled:opacity-60"
                                >
                                  {savingResumeId === person.id
                                    ? "Saving…"
                                    : "Save"}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditingResumeId(null)}
                                  className="inline-flex min-h-9 items-center justify-center rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-forest hover:border-forest"
                                >
                                  Cancel
                                </button>
                              </form>
                            )}

                            {/* Stage Update Controls */}
                            <form
                              onSubmit={(event) => {
                                event.preventDefault();
                                void handleSaveStage(person);
                              }}
                              className="flex flex-wrap items-end gap-2.5"
                            >
                              <div className="w-full sm:min-w-32 sm:flex-1">
                                <label
                                  htmlFor={`stage-${person.id}`}
                                  className="block text-xs font-semibold tracking-wider text-forest uppercase"
                                >
                                  Candidate status
                                </label>
                                <div className="relative mt-1.5">
                                  <select
                                    id={`stage-${person.id}`}
                                    name="stage"
                                    value={selectedStage}
                                    disabled={isSaving}
                                    onChange={(event) => {
                                      const nextStage = event.target
                                        .value as Stage;
                                      setStageDrafts((prev) => {
                                        const next = { ...prev };
                                        if (nextStage === person.stage) {
                                          delete next[person.id];
                                        } else {
                                          next[person.id] = nextStage;
                                        }
                                        return next;
                                      });
                                    }}
                                    className="min-h-11 w-full appearance-none rounded-xl border border-line bg-white py-2 pr-9 pl-3 text-base font-semibold text-forest focus:border-accent-ink focus:outline-none focus:ring-2 focus:ring-accent-ink/20 disabled:opacity-60 sm:min-h-10 sm:text-sm"
                                  >
                                    {stages.map((stage) => (
                                      <option key={stage} value={stage}>
                                        {stage}
                                      </option>
                                    ))}
                                  </select>
                                  <ChevronDown
                                    size={15}
                                    aria-hidden="true"
                                    className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-forest"
                                  />
                                </div>
                              </div>

                              <button
                                type="submit"
                                disabled={isSaving}
                                className={
                                  isDirty
                                    ? "inline-flex min-h-11 touch-manipulation items-center justify-center rounded-full bg-forest px-5 py-2 text-sm font-semibold text-white hover:bg-forest-soft disabled:opacity-60 sm:min-h-10"
                                    : "inline-flex min-h-11 touch-manipulation items-center justify-center rounded-full border border-line bg-white px-5 py-2 text-sm font-semibold text-forest hover:border-forest disabled:opacity-60 sm:min-h-10"
                                }
                              >
                                {isSaving ? "Saving…" : "Save status"}
                              </button>

                              <button
                                type="button"
                                disabled={isSaving}
                                onClick={() => {
                                  setDeleteError(null);
                                  setDeleteTarget({
                                    kind: "candidate",
                                    candidate: person,
                                    jobTitle: selectedPosting.title,
                                  });
                                }}
                                className="inline-flex min-h-11 touch-manipulation items-center justify-center gap-1.5 rounded-full border border-danger/30 bg-white px-4 py-1.5 text-xs font-semibold text-danger hover:border-danger hover:bg-danger/5 disabled:opacity-60 sm:min-h-9"
                              >
                                <Trash2 size={13} aria-hidden="true" />
                                Delete candidate
                              </button>
                            </form>

                            {feedback && (
                              <p
                                role={
                                  feedback.tone === "error" ? "alert" : "status"
                                }
                                className={
                                  feedback.tone === "error"
                                    ? "flex items-center gap-1.5 text-xs font-semibold text-danger"
                                    : "flex items-center gap-1.5 text-xs font-semibold text-accent-ink"
                                }
                              >
                                {feedback.tone === "error" ? (
                                  <AlertCircle size={14} aria-hidden="true" />
                                ) : (
                                  <CheckCircle2 size={14} aria-hidden="true" />
                                )}
                                <span>{feedback.text}</span>
                              </p>
                            )}
                          </div>
                        </details>
                      );
                    })
                  )}
                </div>

                {lastCandidatePage > 0 && (
                  <nav
                    aria-label="Candidate pages"
                    className="mt-3 flex flex-wrap items-center justify-between gap-2"
                  >
                    <button
                      type="button"
                      disabled={currentCandidatePage === 0}
                      onClick={() => setCandidatePage(currentCandidatePage - 1)}
                      className="min-h-10 rounded-full border border-line px-3 text-xs font-semibold text-forest enabled:hover:border-forest disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span aria-live="polite" className="text-xs font-medium text-muted tabular-nums">
                      {firstCandidateIndex + 1}–{firstCandidateIndex + visibleCandidates.length} of {filteredCandidates.length}
                    </span>
                    <button
                      type="button"
                      disabled={currentCandidatePage === lastCandidatePage}
                      onClick={() => setCandidatePage(currentCandidatePage + 1)}
                      className="min-h-10 rounded-full border border-line px-3 text-xs font-semibold text-forest enabled:hover:border-forest disabled:opacity-50"
                    >
                      Next
                    </button>
                  </nav>
                )}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Create Posting Modal (draft state lives here in AdminDashboard so SSE refreshes never clear it) */}
      <CreatePostingModal
        open={createOpen || editing !== null}
        editing={editing !== null}
        draft={editing ?? draft}
        pending={publishPending}
        error={publishError}
        onDraftChange={(next) => {
          if (editing) setEditing({ ...next, id: editing.id });
          else setDraft(next);
        }}
        onClearDraft={() => {
          setDraft(emptyDraft);
          setPublishError(null);
        }}
        onClose={() => {
          setEditing(null);
          setCreateOpen(false);
          setPublishError(null);
        }}
        onSubmit={handlePublishSubmit}
      />

      {/* Delete Confirmation Dialog for Job Postings & Candidates */}
      <ConfirmDeleteDialog
        open={Boolean(deleteTarget)}
        title={
          deleteTarget?.kind === "job"
            ? `Delete “${deleteTarget.posting.title}”?`
            : deleteTarget?.kind === "candidate"
              ? `Delete candidate “${deleteTarget.candidate.name}”?`
              : ""
        }
        description={
          deleteTarget?.kind === "job"
            ? deleteTarget.posting.applicants > 0
              ? `This permanently deletes this job posting and its ${deleteTarget.posting.applicants} candidate ${deleteTarget.posting.applicants === 1 ? "application" : "applications"}, and removes it from Boldfuse Careers. This cannot be undone.`
              : "This permanently deletes this job posting and removes it from Boldfuse Careers. This cannot be undone."
            : deleteTarget?.kind === "candidate"
              ? `This permanently removes ${deleteTarget.candidate.name} (${deleteTarget.candidate.email}) from “${deleteTarget.jobTitle}”. This cannot be undone.`
              : ""
        }
        confirmLabel={
          deleteTarget?.kind === "job" ? "Delete posting" : "Delete candidate"
        }
        pending={deletePending}
        error={deleteError}
        onClose={() => {
          setDeleteTarget(null);
          setDeleteError(null);
        }}
        onConfirm={() => void handleConfirmDelete()}
      />
    </main>
  );
}
