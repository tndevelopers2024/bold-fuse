import type { ObjectId } from "mongodb";
import { signedIn } from "@/lib/hiring/auth";
import { hiringDb } from "@/lib/hiring/db";
import {
  emptyStageCounts,
  stages,
  type AdminCandidate,
  type AdminPosting,
  type Stage,
  type StageCounts,
} from "@/lib/hiring/types";
import { AdminSignIn } from "@/components/hiring/AdminSignIn";
import { AdminDashboard } from "@/components/hiring/AdminDashboard";

export const metadata = {
  title: "Hiring admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

interface StageAggregateRow {
  _id: {
    jobId: ObjectId;
    stage: Stage;
  };
  count: number;
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ job?: string }>;
}) {
  if (!(await signedIn())) {
    return <AdminSignIn />;
  }

  const { jobs, applications } = await hiringDb();
  const [rawPostings, stageRows] = await Promise.all([
    jobs.find().sort({ createdAt: -1 }).toArray(),
    applications
      .aggregate<StageAggregateRow>([
        {
          $group: {
            _id: { jobId: "$jobId", stage: "$stage" },
            count: { $sum: 1 },
          },
        },
      ])
      .toArray(),
  ]);

  const countsByJob = new Map<string, StageCounts>();
  const totalPipeline = emptyStageCounts();

  for (const row of stageRows) {
    const jobKey = row._id.jobId.toString();
    const stage = row._id.stage;
    if (!stages.includes(stage)) continue;
    let jobCounts = countsByJob.get(jobKey);
    if (!jobCounts) {
      jobCounts = emptyStageCounts();
      countsByJob.set(jobKey, jobCounts);
    }
    jobCounts[stage] += row.count;
    totalPipeline[stage] += row.count;
  }

  const postings: AdminPosting[] = rawPostings.map((doc) => {
    const id = doc._id.toString();
    const stageCounts = countsByJob.get(id) ?? emptyStageCounts();
    const actualApplicantTotal =
      stageCounts.Applied +
      stageCounts.Reviewing +
      stageCounts.Interview +
      stageCounts.Hired +
      stageCounts.Rejected;

    return {
      id,
      title: doc.title,
      location: doc.location,
      description: doc.description,
      open: Boolean(doc.open),
      applicants: actualApplicantTotal,
      postedAt: doc.postedAt?.toISOString(),
      createdAt:
        doc.createdAt instanceof Date
          ? doc.createdAt.toISOString()
          : new Date().toISOString(),
      stageCounts,
    };
  });

  const { job } = await searchParams;
  const selectedDoc =
    rawPostings.find((posting) => posting._id.toString() === job) ??
    rawPostings[0] ??
    null;

  const rawCandidates = selectedDoc
    ? await applications
        .find({ jobId: selectedDoc._id })
        .sort({ createdAt: -1 })
        .toArray()
    : [];

  const candidates: AdminCandidate[] = rawCandidates.map((doc) => ({
    id: doc._id.toString(),
    jobId: doc.jobId.toString(),
    name: doc.name,
    email: doc.email,
    phone:
      typeof doc.phone === "string" && doc.phone.trim()
        ? doc.phone.trim()
        : undefined,
    stage: stages.includes(doc.stage) ? doc.stage : "Applied",
    createdAt:
      doc.createdAt instanceof Date
        ? doc.createdAt.toISOString()
        : new Date().toISOString(),
  }));

  return (
    <AdminDashboard
      postings={postings}
      selectedJobId={selectedDoc ? selectedDoc._id.toString() : null}
      candidates={candidates}
      totalPipeline={totalPipeline}
    />
  );
}
