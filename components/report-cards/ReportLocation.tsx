"use client";

import { getAddressFromCoordinates } from "@/lib/utils/location";
import { useEffect, useState } from "react";

const ReportLocationSkeleton = () => (
  <div className="grow bg-theme-grey h-4 animate-pulse rounded-sm"></div>
);

const ReportLocation = ({ lat, lon }: { lat: number; lon: number }) => {
  const [location, setLocation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAddressFromCoordinates(
      lat,
      lon,
      (address) => {
        setLocation(address);
      },
      (error) => {
        setError(error);
      },
    );
  }, [lat, lon]);

  return (
    <div className="w-full flex items-center gap-2.5">
      <i className="material-symbols-outlined">location_on</i>
      {error || location ? (
        <p>{error || location}</p>
      ) : (
        <ReportLocationSkeleton />
      )}
    </div>
  );
};

export default ReportLocation;
