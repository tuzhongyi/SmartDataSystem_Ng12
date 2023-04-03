import { formatDate } from '@angular/common';
import { EventEmitter, Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Language } from 'src/app/common/tools/language';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { StationState } from 'src/app/enum/station-state.enum';
import { StationType } from 'src/app/enum/station-type.enum';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationStatisticNumbersParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { GarbageStationModel } from 'src/app/view-model/garbage-station.model';
import { AMapLabelOptionConverter } from './amap-label-option.converter';
import {
  AMapDataSource,
  AMapVisibility,
  GarbageTimeFilter,
} from './amap.model';

@Injectable()
export class AMapBusiness {
  pointCountChanged: EventEmitter<number> = new EventEmitter();
  pointDoubleClicked: EventEmitter<GarbageStationModel> = new EventEmitter();
  mapClicked: EventEmitter<void> = new EventEmitter();
  menuEvents = {
    illegalDropClicked: new EventEmitter(),
    mixedIntoClicked: new EventEmitter(),
    garbageCountClicked: new EventEmitter(),
    stationInformationClicked: new EventEmitter(),
  };

  get src() {
    const host = document.location.hostname;
    const port = document.location.port;
    const date = formatDate(new Date(), 'yyyyMMddHHmmss', 'en');
    return `http://${host}:${port}/amap/map_ts.html?v=${date}`;
  }
  visibility = new AMapVisibility();

  private mapClient?: CesiumMapClient;
  private mapController?: CesiumDataController.Controller;
  private labelOptionConverter = new AMapLabelOptionConverter();

  public source: AMapDataSource = {
    all: [],
    drop: [],
    labels: {},
    points: {},
  };

  constructor(
    private storeService: GlobalStorageService,
    private stationService: GarbageStationRequestService,
    private divisionService: DivisionRequestService
  ) {
    this.storeService.interval.subscribe((x) => {
      this.init();

      if (this.visibility.label.value) {
        this.visibility.label.change.emit(true);
      }
    });
    this.storeService.statusChange.subscribe((x) => {
      this.divisionSelect(this.storeService.divisionId);
      let promise = this.getPointCount(
        this.storeService.divisionId,
        this.storeService.divisionType
      );
      promise.then((count) => {
        this.pointCountChanged.emit(count);
      });
    });
    this.initVisibility();
  }

  private initVisibility() {
    this.visibility.station.change.subscribe((x) => {});
    this.visibility.construction.change.subscribe((x) => {});
    this.visibility.label.retention.change.subscribe((x) => {
      this.setLabels(this.source.all, x).then((x) => {
        this.visibility.label.station.value =
          this.visibility.label.station.value;
      });
    });
    // 当显示垃圾落地时长的时候，是否显示其他厢房
    this.visibility.label.station.change.subscribe((value) => {
      this.source.all.forEach((station) => {
        if (!value) {
          if (this.source.labels[station.Id]) {
            this.mapClient!.Point.SetVisibility(station.Id, true);
          } else {
            this.mapClient!.Point.SetVisibility(station.Id, value);
          }
        } else {
          this.mapClient!.Point.SetVisibility(station.Id, value);
        }
      });
    });
    this.visibility.label.change.subscribe((x) => {
      if (this.mapClient) {
        if (x) {
          this.mapClient.Label.Show();
          this.setLabels(
            this.source.all,
            this.visibility.label.retention.value
          );
        } else {
          this.mapClient.Label.Hide();
        }
      }
    });
  }

  private init() {
    let promise = this.stationService.cache.all();
    promise.then((x) => {
      this.source.all = x;
      this.setPointStatus(this.source.all);
      if (this.mapClient) {
        this.source.all.forEach((x) => {
          if (this.mapController) {
            this.mapController.Village.Point.Asyn.Get(
              x.DivisionId!,
              x.Id,
              (point) => {
                this.source.points[point.id] = point;
              }
            );
          }
        });
      }
    });
    let p = this.getPointCount(
      this.storeService.divisionId,
      this.storeService.divisionType
    );
    p.then((count) => {
      this.pointCountChanged.emit(count);
    });
    return p;
  }

  createMapClient(iframe: HTMLIFrameElement) {
    this.mapClient = new CesiumMapClient(iframe);
    this.mapClient.Events.OnLoaded = async () => {
      this.mapController = this.mapClient!.DataController;
      this.init().then(() => {
        timer(0.1 * 1000)
          .toPromise()
          .then(() => {
            this.changePoint();
          });
      });

      this.mapClient!.Events.OnElementsDoubleClicked = (elements) => {
        if (elements && elements.length > 0) {
          this.onPointDoubleClicked(
            elements[0] as unknown as CesiumDataController.Point
          );
        }
      };
      this.mapClient!.Events.OnMouseClick = () => {
        this.onMapClicked();
      };

      this.loadDivision(this.storeService.divisionId);

      this.setContentMenu();
    };
  }

  changePoint() {
    if (!this.mapController) return;
    for (let i = 0; i < this.source.all.length; i++) {
      const point = this.mapController.Village.Point.Get(
        this.source.all[i].DivisionId!,
        this.source.all[i].Id
      );
      if (point) {
        let changed = false;
        this.source.points[point.id] = point;
        if (point.name !== this.source.all[i].Name) {
          point.name = this.source.all[i].Name;
          changed = true;
        }
        if (this.source.all[i].StationType != undefined) {
          switch (this.source.all[i].StationType) {
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
            default:
              break;
          }
        }
        if (changed) {
          this.mapController.Village.Point.Update(
            this.source.all[i].DivisionId!,
            this.source.all[i].Id,
            point
          );
        }
      }
    }
  }

  loadDivision(divisionId: string) {
    if (this.mapClient) {
      this.mapClient.Village.Select(divisionId, true);
      this.mapClient.Viewer.Focus(divisionId);
    }
  }

  divisionSelect(divisionId: string) {
    if (this.mapClient) {
      this.mapClient.Village.Select(divisionId, false);
      this.mapClient.Viewer.Focus(divisionId);
    }
  }

  pointSelect(stationId: string) {
    if (this.mapClient) {
      let point = this.source.points[stationId];
      this.mapClient.Viewer.MoveTo(point.position);
    }
  }

  onPointDoubleClicked(point: CesiumDataController.Point) {
    let station = this.source.all.find((x) => x.Id === point.id);
    this.pointDoubleClicked.emit(station);
  }

  onMapClicked() {
    this.mapClicked.emit();
  }

  setPointStatus(stations: GarbageStationModel[]) {
    console.log('setPointStatus');
    if (!this.mapClient || !stations || stations.length === 0) return;

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
    this.mapClient.Point.Status(arrayStatus);
  }

  garbageTimeFiltering(filter: GarbageTimeFilter, time?: number) {
    if (time === undefined || time <= 0) return false;
    return time >= filter;
  }

  private async getStatistic(stationIds: string[]) {
    let params = new GetGarbageStationStatisticNumbersParams();
    params.Ids = stationIds;
    let paged = await this.stationService.statistic.number.list(params);
    return paged.Data;
  }

  getPoint(stationId: string, divisionId?: string) {
    let point = this.source.points[stationId];
    if (point) {
      return point;
    }
    if (this.mapClient && divisionId) {
      point = this.mapClient.DataController.Village.Point.Get(
        divisionId,
        stationId
      );
      if (point) {
        this.source.points[point.id] = point;
      }
    }
    return this.source.points[stationId];
  }

  async setLabels(stations: GarbageStationModel[], filter: GarbageTimeFilter) {
    if (!this.mapClient) return;

    // 获取统计数据
    const list = await this.getStatistic(stations.map((x) => x.Id));
    // 筛选需要的统计数据
    let drop = list.filter((x) => {
      return this.garbageTimeFiltering(filter, x.CurrentGarbageTime);
    });
    let dropIds = drop.map((x) => {
      return x.Id;
    });
    // 记录被统计的厢房
    this.source.drop = this.source.all.filter((x) => dropIds.includes(x.Id));
    const opts = new Array();
    for (let i = 0; i < drop.length; i++) {
      const data = drop[i];
      const station = this.source.drop.find((x) => x.Id == data.Id);

      if (
        station &&
        data.CurrentGarbageTime != undefined &&
        data.CurrentGarbageTime > 0
      ) {
        let point = this.getPoint(station.Id, station.DivisionId);
        if (!point) continue;
        const opt = this.labelOptionConverter.Convert(data, point.position);
        opts.push(opt);
        this.source.labels[opt.id] = opt;
      }
    }

    this.mapClient.Label.Set(
      opts,
      CesiumDataController.ImageResource.arcProgress
    );

    const ids = opts.map((x) => x.id);
    for (const id in this.source.labels) {
      const label = this.source.labels[id];
      if (label.value === 0 || !ids.includes(id)) {
        this.mapClient.Label.Remove(id);
        delete this.source.labels[id];
      }
    }
  }

  async getPointCount(villageId: string, divisionType: DivisionType) {
    let count = 0;
    if (this.mapController) {
      if (divisionType === DivisionType.Committees) {
        let ids = this.mapController.Village.Point.GetIds(villageId);
        count = ids.current.length;
      } else {
        let params = new GetDivisionsParams();
        params.AncestorId = villageId;
        params.PageSize = 99999;
        let paged = await this.divisionService.list(params);
        paged.Data.forEach((item) => {
          let points = this.mapController!.Village.Point.List(item.Id);
          for (const key in points) {
            count++;
          }
        });
      }
    }
    return count;
  }

  setContentMenu() {
    if (!this.mapClient) return;
    this.mapClient.ContextMenu.AddItem(
      `<i class="howell-icon-nolittering" style="font-size: 18px"></i> ${Language.json.EventType.IllegalDrop}${Language.json.record}`,
      async (id: string) => {
        this.onMapClicked();

        let station = this.source.all.find((x) => x.Id === id);
        if (!station) {
          const station = await this.stationService.cache.get(id);
          this.source.all.push(station);
        }
        this.menuEvents.illegalDropClicked.emit(station);
      },
      0
    );
    this.mapClient.ContextMenu.AddItem(
      `<i class="howell-icon-mixlittering" style="font-size: 18px"></i> ${Language.json.EventType.MixedInto}${Language.json.record}`,
      async (id: string) => {
        this.onMapClicked();

        let station = this.source.all.find((x) => x.Id === id);
        if (!station) {
          const station = await this.stationService.cache.get(id);
          this.source.all.push(station);
        }
        this.menuEvents.mixedIntoClicked.emit(station);
      },
      1
    );
    this.mapClient.ContextMenu.AddItem(
      `<i class="howell-icon-garbagebags" style="font-size: 18px"></i> ${Language.json.small}${Language.json.garbage}${Language.json.stay}`,
      async (id: string) => {
        this.onMapClicked();

        let station = this.source.all.find((x) => x.Id === id);
        if (!station) {
          const station = await this.stationService.cache.get(id);
          this.source.all.push(station);
        }
        this.menuEvents.garbageCountClicked.emit(station);
      },
      2
    );

    this.mapClient.ContextMenu.AddItem(
      `<i class="howell-icon-Subsystem" style="font-size: 18px"></i> ${Language.json.station}${Language.json.info}`,
      async (id: string) => {
        this.onMapClicked();
        const status = document.getElementsByClassName(
          'map-bar status'
        )[0] as HTMLElement;
        if (status) {
          status['style'].display = 'none';
        }
        let station = this.source.all.find((x) => x.Id === id);
        if (!station) {
          const station = await this.stationService.cache.get(id);
          this.source.all.push(station);
        }
        this.menuEvents.stationInformationClicked.emit(station);
      },
      3
    );
    this.mapClient.ContextMenu.AddItem(
      `<i class="howell-icon-video" style="font-size: 18px"></i> ${Language.json.station}${Language.json.video}`,
      async (id: string) => {
        let station = this.source.all.find((x) => x.Id === id);
        if (!station) {
          const station = await this.stationService.cache.get(id);
          this.source.all.push(station);
        }
        this.pointDoubleClicked.emit(station);
      },
      4
    );

    this.mapClient.ContextMenu.Enable();
  }

  garbageStationVisibility(value: boolean) {
    this.source.all.forEach((x) => {
      if (x.StationType === StationType.Garbage) {
        if (this.mapClient) {
          this.mapClient.Point.SetVisibility(x.Id, value);
        }
      }
    });
  }
  constructionStationVisibility(value: boolean) {
    this.source.all.forEach((x) => {
      if (x.StationType === StationType.Construction) {
        if (this.mapClient) {
          this.mapClient.Point.SetVisibility(x.Id, value);
          if (value) {
            this.mapClient.Label.Show(
              CesiumDataController.ImageResource.battery
            );
          } else {
            this.mapClient.Label.Hide(
              CesiumDataController.ImageResource.battery
            );
          }
        }
      }
    });
  }
}
