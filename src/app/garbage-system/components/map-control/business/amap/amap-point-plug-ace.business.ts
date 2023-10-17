import { Injectable } from '@angular/core';
import { IIdModel } from 'src/app/network/model/model.interface';
import { AMapLabelOptionConverter } from '../amap-label-option.converter';
import { GarbageStationNumberStatisticModel } from '../amap.model';
import { AMapClient } from './amap.client';
import { AMapService } from './amap.service';

@Injectable()
export class AMapPointPlugAceBusiness {
  constructor(private service: AMapService, private amap: AMapClient) {}

  private labelOptionConverter = new AMapLabelOptionConverter();

  async set(drops: GarbageStationNumberStatisticModel[]) {
    let client = await this.amap.client;
    // 记录被统计的厢房
    const opts = new Array<CesiumDataController.LabelOptions>();
    for (let i = 0; i < drops.length; i++) {
      let data = drops[i];

      if (data.CurrentGarbageTime != undefined && data.CurrentGarbageTime > 0) {
        let point = this.amap.source.points[data.Id];
        if (!point) continue;
        const opt = this.labelOptionConverter.Convert(data, point.position);
        opts.push(opt);
        this.amap.source.plug.all.unshift(data);
      }
    }

    client.Label.Set(opts, CesiumDataController.ImageResource.arcProgress);
    this.amap.source.plug.all = this.unique(this.amap.source.plug.all);
  }

  unique<T extends IIdModel>(arr: T[]) {
    for (var i = 0; i < arr.length; i++) {
      for (var j = i + 1; j < arr.length; j++) {
        if (arr[i].Id == arr[j].Id) {
          //第一个等同于第二个，splice方法删除第二个
          arr.splice(j, 1);
          j--;
        }
      }
    }
    return arr;
  }

  async clear(models: IIdModel[]) {
    let client = await this.amap.client;
    for (let i = 0; i < models.length; i++) {
      const model = models[i];
      client.Label.Remove(model.Id);
      let index = this.amap.source.plug.all.findIndex((x) => x.Id === model.Id);
      if (index >= 0) {
        this.amap.source.plug.all.splice(index, 1);
      }
    }
  }

  async show() {
    let client = await this.amap.client;
    client.Label.Show(CesiumDataController.ImageResource.arcProgress);
  }
  async hide() {
    let client = await this.amap.client;
    client.Label.Hide(CesiumDataController.ImageResource.arcProgress);
  }
}
