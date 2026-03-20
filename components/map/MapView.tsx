"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ReportsType } from "@/app/types";
import dynamic from "next/dynamic";

const Container = dynamic(() => import("./Container"), { ssr: false });
const Markers = dynamic(() => import("./Markers"), { ssr: false });

export default function MapView() {
  const [reports, setReports] = useState<ReportsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.from("reports").select("*").then(({ data }) => {
      setReports(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="relative w-full grow flex flex-col">
      <Container>
        <Markers reports={reports} />
      </Container>
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-theme-blue border-t-transparent" />
        </div>
      )}
    </div>
  );
}
