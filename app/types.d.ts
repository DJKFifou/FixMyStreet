export type ReportsType = ReportType[];
export type ReportType = {
  id: number;
  category: string;
  created_at: string;
  description: string | null;
  author_id: string;
  image_url: string;
  lat: number;
  lon: number;
  category: ReportCategories;
};

export type ReportCategories = keyof typeof reportCategoryMapper;
export type ReportFormData = {
  category: ReportCategories;
  lat: number;
  lon: number;
  image_url: string;
  description: string | null;
}

export type BeforeInstallPromptEvent = Event & { prompt: () => void };
export type HeatmapPoint = [lat: number, lon: number, intensity: number];
export type MarkerCluster = { getChildCount: () => number };
