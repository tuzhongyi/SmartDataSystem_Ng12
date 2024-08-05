import { DetailsChartHeatmapDivisionBusiness } from '../details-chart-heatmap/business/details-chart-heatmap-division.business';
import { DetailsChartHeatmapStationBusiness } from '../details-chart-heatmap/business/details-chart-heatmap-station.business';
import { DetailsChartHeatmapBusiness } from '../details-chart-heatmap/business/details-chart-heatmap.business';
import { DetailsChartHeatmap3DMonthController } from './controller/details-chart-heatmap-3d-month.controller';
import { DetailsChartHeatmap3DYearController } from './controller/details-chart-heatmap-3d-year.controller';
import { DetailsChartHeatmap3DController } from './controller/details-chart-heatmap-3d.controller';

export const DetailsChartHeatmap3DProviders = [
  DetailsChartHeatmapBusiness,
  DetailsChartHeatmapStationBusiness,
  DetailsChartHeatmapDivisionBusiness,
  DetailsChartHeatmap3DController,
  DetailsChartHeatmap3DYearController,
  DetailsChartHeatmap3DMonthController,
];
