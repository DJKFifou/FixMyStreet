import type { ReportType } from "@/app/types";
import { formatDate } from "@/lib/utils/date";
import { getAddressFromCoordinates } from "@/lib/utils/location";

export default async function Popup(report: ReportType): Promise<string> {
  const address = await new Promise<string>((resolve) => {
    getAddressFromCoordinates(
      report.lat,
      report.lon,
      (address) => resolve(address),
      (error) => resolve(error),
    );
  });

  return `
    <div class="w-full border-3 border-theme-black rounded-md flex flex-col">
      <div class="w-full flex items-center justify-between p-3 pb-0">
        <i class="material-symbols-outlined">traffic</i>
      </div>
      <div class="w-full flex flex-col items-center justify-center px-2 pb-2">
        <p class="text-xl m-0!">${formatDate(report.created_at)}</p>
        <p class="flex items-center gap-1 text-lg font-bold m-0!">
          <i class="material-symbols-outlined">location_on</i>
          ${address}
        </p>
        <div class="self-start">
          <p class="m-0!">Description:</p>
          <p class="m-0!">${report.description}</p>
        </div>
      </div>
    </div>
  `;
}
