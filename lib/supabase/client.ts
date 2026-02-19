import { createBrowserClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}

export async function withUser<T>(
  supabase: ReturnType<typeof createClient>,
  router: AppRouterInstance,
  callback: (user: User) => T | Promise<T>
): Promise<T | void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    router.push('/login');
    return;
  }
  return await callback(user);
}
