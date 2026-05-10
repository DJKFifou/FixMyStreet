import { ReportType } from "@/app/types";
import { reportStatusMapper } from "@/lib/utils/db";

const Status = ({ report }: { report: ReportType }) => {
  const {translation, icon, color} = reportStatusMapper[report.status];
  
  return (
    <div className="flex items-center self-end">
      <div className={`flex gap-1.5 items-center ${color} text-white rounded-xl p-2 pr-4 font-sans font-semibold text-xs`}>
        <span className="material-symbols-outlined">{icon}</span>
        <span>{translation}</span>
      </div>
    </div>
  );
};

export default Status;
