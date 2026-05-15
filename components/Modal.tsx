import { ReportType } from "@/app/types";
import { formatDate } from "@/lib/utils/date";
import { reportCategoryMapper } from "@/lib/utils/db";
import ReportLocation from "./report-cards/ReportLocation";
import Image from "next/image";
import BackButtonHeader from "./ui/BackButtonHeader";
import StatusUpdater from "./ui/reports/StatusUpdater";

export default function Modal({
  report,
  isOpen,
  onClose,
  onStatusChange,
}: {
  report: ReportType;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange?: (status: string) => void;
}) {
  return (
    <div
      className={`fixed top-0 right-0 w-full h-full z-1000 bg-white rounded-l-lg transition-all duration-700 overflow-y-auto ${isOpen ? "translate-x-0" : "translate-x-[calc(100%+1.25rem)]"}`}
    >
      <BackButtonHeader
        title="Détails de votre signalement"
        onClick={onClose}
      />
      <div className="grid grid-cols-2 mt-30 px-6">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2.5 text-theme-lightBlack text-sm font-medium">
            <span className="material-symbols-outlined text-base">
              calendar_month
            </span>
            <span>{formatDate(report.created_at)}</span>
          </div>

          <div className="flex items-center gap-2 text-theme-lightBlack text-sm">
            <ReportLocation lat={report.lat} lon={report.lon} />
          </div>

          <span className="py-2 px-6 text-sm font-semibold bg-theme-blue rounded-full text-theme-white w-fit">
            {reportCategoryMapper[report.category]}
          </span>

          <div className="flex flex-col gap-5">
            <p className="text-theme-lightBlack font-medium">Photo :</p>
            {report.image_url ? (
              <Image
                src={report.image_url}
                alt={`Picture of ${report.category}`}
                width={800}
                height={800}
                loading="eager"
                className="w-80 aspect-square object-cover"
              />
            ) : (
              <div className="w-30 h-30 bg-gray-200 flex items-center justify-center rounded p-2 text-center">
                <span className="text-gray-400">Aucune image</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-theme-lightBlack font-medium">Description :</p>
            <p className="text-theme-darkGrey text-sm leading-relaxed">
              {report.description}
            </p>
          </div>
        </div>

        <div className="flex flex-col">
          <StatusUpdater report={report} onStatusChange={onStatusChange} />
        </div>
      </div>
    </div>
  );
}
