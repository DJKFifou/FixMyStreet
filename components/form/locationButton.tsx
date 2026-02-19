"use client";

import PrimaryButton from "@/components/ui/PrimaryButton";
import { useState } from "react";

export default function LocationButton() {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const locationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function locationSuccess(pos: GeolocationPosition) {
    const crd = pos.coords;

    console.log("Votre position actuelle est :");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude : ${crd.longitude}`);
    console.log(`La précision est de ${crd.accuracy} mètres.`);
    setMessage("Géolocalisation réussie !");
  }

  function locationError(err: GeolocationPositionError) {
    console.warn(`ERREUR (${err.code}): ${err.message}`);
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
