"use client";

import PrimaryButton from "@/components/ui/PrimaryButton";
import MandatoryAsterisk from "../ui/MandatoryAsterisk";
import getAddressFromCoordinates from "@/components/utils/getAddressFromCoordinates";
import Error from "@/components/ui/Error";
import { useState } from "react";

export default function LocationButton({
  setLat,
  setLon,
}: {
  setLat: (lat: number) => void;
  setLon: (lon: number) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const texts = {
    title: "Se géolocaliser",
    description:
      "Facilite la localisation des anomalies et permet aux agents de prioriser les traitements en fonction des agglomérats.",
    button: "Je me géolocalise",
    loading: "Chargement de l'adresse...",
  };

  function getInputText() {
    if (loading) return texts.loading;
    if (location) return location;
    return texts.button;
  }

  const locationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  async function locationSuccess(pos: GeolocationPosition) {
    const crd = pos.coords;

    setLat(crd.latitude);
    setLon(crd.longitude);
    await getAddressFromCoordinates(
      crd.latitude,
      crd.longitude,
      (address) => {
        setLocation(address);
      },
      (error) => {
        setError(error);
      },
    );
    setLoading(false);
  }

  function locationError(err: GeolocationPositionError) {
    setError(`Erreur de géolocalisation : ${err.message}`);
    setLoading(false);
  }

  function handleClickLocation() {
    setError(null);
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      locationSuccess,
      locationError,
      locationOptions,
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div>
        <span className="text-lg">
          {texts.title}
          <MandatoryAsterisk />
        </span>
        <p className="text-sm text-gray-600">{texts.description}</p>
      </div>
      <PrimaryButton
        type="button"
        onClick={handleClickLocation}
        disabled={loading}
        classes="flex justify-between"
      >
        {getInputText()}
        {location ? (
          <i className="material-symbols-outlined">autorenew</i>
        ) : (
          <i className="material-symbols-outlined">location_on</i>
        )}
      </PrimaryButton>
      {error && <Error message={error} />}
    </div>
  );
}
