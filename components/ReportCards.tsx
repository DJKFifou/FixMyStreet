"use client";

import { ReportsType, ReportType } from "@/app/types";
import ReportCard from "./report-cards/ReportCard";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const ReportCards = ({
  reports,
  onCardClick,
}: {
  reports?: ReportsType | null;
  onCardClick?: (report: ReportType) => void;
}) => {
  const [finalReports, setFinalReports] = useState<ReportsType | null>(
    reports || null,
  );
  const [isLoading, setIsLoading] = useState(!reports);

  useEffect(() => {
    if (!reports) {
      const supabase = createClient();
      supabase
        .from("reports")
        .select("*")
        .order("created_at", { ascending: true })
        .then(({ data }) => {
          setFinalReports(data);
          setIsLoading(false);
        });
    }
  }, [reports]);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-theme-blue border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {finalReports?.map((report) => (
        <ReportCard
          key={report.id}
          report={report}
          onClick={onCardClick ? () => onCardClick(report) : undefined}
        />
      ))}
    </div>
  );
};

export default ReportCards;
