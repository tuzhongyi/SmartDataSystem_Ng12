import { Injectable } from '@angular/core';
import { IExportConverter } from 'src/app/common/interfaces/converter.interface';
import { EnumTool } from 'src/app/common/tools/enum-tool/enum.tool';
import { ExportTool } from 'src/app/common/tools/export.tool';
import { HowellExportModel } from 'src/app/common/tools/exports/hw-export.model';
import { Language } from 'src/app/common/tools/language';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { InfoDetailsDivisionTableItem } from '../info-details-division-table.model';

@Injectable()
export class InfoDetailsDivisionTableDownloadBusiness {
  constructor(private tool: ExportTool) {}

  download(division: Division, datas: InfoDetailsDivisionTableItem[]) {
    let childtype = EnumTool.division.child(division.DivisionType);
    let title = `${division.Name} ${Language.DivisionType(childtype)}信息`;
    let headers = [
      '序号',
      '名称',
      '管理员数量',
      '管理人员',
      '联系方式',
      '投放点数量',
    ];
    let converter = new Converter();
    this.tool.csv(title, headers, datas, converter);
  }
}

class Converter implements IExportConverter<InfoDetailsDivisionTableItem[]> {
  async Convert(
    source: InfoDetailsDivisionTableItem[],
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
        value.push(`'${data.member.default.MobileNo}`);
      } else {
        value.push('');
        value.push('');
      }

      value.push(data.StationNumber);
      model.rowValues.push(value);
    }
    return model;
  }
}
