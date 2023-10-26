import { Injectable } from '@angular/core';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { AMapClient } from './amap.client';

@Injectable()
export class AMapPointPlugBatteryBusiness {
  constructor(private amap: AMapClient) {}

  async set(stations: GarbageStation[]) {
    let controller = await this.amap.controller;
    let client = await this.amap.client;
    let opts = new Array();
    for (let i = 0; i < stations.length; i++) {
      const station = stations[i];
      if (!station.ConstructionData) continue;

      let point = controller.Village.Point.Get(station.DivisionId!, station.Id);
      let option = this.getBatteryOption(
        point,
        station.ConstructionData.PercentageOfCapacity ?? 0
      );
      opts.push(option);
    }
    client.Label.Set(opts, CesiumDataController.ImageResource.battery);
  }

  async show() {
    let client = await this.amap.client;
    client.Label.Show(CesiumDataController.ImageResource.battery);
  }
  async hide() {
    let client = await this.amap.client;
    client.Label.Hide(CesiumDataController.ImageResource.battery);
  }

  async remove(id: string | string[]) {
    let client = await this.amap.client;
    if (typeof id === 'string') {
      client.Label.Remove(id);
    } else {
      for (let i = 0; i < id.length; i++) {
        client.Label.Remove(id[i]);
      }
    }
  }

  visibile(stations: GarbageStation[], show: boolean) {
    if (show) {
      this.set(stations);
    } else {
      this.remove(stations.map((station) => station.Id));
    }
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

  private getBatteryOption(point: CesiumDataController.Point, value: number) {
    const opt = new CesiumDataController.LabelOptions();
    opt.position = point.position;
    opt.id = point.id;
    opt.image = new CesiumDataController.ImageOptions();
    opt.image.value = this.getBattery(value);
    opt.image.resource = CesiumDataController.ImageResource.battery;
    opt.position = point.position;
    return opt;
  }
}
