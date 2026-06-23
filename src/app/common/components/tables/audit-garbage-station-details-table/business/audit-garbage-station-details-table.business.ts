import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { AuditGarbageStationDetailsTableConverter } from '../audit-garbage-station-details-table.converter';
import {
  AuditGarbageStationDetailsTableArgs,
  AuditGarbageStationDetailsTableConfig,
  AuditGarbageStationDetailsTableItem,
  IAuditGarbageStationDetailsTableBusiness,
} from '../audit-garbage-station-details-table.model';
import { AuditGarbageStationDetailsTableConfigBusiness } from './audit-garbage-station-details-table-config.business';
import { AuditGarbageStationDetailsTableDeviceBusiness } from './audit-garbage-station-details-table-device.business';
import { AuditGarbageStationDetailsTableDownloadBusiness } from './audit-garbage-station-details-table-download.business';
import { AuditGarbageStationDetailsTableStationBusiness } from './audit-garbage-station-details-table-station.business';

@Injectable()
export class AuditGarbageStationDetailsTableBusiness
  implements IAuditGarbageStationDetailsTableBusiness
{
  constructor(
    private converter: AuditGarbageStationDetailsTableConverter,
    public config: AuditGarbageStationDetailsTableConfigBusiness,
    download: AuditGarbageStationDetailsTableDownloadBusiness,
    station: AuditGarbageStationDetailsTableStationBusiness,
    device: AuditGarbageStationDetailsTableDeviceBusiness
  ) {
    this.service = {
      station,
      download,
      device,
    };
  }
  service: {
    station: AuditGarbageStationDetailsTableStationBusiness;
    download: AuditGarbageStationDetailsTableDownloadBusiness;
    device: AuditGarbageStationDetailsTableDeviceBusiness;
  };

  private data = {
    device: [] as AIGarbageDevice[],
  };

  async load(
    index: number,
    size: number,
    args: AuditGarbageStationDetailsTableArgs,
    config: AuditGarbageStationDetailsTableConfig
  ) {
    let datas = await this.service.station.load(index, size, args);
    let ids = datas.Data.map((x) => x.Id);
    this.data.device = await this.service.device.load(ids);
    let models = datas.Data.map((x) => {
      let model = this.converter.convert(x, config);
      // model.Device = new Promise<AIGarbageDevice>((resolve) => {
      //   let device: AIGarbageDevice | undefined = undefined;
      //   wait(
      //     () => {
      //       device = this.data.device.find((d) => d.GarbageStationId == x.Id);
      //       return !!device;
      //     },
      //     () => {
      //       if (device) {
      //         resolve(device);
      //       }
      //     }
      //   );
      // });
      return model;
    });

    let paged = new PagedList<AuditGarbageStationDetailsTableItem>();
    paged.Page = datas.Page;
    paged.Data = models;
    return paged;
  }

  async download(
    args: AuditGarbageStationDetailsTableArgs,
    config: AuditGarbageStationDetailsTableConfig
  ) {
    let datas = await this.service.station.all(args);
    let models = datas.map((x) => {
      return this.converter.convert(x, config);
    });
    let title = `垃圾分类投放点列表 ${formatDate(
      new Date(),
      Language.yyyyMMddHHmmss,
      'en'
    )}`;
    this.service.download.download(title, models, config);
  }
}
