import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { ITimeData } from 'src/app/common/components/charts/chart.model';
import { IExportConverter } from 'src/app/common/interfaces/converter.interface';
import { ExportTool } from 'src/app/common/tools/export.tool';
import { HowellExportModel } from 'src/app/common/tools/exports/hw-export.model';
import { Language } from 'src/app/common/tools/language';
import { ExportType } from 'src/app/enum/export-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { DetailsChartDownloadArgs } from '../details-chart.model';

@Injectable()
export class DetailsChartDownloadController {
  constructor(private exports: ExportTool) {}

  private converter = new ExportExcelConverter();

  private getTitle(args: DetailsChartDownloadArgs) {
    let _type = Language.EventType(args.eventType);
    let name = this.getName();

    return `${args.time} ${name} ${_type}`;
  }

  private getName(division?: Division, station?: GarbageStation) {
    return station ? station.Name : division ? division.Name : '';
  }

  private export(args: DetailsChartDownloadArgs, type: ExportType) {
    let title = this.getTitle(args);

    let headers = ['序号', '日期', '时间'];

    for (let i = 0; i < args.types.length; i++) {
      headers.push(Language.EventType(args.types[i]));
    }

    this.exports.export(
      type,
      title,
      headers,
      args.datas,
      this.converter,
      args.unit
    );
  }

  excel(args: DetailsChartDownloadArgs) {
    this.export(args, ExportType.chart);
  }
  csv(args: DetailsChartDownloadArgs) {
    this.export(args, ExportType.csv);
  }

  args() {}
}

class ExportExcelConverter implements IExportConverter<ITimeData<any>[][]> {
  async Convert(source: ITimeData<any>[][], unit: TimeUnit) {
    let model = new HowellExportModel();

    let rowCount = 0;
    if (source.length > 0 && source[0].length > 0) {
      rowCount = source[0].length;
    }

    for (let i = 0; i < rowCount; i++) {
      let value = new Array();
      value.push(i + 1);
      let format = 'yyyy年MM月dd日';
      if (unit === TimeUnit.Month) {
        format = 'yyyy年MM月';
      } else if (unit === TimeUnit.Year) {
        format = 'yyyy年';
      }
      value.push(formatDate(source[0][i].time, format, 'en'));
      if (unit === TimeUnit.Week) {
        value.push(Language.Week(source[0][i].time.getDay()));
      } else if (unit === TimeUnit.Hour) {
        value.push(formatDate(source[0][i].time, 'HH:mm', 'en'));
      } else if (unit === TimeUnit.Month) {
        value.push(formatDate(source[0][i].time, 'dd日', 'en'));
      } else if (unit === TimeUnit.Year) {
        value.push(formatDate(source[0][i].time, 'MM月', 'en'));
      }
      for (let j = 0; j < source.length; j++) {
        const data = source[j][i];
        value.push(data.value);
      }
      model.rowValues.push(value);
    }
    model.dataIndex = [3];
    model.headIndex = 2;
    return model;
  }
}
