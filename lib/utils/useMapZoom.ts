"use client";

import { useMap } from "react-leaflet";

const useMapZoom = () => {
  const map = useMap();

  const zoomToLocation = (lat: number, lon: number, zoom: number = 17) => {
    map.setView([lat, lon], zoom, { animate: true });
  };

  return { zoomToLocation };
};

export default useMapZoom;
