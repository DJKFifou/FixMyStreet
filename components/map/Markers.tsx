"use client";

import ReportCard from "../report-cards/ReportCard";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Marker, Popup } from "react-leaflet";
import { MarkerCluster, ReportsType } from "@/app/types";
import { divIcon, icon, point } from "leaflet";
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/styles';

/* DEFAULTS */
const maxClusterRadius = 8;

/* UTILITIES */
const createClusterCustomIcon = (cluster: MarkerCluster) => {
  return divIcon({
    html: `<p>${cluster.getChildCount()}</p>`,
    className: 'bg-theme-blue flex! items-center justify-center rounded-full text-white text-lg font-bold',
    iconSize: point(40, 40, true),
  });
}

/* COMPONENT */
const Markers = ({ reports }: { reports: ReportsType | null }) => {
  if (!reports) return null;

  const markerIcon = icon({
    iconUrl: "/images/marker.svg",
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });

  return(
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
        return(
          <Marker key={report.id} position={[lat, lon]} icon={markerIcon}>
            <Popup>
              <ReportCard report={report} />
            </Popup>
          </Marker>
        );
      })}
    </MarkerClusterGroup>
  );
};

export default Markers;
