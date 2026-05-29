"use client";

import { ReportsType, ReportType } from "@/app/types";
import ReportCard from "./report-cards/ReportCard";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { fetchLatestPriorities, fetchLatestStatus } from "@/lib/utils/db";
import { SupabaseClient } from "@supabase/supabase-js";

type SortBy = "priority" | "status";

type SortConfig = {
  fetchMetadata: (
    supabase: SupabaseClient,
    id: number,
  ) => Promise<string | null>;
  sortOrder: Record<string, number>;
};

const SORT_CONFIGS: Record<SortBy, SortConfig | null> = {
  priority: {
    fetchMetadata: fetchLatestPriorities,
    sortOrder: { high: 0, medium: 1, low: 2 },
  },
  status: {
    fetchMetadata: fetchLatestStatus,
    sortOrder: {
      created: 0,
      validated: 1,
      in_progress: 2,
      done: 3,
      rejected: 4,
    },
  },
};

const toTimestamp = (report: ReportType) =>
  new Date(report.created_at).getTime();

const getRank = (
  value: string | null | undefined,
  order: Record<string, number>,
) => order[value ?? ""] ?? 99;

const sortReports = (
  reports: ReportsType,
  sortBy: SortBy,
  metadata: Record<number, string | null>,
): ReportsType => {
  const config = SORT_CONFIGS[sortBy];

  return [...reports].sort((left, right) => {
    if (!config) return toTimestamp(right) - toTimestamp(left);

    const rankDelta =
      getRank(metadata[left.id], config.sortOrder) -
      getRank(metadata[right.id], config.sortOrder);

    return rankDelta !== 0 ? rankDelta : toTimestamp(right) - toTimestamp(left);
  });
};

const ReportCards = ({
  reports,
  onCardClick,
  sortBy = "priority",
}: {
  reports?: ReportsType | null;
  onCardClick?: (report: ReportType) => void;
  sortBy?: SortBy;
}) => {
  const [fetchedReports, setFetchedReports] = useState<ReportsType | null>(
    null,
  );
  const [isSorting, setIsSorting] = useState(false);
  const [reportMetadata, setReportMetadata] = useState<
    Record<number, string | null>
  >({});

  const finalReports = reports ?? fetchedReports;
  const isLoading = !reports && !fetchedReports;

  useEffect(() => {
    let isActive = true;
    if (reports)
      return () => {
        isActive = false;
      };

    createClient()
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (!isActive) return;
        setFetchedReports(data ?? null);
      });

    return () => {
      isActive = false;
    };
  }, [reports]);

  useEffect(() => {
    let isActive = true;

    const loadSortMetadata = async () => {
      const config = SORT_CONFIGS[sortBy];

      if (!finalReports || !config) {
        setReportMetadata({});
        setIsSorting(false);
        return;
      }

      setIsSorting(true);

      const entries = await Promise.all(
        finalReports.map(async (report) => [
          report.id,
          await config.fetchMetadata(createClient(), report.id),
        ]),
      );

      if (!isActive) return;

      setReportMetadata(Object.fromEntries(entries));
      setIsSorting(false);
    };

    loadSortMetadata();
    return () => {
      isActive = false;
    };
  }, [finalReports, sortBy]);

  const sortedReports = finalReports
    ? sortReports(finalReports, sortBy, reportMetadata)
    : null;

  if (isLoading || isSorting) {
    return (
      <div className="w-full flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-theme-blue border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {sortedReports?.map((report) => (
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
