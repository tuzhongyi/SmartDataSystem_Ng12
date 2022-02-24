export interface IChartOption {}
export class LineZoomOption implements IChartOption {
  xAxisLine: string[] = [];
  xAxisBar: string[] = [];
  lineData: Array<number | string> = [];
  lineDataB: Array<number | string> = [];
  barDataB: Array<{
    value: number;
    itemStyle: {
      color: string;
    };
    label: {
      show: boolean;
      formatter: any;
      rich: any;
    };
    emphasis: any;
  }> = [];

  barData: Array<{
    value: number;
    itemStyle: {
      color: string;
    };
    label: {
      show: boolean;
      formatter: any;
      rich: any;
    };
    emphasis: any;
  }> = [];
  itemClick?: (param: {
    event: {
      offsetX: number;
      offsetY: number;
    };
    name: string;
    seriesId: string;
    seriesName: string;
  }) => void;
  dbitemClick?: (keyVal: string) => void;
  dataZoomClick?: (param: {
    batch: Array<{ start: number; end: number }>;
  }) => void;
  visualMapPieces = new Array();
}

export class LineZoomChartModel {
  data: TimeData[] = [];
}

interface TimeData {
  time: Date;
  value: number;
}
