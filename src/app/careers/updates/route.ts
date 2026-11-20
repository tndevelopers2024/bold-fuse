import { liveResponse } from "@/lib/hiring/live";

export const dynamic = "force-dynamic";
export const maxDuration = 60;
export async function GET(request: Request) {
  return liveResponse(request, false);
}
