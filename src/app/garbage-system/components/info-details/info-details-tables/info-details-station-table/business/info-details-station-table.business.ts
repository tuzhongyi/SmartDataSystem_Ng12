import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Flags } from 'src/app/common/tools/flags';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { CameraUsage } from 'src/app/enum/camera-usage.enum';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station/garbage-station-number-statistic.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import {
  InfoDetailsStationTableArgs,
  InfoDetailsStationTableItem,
} from '../info-details-station-table.model';
import { InfoDetailsStationTableDownloadBusiness } from './info-details-station-table-download.business';
import { InfoDetailsStationTableStationBusiness } from './info-details-station-table-station.business';

@Injectable()
export class InfoDetailsStationTableBusiness {
  constructor(
    public station: InfoDetailsStationTableStationBusiness,
    public downloader: InfoDetailsStationTableDownloadBusiness
  ) {}
  async load(args: InfoDetailsStationTableArgs) {
    let statistic = await this.station.statistic(args);
    let stations = await this.station.array(args);

    let datas = statistic.map((x) => {
      let station = stations.find((y) => y.Id == x.Id);
      return this.converet(x, station);
    });
    return datas;
  }

  private converet(
    data: GarbageStationNumberStatistic,
    station?: GarbageStation
  ) {
    let plain = instanceToPlain(data);
    let model = plainToInstance(InfoDetailsStationTableItem, plain);

    if (station) {
      if (station.Members) {
        model.member.count = station.Members.length;
        if (station.Members.length > 0) {
          station.Members = station.Members.sort((a, b) =>
            LocaleCompare.compare(a.MemberType, b.MemberType)
          );
          model.member.default = station.Members[0];
        }
      }

      if (station.Cameras) {
        for (let i = 0; i < station.Cameras.length; i++) {
          const camera = station.Cameras[i];
          let flags = new Flags(camera.CameraUsage);
          if (flags.contains(CameraUsage.IllegalDrop)) {
            model.canIllegalDrop = true;
          }
          if (flags.contains(CameraUsage.GarbageFull)) {
            model.canGarbageFull = true;
          }
          if (flags.contains(CameraUsage.MixedInto)) {
            model.canMixedInto = true;
          }
        }
      }
      if (station.Capabilities) {
        let flags = new Flags(station.Capabilities);
        if (flags.contains(1)) {
          model.canGCHA = true;
        }
        if (flags.contains(2)) {
          model.canDoor = true;
        }
      }
    }

    return model;
  }
}

export const InfoDetailsStationTableProviders = [
  InfoDetailsStationTableBusiness,
  InfoDetailsStationTableStationBusiness,
  InfoDetailsStationTableDownloadBusiness,
];
