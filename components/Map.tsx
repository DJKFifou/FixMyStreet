"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import "leaflet/dist/leaflet.css";
import type L from "leaflet";
import type { ReportsType } from "@/app/types";
import Popup from "@/components/Popup";

export default function Map() {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();

    async function initMap() {
      const { data: reports } = await supabase
        .from("reports")
        .select("*")
        .returns<ReportsType>();

      console.log("Reports data:", reports);

      if (mapRef.current) return;

      const L = await import("leaflet");
      if (!mapContainerRef.current) return;

      const mapInstance = L.map(mapContainerRef.current).setView(
        [44.85, -0.57],
        14,
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapInstance);

      if (reports && reports.length > 0) {
        await Promise.all(
          reports.map(async (report) => {
            const popupContent = await Popup(report);
            L.marker([report.lat, report.lon])
              .addTo(mapInstance)
              .bindPopup(popupContent, { maxWidth: 200 });
          }),
        );

        mapInstance.setView([reports[0].lat, reports[0].lon], 14);
      }

      mapRef.current = mapInstance;
    }

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div>
      <h1>Admin Map</h1>
      <div ref={mapContainerRef} className="h-150 w-full" />
    </div>
  );
}
