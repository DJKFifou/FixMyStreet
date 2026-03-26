import { createClient } from "@/lib/supabase/server";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import Link from "next/link";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) redirect("/login");

  const decoded = jwtDecode<{ user_role?: string }>(session.access_token);
  const isAdmin = decoded.user_role === "admin";
  if (!isAdmin) redirect("/");

  return (
    <div className="flex flex-col min-h-svh">
      <div className="fixed top-0 left-0 w-full grow flex flex-col justify-end">
        <nav className="bg-theme-blue text-white p-5 shadow-t-sm">
          <ul className="flex justify-between items-center">
            <li className="flex-1 flex items-center">
              <Link href="/" className="material-symbols-outlined">
                Home
              </Link>
            </li>
            <li className="flex-1 flex justify-center items-center">
              <span className="font-grotesk font-bold leading-none text-2xl">
                FixMyStreet
              </span>
            </li>
            <div className="flex-1 flex items-center justify-end gap-4 text-lg font-medium">
              {/* <li>
                <Link href="/reports" className="leading-none">
                  Reports
                </Link>
              </li>
              <li>
                <Link href="/settings" className="leading-none">
                  Settings
                </Link>
              </li> */}
            </div>
          </ul>
        </nav>
      </div>
      <div className="flex flex-col grow mt-16">{children}</div>
    </div>
  );
};

export default AdminLayout;
