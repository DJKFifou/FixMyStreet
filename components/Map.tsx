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
  const bordeauxCoordinates: [number, number] = [44.85, -0.57];
  const mapDefaultZoom = 14;

  useEffect(() => {
    const supabase = createClient();

    async function initMap() {
      if (mapRef.current || !mapContainerRef.current) return;

      const { data: reports } = await supabase
        .from("reports")
        .select("*")
        .returns<ReportsType>();

      const L = await import("leaflet");

      const mapInstance = L.map(mapContainerRef.current).setView(
        bordeauxCoordinates,
        mapDefaultZoom,
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapInstance);

      const myIcon = L.icon({
        iconUrl: "/images/icon_marker.svg",
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
      });

      if (reports && reports.length > 0) {
        await Promise.all(
          reports.map(async (report) => {
            const popupContent = await Popup(report);
            L.marker([report.lat, report.lon], { icon: myIcon })
              .addTo(mapInstance)
              .bindPopup(popupContent, { maxWidth: 200 });
          }),
        );

        mapInstance.setView([reports[0].lat, reports[0].lon], mapDefaultZoom);
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

  return <div ref={mapContainerRef} className="h-150 w-full" />;
}
