"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { HeatmapPoint, ReportType, ReportsType } from "@/app/types";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import dynamic from "next/dynamic";
import ReportCard from "../report-cards/ReportCard";

const Container = dynamic(() => import("./Container"), { ssr: false });
const Markers = dynamic(() => import("./Markers"), { ssr: false });

const heatmapLayerLongitude = (m: HeatmapPoint) => m[1];
const heatmapLayerLatitude = (m: HeatmapPoint) => m[0];
const heatmapLayerIntensity = (m: HeatmapPoint) => m[2];
const heatmapLayerRadius = 40;

export default function MapView() {
  const [reports, setReports] = useState<ReportsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<ReportType | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("reports")
      .select("*")
      .then(({ data }) => {
        setReports(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="relative w-full grow flex flex-col">
      <Container>
        {reports && (
          <HeatmapLayer
            points={reports.map(
              ({ lat, lon }) => [lat, lon, 1] as HeatmapPoint,
            )}
            longitudeExtractor={heatmapLayerLongitude}
            latitudeExtractor={heatmapLayerLatitude}
            intensityExtractor={heatmapLayerIntensity}
            radius={heatmapLayerRadius}
          />
        )}
        <Markers reports={reports} onMarkerClick={setSelectedReport} />
        {selectedReport && (
          <ReportCard
            report={selectedReport}
            onClose={() => setSelectedReport(null)}
          />
        )}
      </Container>
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-theme-blue border-t-transparent" />
        </div>
      )}
    </div>
  );
}
