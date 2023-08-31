import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExportType } from 'src/app/enum/export-type.enum';
import { IPromiseConverter } from '../interfaces/converter.interface';
import { HowellExportChart } from './exports/hw-export-chart';
import { HowellCSV } from './exports/hw-export-csv';
import { HowellExcel } from './exports/hw-export-excel';
import { HowellExportModel } from './exports/hw-export.model';

@Injectable({
  providedIn: 'root',
})
export class ExportTool {
  constructor(private http: HttpClient) {}

  export<T>(
    type: ExportType,
    title: string,
    headers: string[],
    datas: T,
    converter: IPromiseConverter<T, HowellExportModel>,
    ...args: any[]
  ) {
    switch (type) {
      case ExportType.excel:
        this.excel(title, headers, datas, converter, ...args);
        break;
      case ExportType.csv:
        this.csv(title, headers, datas, converter, ...args);
        break;
      case ExportType.chart:
        this.chart(title, headers, datas, converter, ...args);
        break;
      default:
        break;
    }
  }

  async excel<T>(
    title: string,
    headers: string[],
    datas: T,
    converter: IPromiseConverter<T, HowellExportModel>,
    ...args: any[]
  ) {
    let excel = new HowellExcel();
    let model = await converter.Convert(datas, ...args);
    model.headers = headers;
    model.title = title;
    excel.setData(model);
    excel.save(title);
  }
  async csv<T>(
    title: string,
    headers: string[],
    datas: T,
    converter: IPromiseConverter<T, HowellExportModel>,
    ...args: any[]
  ) {
    let model = await converter.Convert(datas, ...args);
    model.title = title;
    model.headers = headers;
    HowellCSV.writeFile(title, model);
  }

  async chart<T>(
    title: string,
    headers: string[],
    datas: T,
    converter: IPromiseConverter<T, HowellExportModel>,
    ...args: any[]
  ) {
    let excel = new HowellExcel();
    let model = await converter.Convert(datas, ...args);
    model.headers = headers;
    model.title = title;
    excel.setData(model);

    let chart = new HowellExportChart(this.http);
    chart.setData(model, excel, model.headIndex!, model.dataIndex!);
  }
}
