import { DetailsChartHeatmapDivisionBusiness } from './business/details-chart-heatmap-division.business';
import { DetailsChartHeatmapStationBusiness } from './business/details-chart-heatmap-station.business';
import { DetailsChartHeatmapBusiness } from './business/details-chart-heatmap.business';
import { DetailsChartHeatmapMonthController } from './controller/details-chart-heatmap-month.controller';
import { DetailsChartHeatmapYearController } from './controller/details-chart-heatmap-year.controller';
import { DetailsChartHeatmapController } from './controller/details-chart-heatmap.controller';

export const DetailsChartHeatmapProviders = [
  DetailsChartHeatmapBusiness,
  DetailsChartHeatmapStationBusiness,
  DetailsChartHeatmapDivisionBusiness,
  DetailsChartHeatmapYearController,
  DetailsChartHeatmapMonthController,
  DetailsChartHeatmapController,
];
