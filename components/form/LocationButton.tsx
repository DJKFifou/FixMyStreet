"use client";

import PrimaryButton from "@/components/ui/PrimaryButton";
import { useState } from "react";

export default function LocationButton({
  setLat,
  setLon,
}: {
  setLat: (lat: number) => void;
  setLon: (lon: number) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const locationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function locationSuccess(pos: GeolocationPosition) {
    const crd = pos.coords;

    setLat(crd.latitude);
    setLon(crd.longitude);
    setMessage("Géolocalisation réussie !");
  }

  function locationError(err: GeolocationPositionError) {
    setError(`Erreur de géolocalisation : ${err.message}`);
  }

  function handleClickLocation() {
    navigator.geolocation.getCurrentPosition(
      locationSuccess,
      locationError,
      locationOptions,
    );
  }

  return (
    <div>
      {message ? (
        <p className="text-green-500">{message}</p>
      ) : (
        <PrimaryButton type="button" onClick={handleClickLocation}>
          Je me géolocalise
        </PrimaryButton>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
