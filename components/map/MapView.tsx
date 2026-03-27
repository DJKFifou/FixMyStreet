"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ReportsType } from "@/app/types";
import dynamic from "next/dynamic";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";

type HeatmapPoint = [lat: number, lon: number, intensity: number];

const Container = dynamic(() => import("./Container"), { ssr: false });
const Markers = dynamic(() => import("./Markers"), { ssr: false });

export default function MapView() {
  const [reports, setReports] = useState<ReportsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
            points={reports.map(({ lat, lon }) => [lat, lon, 1])}
            longitudeExtractor={(m: HeatmapPoint) => m[1]}
            latitudeExtractor={(m: HeatmapPoint) => m[0]}
            intensityExtractor={(m: HeatmapPoint) => m[2]}
            radius={40}
          />
        )}
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
