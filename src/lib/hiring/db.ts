import "server-only";
import { MongoClient, type ObjectId } from "mongodb";
import { stages, type Stage } from "./types";

export { stages, type Stage };

interface Job {
  title: string;
  location: string;
  description: string;
  open: boolean;
  applicants: number;
  createdAt: Date;
  postedAt?: Date;
}

export interface ResumeDoc {
  _id: ObjectId;
  candidateId: ObjectId;
  jobId: ObjectId;
  filename: string;
  contentType: string;
  size: number;
  data: Buffer;
  createdAt: Date;
}

export interface Application {
  jobId: ObjectId;
  name: string;
  email: string;
  phone?: string;
  resume?: string;
  resumeUrl?: string;
  resumeFileId?: ObjectId;
  resumeFileName?: string;
  resumeFileSize?: number;
  stage: Stage;
  createdAt: Date;
}

async function connect() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is required for hiring");
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    maxPoolSize: 10,
  });
  try {
    await client.connect();
    const db = client.db();
    const jobs = db.collection<Job>("hiring_jobs");
    const applications = db.collection<Application>("hiring_applications");
    const resumes = db.collection<ResumeDoc>("hiring_resumes");
    const sessions = db.collection<{
      _id: string;
      expires: Date;
      account: string;
    }>("hiring_sessions");
    const attempts = db.collection<{
      _id: string;
      count: number;
      expires: Date;
    }>("hiring_login_attempts");
    await Promise.all([
      jobs.createIndex({ open: 1, createdAt: -1 }),
      applications.createIndex({ jobId: 1, email: 1 }, { unique: true }),
      applications.createIndex({ jobId: 1, createdAt: -1 }),
      resumes.createIndex({ candidateId: 1 }),
      resumes.createIndex({ jobId: 1 }),
      sessions.createIndex({ expires: 1 }, { expireAfterSeconds: 0 }),
      attempts.createIndex({ expires: 1 }, { expireAfterSeconds: 0 }),
    ]);
    return { client, jobs, applications, resumes, sessions, attempts };
  } catch (error) {
    await client.close();
    throw error;
  }
}

const pool = globalThis as typeof globalThis & {
  hiringConnection?: ReturnType<typeof connect>;
};
export function hiringDb() {
  return (pool.hiringConnection ??= connect().catch((error) => {
    delete pool.hiringConnection;
    throw error;
  }));
}
