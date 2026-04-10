declare module "react-leaflet-heatmap-layer-v3" {
  import * as L from "leaflet";
  import * as React from "react";

  export type AggregateType =
    | "mean"
    | "count"
    | "sum"
    | "distinct"
    | "min"
    | "max"
    | "variance"
    | "variancep"
    | "stdev"
    | "stdevp";

  export interface SimpleHeatOptions {
    opacity: number;
    minOpacity: number;
    maxZoom: number;
    radius: number;
    blur: number;
    max: number;
    gradient?: Record<number, string>;
  }

  export interface HeatmapLayerProps<Point> extends L.LayerOptions, Partial<SimpleHeatOptions> {
    points: Point[];
    longitudeExtractor: (point: Point) => number;
    latitudeExtractor: (point: Point) => number;
    intensityExtractor: (point: Point) => number;
    fitBoundsOnLoad?: boolean;
    fitBoundsOnUpdate?: boolean;
    onStatsUpdate?: (stats: { min: number; max: number }) => void;
    useLocalExtrema?: boolean;
    aggregateType?: AggregateType;
  }

  export function HeatmapLayer<Point>(
    props: HeatmapLayerProps<Point> & React.RefAttributes<unknown>
  ): React.ReactElement | null;
}
