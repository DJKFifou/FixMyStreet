import { ReportType } from "@/app/types";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils/date";
import ReportLocation from "./ReportLocation";
import Image from "next/image";
import { reportCategoryMapper } from "@/lib/utils/db";

export default async function ReportDetails({ id }: { id: string }) {
  const supabase = await createClient();
  const { data: report }: { data: ReportType | null } = await supabase
    .from("reports")
    .select("*")
    .eq("id", id)
    .single();
  const { image_url, category, created_at, lat, lon, description } =
    report as ReportType;
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center self-end">
        <div className="flex gap-1.5 items-center bg-theme-orange text-white rounded-xl p-2 font-sans font-semibold text-xs">
          <span className="material-symbols-outlined">play_arrow</span>
          <span>En cours</span>
        </div>
      </div>
      <div className="flex items-center gap-2.5 text-theme-lightBlack text-sm font-medium">
        <span className="material-symbols-outlined text-base">
          calendar_month
        </span>
        <span>{formatDate(created_at)}</span>
      </div>

      <div className="flex items-center gap-2 text-theme-lightBlack text-sm">
        <ReportLocation lat={lat} lon={lon} />
      </div>

      <span className="py-2 px-6 text-sm font-semibold bg-theme-blue rounded-full text-theme-white w-fit">
        {reportCategoryMapper[category]}
      </span>

      <div className="flex flex-col gap-5">
        <p className="text-theme-lightBlack font-medium">Photo :</p>
        <Image
          src={image_url}
          alt={`Picture of ${category}`}
          width={120}
          height={120}
          loading="eager"
          className="w-30 aspect-square object-cover"
        />
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-theme-lightBlack font-medium">Description :</p>
        <p className="text-theme-darkGrey text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
