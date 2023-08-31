import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { ExportBusiness } from 'src/app/common/business/export.business';
import { IExportConverter } from 'src/app/common/interfaces/converter.interface';
import { HowellExportModel } from 'src/app/common/tools/exports/hw-export.model';
import { Language } from 'src/app/common/tools/language';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { GarbageDropRecordTaskTableModel } from './garbage-drop-record-task-table.model';

@Injectable()
export class GarbageDropRecordTaskTableDownloadBusiness {
  constructor(private exports: ExportBusiness) {}

  download(
    date: Date,
    type: DivisionType,
    source: GarbageDropRecordTaskTableModel[],
    total: GarbageDropRecordTaskTableModel
  ) {
    let headers = [
      '序号',
      Language.DivisionType(type),
      '全部任务',
      '未完成任务',
      '超时处置',
      '处置率',
    ];
    let title = `${formatDate(date, 'yyyy年MM月dd日', 'en')} ${
      total.name
    } 任务处置`;
    let datas = [...source, total];
    this.exports.csv(title, headers, datas, new Converter());
  }
}

class Converter implements IExportConverter<GarbageDropRecordTaskTableModel[]> {
  async Convert(source: GarbageDropRecordTaskTableModel[], ...res: any[]) {
    let model = new HowellExportModel();
    let total = source.pop();
    for (let i = 0; i < source.length; i++) {
      const data = source[i];
      let row = new Array();
      row.push(i + 1);
      row.push(data.name);
      row.push(data.count);
      row.push(data.unhandle);
      row.push(data.timeout);
      row.push(data.ratio);
      model.rowValues.push(row);
    }
    let row = new Array();
    if (total) {
      row.push('');
      row.push(total.name);
      row.push(total.count);
      row.push(total.unhandle);
      row.push(total.timeout);
      row.push(total.ratio);
      model.rowValues.push(row);
    }
    return model;
  }
}
