import { createClient } from "@/lib/supabase/server";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import Navigation from "../Navigation";
import PwaInstallGate from "../PwaInstallGate";

const UserLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    const decoded = jwtDecode<{ user_role?: string }>(session.access_token);
    const isAdmin = decoded.user_role === "admin";
    if (isAdmin) redirect('/');
  }

  return (
    <div className="flex flex-col min-h-svh">
      <PwaInstallGate>
        <div className="px-6 py-12 md:py-6">
          {children}
        </div>
        <Navigation />
      </PwaInstallGate>
    </div>
  );
}

export default UserLayout;
