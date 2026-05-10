export type ReportsType = ReportType[];
export type ReportType = {
  id: number;
  category: string;
  created_at: string;
  description: string;
  author_id: string;
  image_url: string;
  lat: number;
  lon: number;
  category: ReportCategories;
  status: string;
};
export type ReportCategories = keyof typeof reportCategoryMapper;
export type ReportFormData = {
  category: ReportCategories;
  description: string;
  image_url: string | null;
  lat: number | null;
  lon: number | null;
};

export type BeforeInstallPromptEvent = Event & { prompt: () => void };
export type HeatmapPoint = [lat: number, lon: number, intensity: number];
export type MarkerCluster = { getChildCount: () => number };
