import { Injectable } from '@angular/core';
import { IDowanload } from 'src/app/common/interfaces/bussiness.interface';
import { ExportTool } from 'src/app/garbage-system/committees/summary/business/statistic-summary-export-excel.business';
import { Division } from 'src/app/network/model/division.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GarbageStationTableModel } from '../garbage-station-table.model';

@Injectable()
export class GarbageStationTableDownloadBusiness implements IDowanload {
  constructor(private division: DivisionRequestService) {}

  private get = {
    title: (division: Division) => {
      return `${division.Name}车棚信息`;
    },
    header: () => {
      return ['序号', '车棚名称', '社区', '街道', '警务责任区', '坐标'];
    },
  };

  async download(divisionId: string, datas: GarbageStationTableModel[]) {
    let division = await this.division.cache.get(divisionId);
    let title = this.get.title(division);
    let tool = new ExportTool(title);
    let row = 1;
    tool.setTitle(title, row);
    row++;
    tool.setRow(this.get.header(), row);
    row++;

    for (let i = 0; i < datas.length; i++) {
      const item = datas[i];
      let point = '';
      if (item.GarbageStation && item.GarbageStation.GisPoint) {
        point = [
          item.GarbageStation.GisPoint.Longitude,
          item.GarbageStation.GisPoint.Latitude,
        ].join(',');
      }
      let values = [
        i + 1,
        item.GarbageStation?.Name ?? '',
        item.GarbageStation?.CommunityName ?? '',
        item.GarbageStation?.County?.Name ?? '',
        item.GarbageStation?.Committees?.Name ?? '',
        point,
      ];
      tool.setRow(values, row);
      row++;
    }
    tool.excel.writeFile(title);
  }
}
