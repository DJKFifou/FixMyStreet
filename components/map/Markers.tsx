"use client";

import MarkerClusterGroup from "react-leaflet-markercluster";
import { Marker } from "react-leaflet";
import { MarkerCluster, ReportType, ReportsType } from "@/app/types";
import { divIcon, icon, point } from "leaflet";

/* DEFAULTS */
const maxClusterRadius = 8;

/* UTILITIES */
const createClusterCustomIcon = (cluster: MarkerCluster) => {
  return divIcon({
    html: `<p>${cluster.getChildCount()}</p>`,
    className:
      "bg-theme-blue flex! items-center justify-center rounded-full text-white text-lg font-bold",
    iconSize: point(40, 40, true),
  });
};

/* COMPONENT */
const Markers = ({
  reports,
  onMarkerClick,
}: {
  reports: ReportsType | null;
  onMarkerClick: (report: ReportType) => void;
}) => {
  if (!reports) return null;

  const markerIcon = icon({
    iconUrl: "/images/marker.svg",
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });

  return (
    <MarkerClusterGroup
      showCoverageOnHover={false}
      iconCreateFunction={createClusterCustomIcon}
      removeOutsideVisibleBounds={true}
      spiderLegPolylineOptions={{ opacity: 0 }}
      maxClusterRadius={maxClusterRadius}
      animate={true}
    >
      {reports.map((report) => {
        const { lat, lon } = report;
        return (
          <Marker
            key={report.id}
            position={[lat, lon]}
            icon={markerIcon}
            eventHandlers={{ click: () => onMarkerClick(report) }}
          />
        );
      })}
    </MarkerClusterGroup>
  );
};

export default Markers;
