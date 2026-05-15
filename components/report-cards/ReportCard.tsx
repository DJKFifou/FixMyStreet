"use client";

import { ReportType } from "@/app/types";
import { formatDate } from "@/lib/utils/date";
import { reportCategoryMapper, fetchLatestStatus } from "@/lib/utils/db";
import ReportLocation from "./ReportLocation";
import { useState, useEffect } from "react";
import Modal from "../Modal";
import Status from "../ui/reports/Status";
import { createClient } from "@/lib/supabase/client";

const ReportCard = ({
  report,
  onClick,
  onClose,
}: {
  report: ReportType;
  onClick?: () => void;
  onClose?: () => void;
}) => {
  const isOverlayCard = Boolean(onClose);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<string | null>(null);
  const { created_at, lat, lon, category, description } = report;

  useEffect(() => {
    const supabase = createClient();
    fetchLatestStatus(supabase, report.id).then(setCurrentStatus);
  }, [report.id]);

  return (
    <>
      <div
        className={`${isOverlayCard && "absolute right-0 top-0 z-1000 w-75 md:w-105 m-5"} cursor-pointer drop-shadow-md pb-8 rounded-2xl bg-white flex flex-col gap-5 p-6 max-w-full`}
        onClick={() => (onClick ? onClick() : setModalOpen(true))}
      >
        {isOverlayCard && (
          <button
            type="button"
            onClick={() => onClose && onClose()}
            className="rounded-full text-theme-lightBlack self-end material-symbols-outlined transition-colors cursor-pointer hover:bg-theme-offWhite"
            aria-label="Close report details"
          >
            close
          </button>
        )}
        <div
          className="relative flex flex-col gap-5"
          onClick={() => (onClick ? onClick() : setModalOpen(true))}
        >
          <div className="absolute top-0 right-0">
            {currentStatus && (
              <Status report={report} statusOverride={currentStatus} />
            )}
          </div>

          <div className="flex items-center gap-2.5 text-theme-lightBlack text-sm font-medium">
            <span className="material-symbols-outlined text-base">
              calendar_month
            </span>
            <span>{formatDate(created_at)}</span>
          </div>

          <div className="flex items-center gap-2 text-theme-lightBlack text-sm">
            <ReportLocation lat={lat} lon={lon} />
          </div>

          <span className="py-2 px-6 text-sm font-semibold bg-theme-blue rounded-full text-theme-white w-fit">
            {reportCategoryMapper[category]}
          </span>

          <div className="flex flex-col gap-1">
            <p className="text-theme-lightBlack font-medium">Description :</p>
            <p className="text-theme-darkGrey text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
      <Modal
        report={report}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onStatusChange={setCurrentStatus}
      />
    </>
  );
};

export default ReportCard;
