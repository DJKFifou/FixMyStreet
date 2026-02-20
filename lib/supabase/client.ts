import { jwtDecode } from "jwt-decode"
import { createBrowserClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

type CustomJwtPayload = { user_role?: string }

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}

export async function withUser<T>(
  supabase: ReturnType<typeof createClient>,
  router: AppRouterInstance,
  callback: (context: { user: User, isAdmin: boolean }) => T | Promise<T>
): Promise<T | void> {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    router.push("/login")
    return;
  }

  const decoded = jwtDecode<CustomJwtPayload>(session.access_token);
  const userRole = decoded.user_role ?? null;

  return await callback({
    user: session.user,
    isAdmin: userRole === "admin"
  });
}
