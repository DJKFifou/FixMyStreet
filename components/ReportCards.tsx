import { ReportsType } from "@/app/types";
import { createClient } from "@/lib/supabase/server";
import ReportCard from "./report-cards/ReportCard";

const ReportCards = async () => {
  const supabase = await createClient();
  const { data: reports }: { data: ReportsType | null } = await supabase
    .from("reports")
    .select("*")
    .order('created_at', { ascending: false });
  console.log(reports);

  return (
    <div className="w-full flex flex-col gap-4">
      {reports?.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </div>
  );
}

export default ReportCards;
