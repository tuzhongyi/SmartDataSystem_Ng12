import { Injectable } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { wait } from 'src/app/common/tools/tool';
import { StationState } from 'src/app/enum/station-state.enum';
import { StationType } from 'src/app/enum/station-type.enum';
import { GarbageStationModel } from 'src/app/view-model/garbage-station.model';
import { AMapVisibility, GarbageTimeFilter, PointCount } from '../amap.model';
import { AMapPointLabelBusiness } from './amap-point-label.business';
import { AMapPointContextMenuBusiness } from './amap-point-menu.business';
import { AMapClient } from './amap.client';
import { AMapEvent } from './amap.event';
import { AMapService } from './amap.service';

@Injectable()
export class AMapPointBusiness {
  constructor(
    private amap: AMapClient,
    private service: AMapService,
    private storeService: GlobalStorageService,
    public label: AMapPointLabelBusiness,
    public menu: AMapPointContextMenuBusiness,
    public event: AMapEvent
  ) {
    this.storeService.interval.subscribe((x) => {
      this.load();
      if (this.visibility.label.value) {
        this.visibility.label.change.emit(true);
      }
      this.visibility.label.station.change.emit(
        this.visibility.label.station.value
      );
    });
    this.initVisibility();
    this.menu.init();
  }
  visibility = new AMapVisibility();
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

      return this.count(this.storeService.divisionId);
    });
  }

  /** 加载厢房和点位数据 完成后 重置显示状态和统计点位数量 */
  private async load() {
    return new Promise<void>((resolve) => {
      let all = [this.loadStations(), this.loadPoints()];
      return Promise.all(all).then((x) => {
        this.status(this.amap.source.all);

        let constructions = this.amap.source.all.filter(
          (x) => x.StationType === StationType.Construction
        );
        if (this.label.display.battery) {
          this.label.setBatteryLabel(constructions);
        }
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
    let points = controller.Village.Point.All(
      this.storeService.defaultDivisionId!
    );
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      this.amap.source.points[point.id] = point;
    }
    return points;
  }
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
                point.url = 'img/camera.png';
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

        if (station.StationState.contains(StationState.Error)) {
          status.status = StationState.Error;
        } else if (station.StationState.contains(StationState.Full)) {
          status.status = StationState.Full;
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
        async () => {
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
          };
          this.event.point.count.emit(result);
          resolve(result);
        }
      );
    });
  }

  private initVisibility() {
    this.visibility.station.change.subscribe((x) => {});
    this.visibility.construction.change.subscribe((x) => {});
    this.visibility.label.retention.change.subscribe((x) => {
      this.label.set(this.amap.source.all, x).then((x) => {
        this.visibility.label.station.change.emit(
          this.visibility.label.station.value
        );
      });
    });
    // 当显示垃圾落地时长的时候，是否显示其他厢房
    this.visibility.label.station.change.subscribe((value) => {
      this.amap.client.then((client) => {
        this.amap.source.all.forEach((station) => {
          if (!value) {
            if (this.amap.source.labels[station.Id]) {
              client!.Point.SetVisibility(station.Id, true);
            } else {
              client!.Point.SetVisibility(station.Id, value);
            }
          } else {
            client!.Point.SetVisibility(station.Id, value);
          }
        });
      });
    });
    this.visibility.label.change.subscribe((x) => {
      if (x) {
        this.label.show(CesiumDataController.ImageResource.arcProgress);
        this.label.set(
          this.amap.source.all,
          this.visibility.label.retention.value
        );
      } else {
        this.label.hide(CesiumDataController.ImageResource.arcProgress);
      }
    });
  }

  private garbageTimeFiltering(filter: GarbageTimeFilter, time?: number) {
    if (time === undefined || time <= 0) return false;
    return time >= filter;
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
  // 显示大件垃圾厢房
  async constructionStationVisibility(value: boolean) {
    this.label.display.battery = value;
    let client = await this.amap.client;
    this.amap.source.all.forEach((x) => {
      if (x.StationType === StationType.Construction) {
        client.Point.SetVisibility(x.Id, value);
        if (value) {
          this.label.show(CesiumDataController.ImageResource.battery);
        } else {
          this.label.hide(CesiumDataController.ImageResource.battery);
        }
      }
    });
  }
}
