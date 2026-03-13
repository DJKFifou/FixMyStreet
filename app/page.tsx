import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { jwtDecode } from "jwt-decode";
import UserLayout from "@/components/layouts/UserLayout";
import AdminLayout from "@/components/layouts/AdminLayout";
import ReportForm from "@/components/ReportForm";
import Map from "@/components/Map";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) redirect("/login");

  const decoded = jwtDecode<{ user_role?: string }>(session.access_token);
  const isAdmin = decoded.user_role === "admin";

  if (isAdmin)
    return (
      <AdminLayout>
        <Map />
      </AdminLayout>
    );
  else
    return (
      <UserLayout>
        <ReportForm />
      </UserLayout>
    );
}
