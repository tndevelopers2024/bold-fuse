import { signedIn } from "@/lib/hiring/auth";
import { liveResponse } from "@/lib/hiring/live";

export const dynamic = "force-dynamic";
export const maxDuration = 60;
export async function GET(request: Request) {
  if (!(await signedIn()))
    return new Response(null, {
      status: 401,
      headers: { "Cache-Control": "no-store" },
    });
  return liveResponse(request, true);
}
