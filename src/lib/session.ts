import { headers } from "next/headers";
import { auth } from "@/lib/auth";

/**
 * Returns the currently authenticated user (server-side only), or null.
 * Wraps better-auth's session lookup so route handlers and server
 * components don't have to repeat the headers() plumbing.
 */
export async function getCurrentUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user ?? null;
}
