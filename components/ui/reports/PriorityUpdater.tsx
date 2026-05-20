"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ReportType } from "@/app/types";
import { reportPrioritiesMapper } from "@/lib/utils/db";
import { createClient, withUser } from "@/lib/supabase/client";
import { fetchLatestPriorities } from "@/lib/utils/db";
import Priority from "./Priority";

export default function PrioritiesUpdater({
  report,
  onPrioritiesChange,
}: {
  report: ReportType;
  onPrioritiesChange?: (priorities: string) => void;
}) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPriorities, setCurrentPriorities] = useState<string | null>(
    null,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    withUser(supabase, router, ({ isAdmin }) => {
      setIsAdmin(isAdmin);
    });

    fetchLatestPriorities(supabase, report.id).then(setCurrentPriorities);
  }, [router, report.id]);

  const handlePrioritiesChange = async (newPriorities: string) => {
    setIsOpen(false);
    if (newPriorities === currentPriorities || isUpdating) return;

    setIsUpdating(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("priorities")
      .insert({ report_id: report.id, priority: newPriorities });
    if (!error) {
      setCurrentPriorities(newPriorities);
      onPrioritiesChange?.(newPriorities);
    }
    setIsUpdating(false);
  };

  if (currentPriorities === null) return null;
  if (!isAdmin)
    return <Priority report={report} priorityOverride={currentPriorities} />;

  return (
    <div className="relative flex flex-col items-end">
      <button
        onClick={() => setIsOpen((o) => !o)}
        disabled={isUpdating}
        className="cursor-pointer disabled:opacity-50"
      >
        <Priority report={report} priorityOverride={currentPriorities} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full mt-1.5 right-0 z-10 flex flex-col gap-1 bg-white rounded-xl shadow-lg p-2 min-w-max">
            {Object.entries(reportPrioritiesMapper).map(
              ([key, { translation, icon, color }]) => (
                <button
                  key={key}
                  onClick={() => handlePrioritiesChange(key)}
                  className={`flex gap-1.5 items-center rounded-xl p-2 pr-4 font-sans font-semibold text-xs transition-colors cursor-pointer ${key === currentPriorities ? `${color} text-white` : "text-gray-400 hover:bg-gray-100"}`}
                >
                  <span className="material-symbols-outlined text-base">
                    {icon}
                  </span>
                  <span>{translation}</span>
                </button>
              ),
            )}
          </div>
        </>
      )}
    </div>
  );
}
