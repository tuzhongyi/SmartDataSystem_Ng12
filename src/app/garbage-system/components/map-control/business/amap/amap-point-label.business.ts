import { Injectable } from '@angular/core';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { GarbageStationModel } from 'src/app/view-model/garbage-station.model';
import { AMapLabelOptionConverter } from '../amap-label-option.converter';
import { GarbageTimeFilter } from '../amap.model';
import { AMapClient } from './amap.client';
import { AMapService } from './amap.service';

@Injectable()
export class AMapPointLabelBusiness {
  private labelOptionConverter = new AMapLabelOptionConverter();
  constructor(private service: AMapService, private amap: AMapClient) {}

  async set(stations: GarbageStationModel[], filter: GarbageTimeFilter) {
    let client = await this.amap.client;
    // 获取统计数据
    const list = await this.service.statistic(stations.map((x) => x.Id));
    // 筛选需要的统计数据
    let drop = list.filter((x) => {
      return this.garbageTimeFiltering(filter, x.CurrentGarbageTime);
    });
    let dropIds = drop.map((x) => {
      return x.Id;
    });
    // 记录被统计的厢房
    this.amap.source.drop = this.amap.source.all.filter((x) =>
      dropIds.includes(x.Id)
    );
    const opts = new Array();
    for (let i = 0; i < drop.length; i++) {
      const data = drop[i];
      const station = this.amap.source.drop.find((x) => x.Id == data.Id);

      if (
        station &&
        data.CurrentGarbageTime != undefined &&
        data.CurrentGarbageTime > 0
      ) {
        let point = this.amap.source.points[station.Id];
        if (!point) continue;
        const opt = this.labelOptionConverter.Convert(data, point.position);
        opts.push(opt);
        this.amap.source.labels[opt.id] = opt;
      }
    }

    client.Label.Set(opts, CesiumDataController.ImageResource.arcProgress);

    const ids = opts.map((x) => x.id);
    for (const id in this.amap.source.labels) {
      const label = this.amap.source.labels[id];
      if (label.value === 0 || !ids.includes(id)) {
        client.Label.Remove(id);
        delete this.amap.source.labels[id];
      }
    }
  }

  private garbageTimeFiltering(filter: GarbageTimeFilter, time?: number) {
    if (time === undefined || time <= 0) return false;
    return time >= filter;
  }

  getBattery(value: number) {
    if (value < 70) {
      return CesiumDataController.BatteryLevel.empty;
    } else if (value < 90) {
      return CesiumDataController.BatteryLevel.half;
    } else {
      return CesiumDataController.BatteryLevel.full;
    }
  }

  async setBatteryLabel(stations: GarbageStation[]) {
    let controller = await this.amap.controller;
    let client = await this.amap.client;
    let opts = new Array();
    for (let i = 0; i < stations.length; i++) {
      const station = stations[i];
      if (!station.ConstructionData) continue;

      let point = controller.Village.Point.Get(station.DivisionId!, station.Id);

      const opt = new CesiumDataController.LabelOptions();
      opt.position = point.position;
      opt.id = point.id;
      opt.image = new CesiumDataController.ImageOptions();
      opt.image.value = this.getBattery(
        station.ConstructionData.PercentageOfCapacity ?? 0
      );
      opt.image.resource = CesiumDataController.ImageResource.battery;
      opt.position = point.position;
      opts.push(opt);
    }
    client.Label.Set(opts, CesiumDataController.ImageResource.battery);
  }
}
