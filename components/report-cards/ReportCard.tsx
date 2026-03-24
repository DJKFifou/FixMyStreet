import { ReportType } from "@/app/types";
import { formatDate } from "@/lib/utils/date";
import ReportLocation from "./ReportLocation";

const ReportCard = ({
  report: { created_at, description, lat, lon },
}: {
  report: ReportType;
}) => (
  <div className="w-full bg-white rounded-xl shadow-md border border-theme-offWhite overflow-hidden">

    {/* Header à modifier par la suite pour intégrer les labels "En cours", "Terminé" etc.*/}
    <div className="flex items-center justify-between p-4 ">
      <span className="material-symbols-outlined text-theme-blue text-3xl ml-auto">
        traffic
      </span>
    </div>


    <div className="flex flex-col gap-4 p-5 ml-4 mr-4">


      <div className="flex items-center gap-2 text-theme-lightBlack text-sm font-medium">
        <span className="material-symbols-outlined text-base">calendar_month</span>
        <span>{formatDate(created_at)}</span>
      </div>


      <div className="flex items-center gap-2 text-theme-lightBlack text-sm">
        <ReportLocation lat={lat} lon={lon} />
      </div>


      <div className="flex flex-col gap-1">
        <p className="text-theme-lightBlack font-medium">Description :</p>
        <p className="text-theme-darkGrey text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

export default ReportCard;
