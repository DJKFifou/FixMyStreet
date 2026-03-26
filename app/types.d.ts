export type ReportsType = ReportType[];

export type ReportType = {
  id: number;
  created_at: string;
  description: string;
  author_id: string;
  image_url: string;
  lat: number;
  lon: number;
};

export type MarkerCluster = {
  getChildCount: () => number;
};
