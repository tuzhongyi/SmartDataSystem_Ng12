import { Injectable } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { wait } from 'src/app/common/tools/tool';
import { StationState } from 'src/app/enum/station-state.enum';
import { StationType } from 'src/app/enum/station-type.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { GarbageStationModel } from 'src/app/view-model/garbage-station.model';
import { PointCount } from '../amap.model';
import { AMapPointContextMenuBusiness } from './amap-point-menu.business';
import { AMapPointPlugBusiness } from './amap-point-plug.business';
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
    public event: AMapEvent
  ) {
    this.global.interval.subscribe((x) => {
      this.keep();
    });
    this.menu.init();
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
      let all = [this.loadStations(), this.loadPoints()];
      return Promise.all(all).then((source) => {
        this.amap.source.construction = this.amap.source.all.filter(
          (x) => x.StationType === StationType.Construction
        );
        this.service.drop().then((drop) => {
          this.amap.source.drop = drop.map((x) => {
            return {
              station: this.amap.source.all.find((y) => y.Id === x.Id)!,
              statistic: x,
            };
          });
        });

        resolve();
      });
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
    let points = controller.Village.Point.All(this.global.defaultDivisionId!);
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

  async status(stations?: GarbageStationModel[]) {
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
        let index = this.amap.source.drop.findIndex(
          (item) => item.station.Id === station.Id
        );

        if (station.StationState.contains(StationState.Error)) {
          status.status = 4;
        } else if (station.StationState.contains(StationState.Full)) {
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
      wait(
        () => {
          return this.inited;
        },
        100,
        0
      ).then(async (x) => {
        let count = 0;
        let normal = 0;
        let warm = 0;
        let error = 0;
        let controller = await this.amap.controller;
        let points = controller.Village.Point.All(villageId);
        count = points.length;
        for (let i = 0; i < points.length; i++) {
          const point = points[i];
          let station = this.amap.source.all.find((x) => x.Id === point.id);
          if (station) {
            let contain = false;
            if (station.StationState.contains(StationState.Error)) {
              error++;
              contain = true;
            }
            if (station.StationState.contains(StationState.Full)) {
              warm++;
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
          warm: warm,
          error: error,
          drop: this.amap.source.drop.length,
        };
        this.event.point.count.emit(result);
        resolve(result);
      });
    });
  }

  display = {
    construction: true,
    station: {
      normal: true,
      full: true,
      drop: true,
      error: true,
      in30: false,
      out30: false,
    },
  };

  keep() {
    this.load().then((x) => {
      this.visibile(this.amap.source.all, false);
      if (this.display.construction) {
        this.initConstruction();
        this.plug.battery.show();
      } else {
        this.plug.battery.hide();
      }
      if (this.display.station.normal) {
        this.stationnormalview(true);
      }
      if (this.display.station.full) {
        this.stationfullview(true);
      }
      if (this.display.station.drop) {
        this.stationdropview(true);
      }
      if (this.display.station.error) {
        this.stationerrorview(true);
      }
      if (this.display.station.in30) {
        this.station30inview(true);
      }
      if (this.display.station.out30) {
        this.station30outview(true);
      }
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
  async stationnormalview(show: boolean) {
    this.display.station.normal = show;
    let dropIds = this.amap.source.drop.map((x) => x.station.Id);
    let stations = this.amap.source.all.filter(
      (x) =>
        (x.StationType === StationType.Garbage ||
          x.StationType === StationType.Smart ||
          x.StationType === StationType.Rfid) &&
        x.StationState.value === 0 &&
        !dropIds.includes(x.Id)
    );

    this.visibile(stations, show);
  }
  stationfullview(show: boolean) {
    this.display.station.full = show;
    let dropIds = this.amap.source.drop.map((x) => x.station.Id);
    let stations = this.amap.source.all.filter(
      (x) =>
        (x.StationType === StationType.Garbage ||
          x.StationType === StationType.Smart ||
          x.StationType === StationType.Rfid) &&
        x.StationState.contains(StationState.Full) &&
        !(this.display.station.drop && dropIds.includes(x.Id))
    );
    this.visibile(stations, show);
  }
  async stationdropview(show: boolean) {
    this.display.station.drop = show;
    let stations = this.amap.source.drop
      .map((x) => x.station)
      .filter((x) => {
        return !(
          this.display.station.full &&
          x.StationState.contains(StationState.Full)
        );
      });
    this.visibile(stations, show);
  }

  stationerrorview(show: boolean) {
    this.display.station.error = show;
    let stations = this.amap.source.all.filter((x) =>
      x.StationState.contains(StationState.Error)
    );
    this.visibile(stations, show);
  }
  async stationplugarc(show: boolean, query: (time?: number) => boolean) {
    let models = this.amap.source.drop.map((x) => x.statistic);

    if (show) {
      this.stationdropview(show);
      let drops = models.filter((x) => query(x.CurrentGarbageTime));
      let surplus = this.amap.source.plug.filter((x) => {
        return (
          query(x.CurrentGarbageTime) &&
          drops.findIndex((drop) => drop.Id === x.Id) < 0
        );
      });
      await this.plug.ace.clear(surplus);
      await this.plug.ace.set(drops);
      this.plug.ace.show();
    } else {
      let drops = this.amap.source.plug.filter((x) =>
        query(x.CurrentGarbageTime)
      );
      await this.plug.ace.clear(drops);
    }
  }
  async station30inview(show: boolean) {
    this.display.station.in30 = show;
    let query = (time?: number) => {
      return time ? time < 30 : true;
    };
    this.stationplugarc(show, query);
  }
  async station30outview(show: boolean) {
    this.display.station.out30 = show;
    let query = (time?: number) => {
      return time ? time >= 30 : false;
    };
    this.stationplugarc(show, query);
  }

  // 显示普通厢房
  async garbageStationVisibility(value: boolean) {
    let client = await this.amap.client;
    for (const key in this.amap.source.points) {
      if (
        this.amap.source.points[key].type !==
        CesiumDataController.ElementType.LargeWaste
      ) {
        client.Point.SetVisibility(key, value);
      }
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
