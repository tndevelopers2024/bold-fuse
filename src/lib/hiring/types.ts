export const stages = [
  "Applied",
  "Reviewing",
  "Interview",
  "Hired",
  "Rejected",
] as const;

export type Stage = (typeof stages)[number];

export type StageCounts = Record<Stage, number>;

export interface AdminPosting {
  id: string;
  title: string;
  location: string;
  description: string;
  open: boolean;
  applicants: number;
  createdAt: string;
  postedAt?: string;
  stageCounts: StageCounts;
}

export interface AdminCandidate {
  id: string;
  jobId: string;
  name: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
  hasResumeFile?: boolean;
  resumeFileName?: string;
  resumeFileSize?: number;
  stage: Stage;
  createdAt: string;
}

export interface ActionResult<T = undefined> {
  ok: boolean;
  message?: string;
  error?: string;
  data?: T;
}

export type ConnectionState =
  | "connecting"
  | "connected"
  | "reconnecting"
  | "offline";

export function emptyStageCounts(): StageCounts {
  return {
    Applied: 0,
    Reviewing: 0,
    Interview: 0,
    Hired: 0,
    Rejected: 0,
  };
}
