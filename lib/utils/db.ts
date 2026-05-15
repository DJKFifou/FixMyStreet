import { ReportCategories } from "@/app/types";
import type { createClient } from "@/lib/supabase/client";

export async function fetchLatestStatus(
  supabase: ReturnType<typeof createClient>,
  reportId: number
): Promise<string> {
  const { data } = await supabase
    .from("statuses")
    .select("state")
    .eq("report_id", reportId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();
  return data!.state;
}

export const reportCategoryMapper: { [key: ReportCategories]: string } = {
  road_damage: "Dégât sur la voie",
  signage: "Problème de signalisation",
  lighting: "Éclairage défectueux",
  obstruction: "Encombrement / Voie bloquée",
};

export const reportStatusMapper: { [key: string]: { translation: string, icon: string, color: string } } = {
  created: { translation: "Créé", icon: "create_new_folder", color: 'bg-theme-lightBlue' },
  validated: { translation: "Validé", icon: "verified_user", color: 'bg-theme-blue' },
  in_progress: { translation: "En cours", icon: "schedule", color: 'bg-theme-orange' },
  done: { translation: "Terminé", icon: "done_all", color: 'bg-theme-green' },
  rejected: { translation: "Rejeté", icon: "cancel", color: 'bg-theme-red' }
}
