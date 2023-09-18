import { Injectable } from '@angular/core';
import { IExportConverter } from 'src/app/common/interfaces/converter.interface';
import { ExportTool } from 'src/app/common/tools/export.tool';
import { HowellExportModel } from 'src/app/common/tools/exports/hw-export.model';
import { Language } from 'src/app/common/tools/language';
import { ExportType } from 'src/app/enum/export-type.enum';
import {
  DaPuQiaoGarbageDropStationCountTableArgs,
  NumberStatisticModel,
} from './dapuqiao-garbage-drop-station-count-table.model';

@Injectable()
export class DaPuQiaoGarbageDropStationCountTableDownload {
  constructor(private tool: ExportTool) {}
  download(
    type: ExportType,
    args: DaPuQiaoGarbageDropStationCountTableArgs,
    datas: NumberStatisticModel[]
  ) {
    let title = `${Language.Date(
      args.date,
      args.unit
    )} ${Language.UserResourceType(args.type)} 事件督办 总数据`;
    let converter = new Converter();
    let handers = [
      '序号',
      '名称',
      '行政区',
      '一级事件',
      '二级事件',
      '三级事件',
      '全部事件',
      '一级事件反馈',
      '二级事件反馈',
      '三级事件反馈',
      '物业反馈',
      '第三方反馈',
      '全部事件反馈',
      '平均反馈时长',
      '反馈率',
      '督办事件',
    ];
    this.tool.export(type, title, handers, datas, converter);
  }
}

class Converter implements IExportConverter<NumberStatisticModel[]> {
  constructor() {}
  async Convert(
    source: NumberStatisticModel[],
    ...res: any[]
  ): Promise<HowellExportModel> {
    let model = new HowellExportModel();
    model.rowValues = [];
    for (let i = 0; i < source.length; i++) {
      const item = source[i];
      let row = new Array();
      row.push(i + 1);
      row.push(item.Name);
      row.push((await item.Parent).Name);
      row.push(item.Level3Statistic?.Level1Number ?? 0);
      row.push(item.Level3Statistic?.Level2Number ?? 0);
      row.push(item.Level3Statistic?.Level3Number ?? 0);
      row.push(item.Level3Statistic?.AllLevelNumber ?? 0);
      row.push(item.Level3Statistic?.Level1FeedbackNumber ?? 0);
      row.push(item.Level3Statistic?.Level2FeedbackNumber ?? 0);
      row.push(item.Level3Statistic?.Level3FeedbackNumber ?? 0);
      row.push(item.Level3Statistic?.PropertyFeedbackNumber ?? 0);
      row.push(item.Level3Statistic?.ThirdPartFeedbackNumber ?? 0);
      row.push(item.Level3Statistic?.FeedbackNumber ?? 0);

      let avg = this.transform(
        item.Level3Statistic?.AvgFeedbackSeconds ?? 0 / 60
      );
      row.push(avg);

      row.push(item.Level3Statistic?.FeedbackRatio ?? 0);
      row.push(item.Level3Statistic?.SupervisedNumber ?? 0);
      model.rowValues.push(row);
    }
    return model;
  }

  transform(time?: number) {
    if (time === undefined) return undefined;
    let hour = Math.floor(time / 60);
    let minute = time - hour * 60;
    let res =
      hour == 0
        ? Math.ceil(minute) + '分钟'
        : hour + '小时' + Math.ceil(minute) + '分钟';
    return res;
  }
}
