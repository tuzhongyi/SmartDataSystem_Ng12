import { Injectable } from '@angular/core';
import { ExportType } from 'src/app/enum/export-type.enum';
import { IPromiseConverter } from '../interfaces/converter.interface';
import { HowellCSV } from '../tools/exports/hw-export-csv';
import { HowellExcel } from '../tools/exports/hw-export-excel';
import { HowellExportModel } from '../tools/exports/hw-export.model';

@Injectable({
  providedIn: 'root',
})
export class ExportBusiness {
  async export<T>(
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
}
