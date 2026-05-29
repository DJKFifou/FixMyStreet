import { ReportCategories } from "@/app/types";
import type { createClient } from "@/lib/supabase/client";

export async function fetchLatestStatus(
  supabase: ReturnType<typeof createClient>,
  reportId: number,
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

export async function fetchLatestPriorities(
  supabase: ReturnType<typeof createClient>,
  reportId: number,
): Promise<string> {
  const { data } = await supabase
    .from("priorities")
    .select("priority")
    .eq("report_id", reportId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();
  return data!.priority;
}

export const reportCategoryMapper: { [key: ReportCategories]: string } = {
  road_damage: "Dégât sur la voie",
  signage: "Problème de signalisation",
  lighting: "Éclairage défectueux",
  obstruction: "Encombrement / Voie bloquée",
};

export const reportStatusMapper: {
  [key: string]: { translation: string; icon: string; color: string };
} = {
  created: {
    translation: "Créé",
    icon: "create_new_folder",
    color: "bg-theme-lightBlue",
  },
  validated: {
    translation: "Validé",
    icon: "verified_user",
    color: "bg-theme-blue",
  },
  in_progress: {
    translation: "En cours",
    icon: "schedule",
    color: "bg-theme-orange",
  },
  done: { translation: "Terminé", icon: "done_all", color: "bg-theme-green" },
  rejected: { translation: "Rejeté", icon: "cancel", color: "bg-theme-red" },
};

export const reportPrioritiesMapper: {
  [key: string]: { translation: string; icon: string; color: string };
} = {
  undefined: {
    translation: "Non défini",
    icon: "help_outline",
    color: "bg-gray-400",
  },
  low: {
    translation: "Basse",
    icon: "keyboard_arrow_down",
    color: "bg-theme-green",
  },
  medium: {
    translation: "Moyenne",
    icon: "check_indeterminate_small",
    color: "bg-theme-orange",
  },
  high: {
    translation: "Haute",
    icon: "keyboard_arrow_up",
    color: "bg-theme-red",
  },
};
