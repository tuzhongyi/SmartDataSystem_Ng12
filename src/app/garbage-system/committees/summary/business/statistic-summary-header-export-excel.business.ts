import { Language } from 'src/app/common/tools/language';
import { StatisticSummaryHeaderViewModel } from '../header/statistic-summary-header.model';
import { ExportTool, IExport } from './statistic-summary-export-excel.business';

export class StatisticSummaryHeaderExportExcelBusiness
  implements IExport<StatisticSummaryHeaderViewModel>
{
  constructor(tool: ExportTool) {
    this.tool = tool;
  }
  data!: StatisticSummaryHeaderViewModel;
  completed = false;
  tool: ExportTool;
  export(title: string, row: number): number {
    try {
      row = this.tool.setTitle(title, row);
      row++;
      let headers = [
        '垃圾处置达标率',
        '垃圾滞留处置率',
        '最大垃圾滞留时长',
        Language.json.EventType.IllegalDrop +
          Language.json.count +
          Language.json.number,
        Language.json.EventType.MixedInto +
          Language.json.count +
          Language.json.number,
      ];
      row = this.tool.setRow(headers, row);

      let time = '';
      if (this.data.GarbageTimeHour) {
        time += `${this.data.GarbageTimeHour}小时`;
      }
      if (this.data.GarbageTimeMinute) {
        time += `${this.data.GarbageTimeMinute}分钟`;
      }
      if (!time) {
        time = '0分钟';
      }

      let values = [
        `${this.data.Garde}分`,
        `${this.data.GarbageHandleRatio}%`,
        time,
        `${this.data.IllegalDrop}起`,
        `${this.data.MixedInto}起`,
      ];
      return this.tool.setRow(values, row);
    } catch (ex) {
      console.error(ex);
      return row;
    } finally {
      this.completed = true;
    }
  }
}
