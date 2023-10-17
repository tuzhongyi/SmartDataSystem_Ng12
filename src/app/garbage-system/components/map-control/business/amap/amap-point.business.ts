import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Flags } from 'src/app/common/tools/flags';
import { wait2 } from 'src/app/common/tools/tool';
import { StationState } from 'src/app/enum/station-state.enum';
import { StationType } from 'src/app/enum/station-type.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { GarbageStationNumberStatisticModel, PointCount } from '../amap.model';
import { AMapPointContextMenuBusiness } from './amap-point-menu.business';
import { AMapPointPlugBusiness } from './amap-point-plug.business';
import { AMapPointViewBusiness } from './amap-point-view.business';
import { AMapClient } from './amap.client';
import { AMapEvent } from './amap.event';
import { AMapService } from './amap.service';

@Injectable()
export class AMapPointBusiness {
  constructor(
    private amap: AMapClient,
    private service: AMapService,
    private global: GlobalStorageService,
    public plug: AMapPointPlugBusiness,
    public menu: AMapPointContextMenuBusiness,
    public event: AMapEvent,
    public view: AMapPointViewBusiness
  ) {
    this.global.interval.subscribe((x) => {
      this.keep();
    });
    this.menu.init();
    this.view.visibile.subscribe((x) => {
      this.visibile(x.datas, x.show);
      this.plug.battery.visibile(x.datas, x.show);
    });
  }

  private inited = false;
  private initing = false;
  async init() {
    if (this.initing) {
      return;
    }
    this.initing = true;
    return this.load().then((x) => {
      this.change();

      this.inited = true;
      this.initing = false;

      this.initConstruction();
      this.status(this.amap.source.all);

      return this.count(this.global.divisionId);
    });
  }

  initConstruction() {
    let constructions = this.amap.source.all.filter(
      (x) => x.StationType === StationType.Construction
    );
    this.plug.battery.set(constructions);
    this.visibile(constructions, true);
  }

  //#region Load
  /** 加载厢房和点位数据 完成后 重置显示状态和统计点位数量 */
  private async load() {
    return new Promise<void>((resolve) => {
      let all = [this.loadStations(), this.loadStatistic(), this.loadPoints()];
      return Promise.all(all).then((source) => {
        for (let i = 0; i < this.amap.source.drop.all.length; i++) {
          let item = this.amap.source.drop.all[i];
          item.GarbageStation = this.amap.source.all.find(
            (x) => item.Id === x.Id
          )!;
        }
        resolve();
      });
    });
  }
  loadStatistic() {
    return this.service.drop().then((drop) => {
      return (this.amap.source.drop.all = drop.map((x) => {
        let plain = instanceToPlain(x);
        return plainToInstance(GarbageStationNumberStatisticModel, plain);
      }));
    });
  }
  /** 加载所有厢房 */
  async loadStations() {
    this.amap.source.all = await this.service.all();
    return this.amap.source.all;
  }
  /** 加载化所有点位 */
  async loadPoints() {
    let controller = await this.amap.controller;
    let points = controller.Village.Point.All(
      await this.global.defaultDivisionId
    );
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      this.amap.source.points[point.id] = point;
    }
    return points;
  }
  //#endregion

  /** 选中点位并移动到屏幕中心 */
  async select(stationId: string) {
    let client = await this.amap.client;
    let point = this.amap.source.points[stationId];
    client.Viewer.MoveTo(point.position);
    client.Point.Select(point.id);
  }
  /** 修改点位类型 */
  async change() {
    let controller = await this.amap.controller;
    for (let i = 0; i < this.amap.source.all.length; i++) {
      const point = controller.Village.Point.Get(
        this.amap.source.all[i].DivisionId!,
        this.amap.source.all[i].Id
      );
      if (point) {
        let changed = false;
        this.amap.source.points[point.id] = point;
        if (point.name !== this.amap.source.all[i].Name) {
          point.name = this.amap.source.all[i].Name;
          changed = true;
        }
        if (this.amap.source.all[i].StationType != undefined) {
          switch (this.amap.source.all[i].StationType) {
            case StationType.Garbage:
              if (point.type != CesiumDataController.ElementType.Camera) {
                point.type = CesiumDataController.ElementType.Camera;
                point.url = 'img/garbage.png';
                changed = true;
              }
              break;
            case StationType.Construction:
              if (point.type != CesiumDataController.ElementType.LargeWaste) {
                point.type = CesiumDataController.ElementType.LargeWaste;
                point.url = 'img/largewaste.png';
                changed = true;
              }
              break;

            case StationType.Smart:
              if (point.type != CesiumDataController.ElementType.SmartStation) {
                point.type = CesiumDataController.ElementType.SmartStation;
                point.url = 'img/rfid.png';
                changed = true;
              }
              break;
            case StationType.Rfid:
              if (point.type != CesiumDataController.ElementType.Rfid) {
                point.type = CesiumDataController.ElementType.Rfid;
                point.url = 'img/rfid.png';
                changed = true;
              }
              break;
            default:
              break;
          }
        }
        if (changed) {
          controller.Village.Point.Update(
            this.amap.source.all[i].DivisionId!,
            this.amap.source.all[i].Id,
            point
          );
        }
      }
    }
  }

  async right(pointId: string) {
    let client = await this.amap.client;
    client.Point.RightClick(pointId);
  }

  async status(stations?: GarbageStation[]) {
    if (!stations || stations.length === 0) return;

    let client = await this.amap.client;

    const arrayStatus = new Array();

    for (let i = 0; i < stations.length; i++) {
      const station = stations[i];
      try {
        const status = {
          id: station.Id,
          status: 0,
        };
        let index = this.amap.source.drop.all.findIndex(
          (item) => item.Id === station.Id
        );
        let flags = new Flags(station.StationState);
        if (flags.contains(StationState.Error)) {
          status.status = 4;
        } else if (flags.contains(StationState.Full)) {
          status.status = 1;
        } else if (index >= 0) {
          status.status = 3;
        } else {
          status.status = 0;
        }

        arrayStatus.push(status);
      } catch (ex) {
        console.error(ex);
      }
    }
    // console.log(arrayStatus);
    client.Point.Status(arrayStatus);
  }

  async count(villageId: string): Promise<PointCount> {
    return new Promise((resolve) => {
      wait2(
        () => {
          return this.inited;
        },
        100,
        0
      ).then(async (x) => {
        let count = 0;
        let normal = 0;
        let full = 0;
        let error = 0;
        let controller = await this.amap.controller;
        let points = controller.Village.Point.All(villageId);
        count = points.length;
        for (let i = 0; i < points.length; i++) {
          const point = points[i];
          let station = this.amap.source.all.find((x) => x.Id === point.id);
          if (station) {
            let contain = false;
            let flags = new Flags(station.StationState);
            if (flags.contains(StationState.Error)) {
              error++;
              contain = true;
            }
            if (flags.contains(StationState.Full)) {
              full++;
              contain = true;
            }
            if (contain == false) {
              normal++;
            }
          } else {
            console.warn('地图上多出点位：', station);
          }
        }

        let result = {
          count: count,
          normal: normal,
          full: full,
          error: error,
          drop: this.amap.source.drop.all.length,
        };
        this.event.point.count.emit(result);
        resolve(result);
      });
    });
  }

  display = {
    construction: true,
  };

  keep() {
    this.load().then((x) => {
      this.visibile(this.amap.source.all, false);

      this.view.station.keep();
      this.view.rfid.keep();
      this.view.construction.keep();
      this.count(this.global.divisionId);
    });
  }

  constructionview(show: boolean) {
    this.display.construction = show;
    this.visibile(this.amap.source.construction, show);
    if (show) {
      this.plug.battery.show();
    } else {
      this.plug.battery.hide();
    }
  }

  async visibile(models: GarbageStation[], show: boolean) {
    let client = await this.amap.client;

    for (let i = 0; i < models.length; i++) {
      client.Point.SetVisibility(models[i].Id, show);
    }
    if (show) {
      this.status(models);
    }
  }
}
