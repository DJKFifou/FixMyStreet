"use client";

import { useState, useEffect } from "react";
import { ReportType } from "@/app/types";
import { reportPrioritiesMapper, fetchLatestPriorities } from "@/lib/utils/db";
import { createClient } from "@/lib/supabase/client";

const Priority = ({
  report,
  priorityOverride,
}: {
  report: ReportType;
  priorityOverride?: string;
}) => {
  const [fetchedPriority, setFetchedPriority] = useState<string | null>(null);

  useEffect(() => {
    if (priorityOverride) return;

    const supabase = createClient();
    fetchLatestPriorities(supabase, report.id).then(setFetchedPriority);
  }, [report.id, priorityOverride]);

  const priority = priorityOverride ?? fetchedPriority;
  const { translation, icon, color } = reportPrioritiesMapper[priority!];

  return (
    <div className="flex items-center self-end">
      <div
        className={`flex gap-1.5 items-center ${color} text-white rounded-xl p-2 pr-4 font-sans font-semibold text-xs`}
      >
        <span className="material-symbols-outlined">{icon}</span>
        <span>{translation}</span>
      </div>
    </div>
  );
};

export default Priority;
