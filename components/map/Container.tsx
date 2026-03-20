"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

/* DEFAULTS */
const bordeauxCoordinates: [number, number] = [44.84, -0.57];
const mapDefaultZoom = 13;

/* COMPONENT */
const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <MapContainer center={bordeauxCoordinates} zoom={mapDefaultZoom} className="w-full grow">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {children}
    </MapContainer>
  );
};

export default Container;
