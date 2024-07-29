import { Injectable } from '@angular/core';
import { IExportConverter } from 'src/app/common/interfaces/converter.interface';
import { ExportTool } from 'src/app/common/tools/export.tool';
import { HowellExportModel } from 'src/app/common/tools/exports/hw-export.model';
import { Language } from 'src/app/common/tools/language';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { InfoDetailsStationTableItem } from '../info-details-station-table.model';

@Injectable()
export class InfoDetailsStationTableDownloadBusiness {
  constructor(private tool: ExportTool) {}

  download(division: Division, datas: InfoDetailsStationTableItem[]) {
    let title = `${division.Name} 投放点信息`;
    let headers = [
      '序号',
      '名称',
      '管理员数量',
      '管理人员',
      '职位',
      '联系方式',
      '垃圾落地',
      '垃圾满溢',
      '混合投放',
      '感应门',
      '智能主机',
    ];
    let converter = new Converter();
    this.tool.csv(title, headers, datas, converter);
  }
}

class Converter implements IExportConverter<InfoDetailsStationTableItem[]> {
  async Convert(
    source: InfoDetailsStationTableItem[],
    ...res: any[]
  ): Promise<HowellExportModel> {
    let model = new HowellExportModel();
    for (let i = 0; i < source.length; i++) {
      const data = source[i];
      let value = new Array();
      value.push(i + 1);
      value.push(data.Name);
      value.push(data.member.count);
      if (data.member.default) {
        value.push(data.member.default.Name);
        value.push(Language.MemberType(data.member.default.MemberType));
        value.push(`'${data.member.default.MobileNo}`);
      } else {
        value.push('');
        value.push('');
        value.push('');
      }

      value.push(data.canIllegalDrop ? '✔' : '');
      value.push(data.canGarbageFull ? '✔' : '');
      value.push(data.canMixedInto ? '✔' : '');
      value.push(data.canDoor ? '✔' : '');
      value.push(data.canGCHA ? '✔' : '');
      model.rowValues.push(value);
    }
    return model;
  }
}
