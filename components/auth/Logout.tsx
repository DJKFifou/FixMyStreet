"use client";

import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

const Logout = () => {
  const supabase = createClient();
  supabase.auth.signOut().then(() => redirect('/login'));

  return(
    <p className="w-full h-full flex items-center justify-center text-sm text-gray-500">
      Déconnexion en cours...
    </p>
  );
};

export default Logout;
