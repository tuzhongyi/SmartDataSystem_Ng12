import { ChartBarComponents } from './bars/chart-bar-components.module';
import { ChartLineComponents } from './lines/chart-line-components.module';
import { ChartMapComponents } from './maps/chart-map-components.module';
import { ChartPieComponents } from './pies/chart-pie-components.module';

export const ChartComponents = [
  ...ChartBarComponents,
  ...ChartLineComponents,
  ...ChartPieComponents,
  ...ChartMapComponents,
];
