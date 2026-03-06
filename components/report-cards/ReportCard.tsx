import { ReportType } from "@/app/types";
import { formatDate } from "@/lib/utils/date";
import ReportLocation from "./ReportLocation";

const ReportCard = ({ report: { created_at, description, lat, lon, } }: { report: ReportType }) => (
  <div className="w-full border-3 border-theme-black rounded-md flex flex-col">
    <div className="w-full flex items-center justify-between p-3 pb-0">
      <i className="material-symbols-outlined">traffic</i>
    </div>
    <div className="w-full flex flex-col items-center justify-center px-12 pb-7">
      <p className="text-xl">{formatDate(created_at)}</p>
      <ReportLocation lat={lat} lon={lon} />
      <div className="self-start">
        <p>Description:</p>
        <p>{description}</p>
      </div>
    </div>
  </div>
);

export default ReportCard;
