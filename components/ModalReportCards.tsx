import { ReportsType, ReportType } from "@/app/types";
import ReportCards from "./ReportCards";
import { useEffect, useRef } from "react";
import L from "leaflet";
import useMapZoom from "@/lib/utils/useMapZoom";

const ModalReportCards = ({ reports }: { reports: ReportsType | null }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { zoomToLocation } = useMapZoom();

  useEffect(() => {
    const modalElement = modalRef.current;
    if (!modalElement) return;

    L.DomEvent.disableScrollPropagation(modalElement);
    L.DomEvent.disableClickPropagation(modalElement);
  }, []);

  const handleCardClick = (report: ReportType) => {
    zoomToLocation(report.lat, report.lon);
  };

  return (
    <div
      ref={modalRef}
      className="absolute right-0 top-0 z-1000 w-80 md:w-110 m-5 max-h-[calc(100vh-6.5rem)] drop-shadow-md rounded-2xl bg-white flex flex-col"
    >
      <div className="overflow-y-auto flex flex-col gap-5 p-6">
        <ReportCards reports={reports} onCardClick={handleCardClick} />
      </div>
    </div>
  );
};

export default ModalReportCards;
