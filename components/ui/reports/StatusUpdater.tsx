"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ReportType } from "@/app/types";
import { reportStatusMapper } from "@/lib/utils/db";
import { createClient, withUser } from "@/lib/supabase/client";
import { fetchLatestStatus } from "@/lib/utils/db";
import Status from "./Status";

export default function StatusUpdater({ report, onStatusChange }: { report: ReportType; onStatusChange?: (status: string) => void }) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    withUser(supabase, router, ({ isAdmin }) => {
      setIsAdmin(isAdmin);
    });

    fetchLatestStatus(supabase, report.id).then(setCurrentStatus);
  }, [router, report.id]);

  const handleStatusChange = async (newStatus: string) => {
    setIsOpen(false);
    if (newStatus === currentStatus || isUpdating) return;

    setIsUpdating(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("statuses")
      .insert({ report_id: report.id, state: newStatus });
    if (!error) {
      setCurrentStatus(newStatus);
      onStatusChange?.(newStatus);
    }
    setIsUpdating(false);
  };

  if (currentStatus === null) return null;
  if (!isAdmin) return <Status report={report} statusOverride={currentStatus} />;

  return (
    <div className="relative flex flex-col items-end">
      <button
        onClick={() => setIsOpen((o) => !o)}
        disabled={isUpdating}
        className="cursor-pointer disabled:opacity-50"
      >
        <Status report={report} statusOverride={currentStatus} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full mt-1.5 right-0 z-10 flex flex-col gap-1 bg-white rounded-xl shadow-lg p-2 min-w-max">
            {Object.entries(reportStatusMapper).map(([key, { translation, icon, color }]) => (
              <button
                key={key}
                onClick={() => handleStatusChange(key)}
                className={`flex gap-1.5 items-center rounded-xl p-2 pr-4 font-sans font-semibold text-xs transition-colors cursor-pointer ${key === currentStatus ? `${color} text-white` : "text-gray-400 hover:bg-gray-100"}`}
              >
                <span className="material-symbols-outlined text-base">{icon}</span>
                <span>{translation}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
