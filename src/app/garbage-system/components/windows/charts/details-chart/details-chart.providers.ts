import { DetailsChartBarController } from './controller/details-chart-bar.controller';
import { DetailsChartDownloadController } from './controller/details-chart-download.controller';
import { DetailsChartHeatmap3DController } from './controller/details-chart-heatmap-3d.controller';
import { DetailsChartHeatmapController } from './controller/details-chart-heatmap.controller';
import { DetailsChartLineController } from './controller/details-chart-line.controller';

export const DetailsChartProviders = [
  DetailsChartDownloadController,
  DetailsChartLineController,
  DetailsChartBarController,
  DetailsChartHeatmapController,
  DetailsChartHeatmap3DController,
];
