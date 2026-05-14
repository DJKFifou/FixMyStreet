"use client";

import { useState, useEffect } from "react";
import { ReportType } from "@/app/types";
import { reportStatusMapper, fetchLatestStatus } from "@/lib/utils/db";
import { createClient } from "@/lib/supabase/client";

const Status = ({ report, statusOverride }: { report: ReportType; statusOverride?: string }) => {
  const [fetchedStatus, setFetchedStatus] = useState<string | null>(null);

  useEffect(() => {
    if (statusOverride) return;

    const supabase = createClient();
    fetchLatestStatus(supabase, report.id).then(setFetchedStatus);
  }, [report.id, statusOverride]);

  const status = statusOverride ?? fetchedStatus;
  const { translation, icon, color } = reportStatusMapper[status!];

  return (
    <div className="flex items-center self-end">
      <div className={`flex gap-1.5 items-center ${color} text-white rounded-xl p-2 pr-4 font-sans font-semibold text-xs`}>
        <span className="material-symbols-outlined">{icon}</span>
        <span>{translation}</span>
      </div>
    </div>
  );
};

export default Status;
