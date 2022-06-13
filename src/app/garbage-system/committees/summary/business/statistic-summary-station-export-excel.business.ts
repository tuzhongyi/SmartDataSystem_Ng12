import { EventType } from 'src/app/enum/event-type.enum';
import { Language } from 'src/app/global/tool/language';
import { StatisticSummaryStationEventChartViewModel } from '../charts/station-event/statistic-summary-station-event-chart.model';
import { ExportTool, IExport } from './statistic-summary-export-excel.business';

export class StatisticSummaryStationsExportExcelBusiness
  implements IExport<StatisticSummaryStationEventChartViewModel[]>
{
  constructor(tool: ExportTool) {
    this.tool = tool;
  }
  data: StatisticSummaryStationEventChartViewModel[] = [];
  completed: boolean = false;
  tool: ExportTool;
  export(title: string, row: number): number {
    debugger;
    try {
      row = this.tool.setTitle(title, row);

      let headers = [
        '序号',
        '厢房名称',
        Language.EventType(EventType.IllegalDrop),
        Language.EventType(EventType.MixedInto),
      ];
      row = this.tool.setRow(headers, row);

      for (let i = 0; i < this.data.length; i++) {
        const item = this.data[i];
        let name = this.tool.getCellName(1, row);

        this.tool.setCellValue(row, 1, i + 1);
        this.tool.setCellValue(row, 2, item.product);
        this.tool.setCellValue(
          row,
          3,
          item[Language.EventType(EventType.IllegalDrop)]
        );
        this.tool.setCellValue(
          row,
          4,
          item[Language.EventType(EventType.MixedInto)]
        );
        row++;
      }
      return row;
    } catch (ex) {
      console.error(ex);
      return row;
    } finally {
      this.completed = true;
    }
  }
}
