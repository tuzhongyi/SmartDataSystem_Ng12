import { formatDate } from '@angular/common';
import { EventEmitter, Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { Flags } from 'src/app/common/tools/flags';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { StationState } from 'src/app/enum/station-state.enum';
import { StationType } from 'src/app/enum/station-type.enum';
import { StoreService } from 'src/app/common/service/store.service';
import { Language } from 'src/app/common/tools/language';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationStatisticNumbersParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class AMapBusiness {
  constructor(
    private storeService: StoreService,
    private stationService: GarbageStationRequestService,
    private divisionService: DivisionRequestService
  ) {
    this.storeService.interval.subscribe((x) => {
      this.reload(false);
    });
    this.storeService.statusChange.subscribe((x) => {
      this.divisionSelect(this.storeService.divisionId);
      let promise = this.GetPointCount(
        this.storeService.divisionId,
        this.storeService.divisionType
      );
      promise.then((count) => {
        this.pointCountChanged.emit(count);
      });
    });
  }

  private mapClient?: CesiumMapClient;
  private mapController?: CesiumDataController.Controller;

  labelVisibility = false;

  // 当显示垃圾落地时长的时候，是否显示其他厢房
  private stationVisibilityByLabel = true;
  get StationVisibilityByLabel() {
    return this.stationVisibilityByLabel;
  }
  set StationVisibilityByLabel(val: boolean) {
    //if (this.stationVisibilityByLabel === val) return;
    this.stationVisibilityByLabel = val;
    if (this.mapClient) {
      this.source.all.forEach((x) => {
        this.mapClient!.Point.SetVisibility(x.Id, val);
      });
    }
  }

  pointCountChanged: EventEmitter<number> = new EventEmitter();

  pointDoubleClicked: EventEmitter<GarbageStation> = new EventEmitter();

  mapClicked: EventEmitter<void> = new EventEmitter();

  source: AMapDataSource = {
    all: [],
    drop: [],
    labels: {},
    points: {},
    ripple: [],
  };

  getSrc() {
    const host = document.location.hostname;
    const port = document.location.port;
    //let date = this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
    const date = formatDate(new Date(), 'yyyyMMddHHmmss', 'en');

    return `http://${host}:${port}/amap/map_ts.html?v=${date}`;
  }
  loaded = false;
  init(cache = true) {
    if (!cache) {
      this.stationService.cache.clear();
    }
    let promise = this.stationService.cache.all();
    promise.then((x) => {
      this.source.all = x;
      this.setPointStatus(this.source.all);
      this.setRippleLabel(this.source.all);
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
    let p = this.GetPointCount(
      this.storeService.divisionId,
      this.storeService.divisionType
    );
    p.then((count) => {
      this.pointCountChanged.emit(count);
    });
    return p;
  }

  reload(cache = true) {
    this.init(cache);
    if (this.labelVisibility) {
      this.setLabelVisibility(true);
    }
  }

  createMapClient(iframe: HTMLIFrameElement) {
    this.mapClient = new CesiumMapClient(iframe);
    this.mapClient.Events.OnLoaded = async () => {
      this.mapController = this.mapClient!.DataController;

      this.init().then(() => {
        timer(0.1 * 1000)
          .toPromise()
          .then(() => {
            if (this.mapClient) {
            }
            this.ChangePoint();
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

  ChangePoint() {
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
            case StationType.NucleicAcid:
              if (point.type != CesiumDataController.ElementType.NucleicAcid) {
                point.type = CesiumDataController.ElementType.NucleicAcid;
                point.url = 'img/acid.png';
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
      this.mapClient.Village.Mask(divisionId);
      this.mapClient.Village.Select(divisionId, true);
      // this.mapClient.Viewer.Focus(divisionId);
      if (this.mapController) {
        let village = this.mapController.Village.Get(divisionId);
        this.mapClient.Viewer.MoveTo(village.center);
      }
    }
  }

  divisionSelect(divisionId: string, isBasic = false) {
    if (this.mapClient) {
      this.mapClient.Village.Select(
        divisionId,
        this.storeService.defaultDivisionId === divisionId
      );
      // this.mapClient.Viewer.Focus(divisionId);

      if (this.mapController) {
        let village = this.mapController.Village.Get(divisionId);
        this.mapClient.Viewer.MoveTo(village.center);
      }
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

  setPointStatus(stations: GarbageStation[]) {
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
        let flags = new Flags(station.StationState);
        if (flags.contains(StationState.Error)) {
          status.status = 2;
        } else if (flags.contains(StationState.Full)) {
          status.status = 1;
        } else if (flags.contains(StationState.Smoke)) {
          status.status = 1;
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

  labelFilter = GarbageTimeFilter.all;
  GarbageTimeFiltering(filter: GarbageTimeFilter, time?: number) {
    if (time === undefined || time <= 0) return false;
    return time >= filter;
  }

  async setLabel(stations: GarbageStation[], filter: GarbageTimeFilter) {
    if (!this.mapClient) return;
    const params = new GetGarbageStationStatisticNumbersParams();
    params.PageSize = 9999;
    params.Ids = stations.map((x) => x.Id);
    const list = await this.stationService.statistic.number.list(params);

    let drop = list.Data.filter((x) => {
      return this.GarbageTimeFiltering(filter, x.CurrentGarbageTime);
    });
    let dropIds = drop.map((x) => {
      return x.Id;
    });

    this.source.drop = stations.filter((x) => dropIds.includes(x.Id));
    const opts = new Array();
    for (let i = 0; i < drop.length; i++) {
      const data = drop[i];
      const station = stations.find((x) => x.Id == data.Id);

      if (
        station &&
        data.CurrentGarbageTime != undefined &&
        data.CurrentGarbageTime > 0
      ) {
        let point = this.source.points[data.Id];
        if (!point) {
          point = this.mapClient.DataController.Village.Point.Get(
            station.DivisionId!,
            station.Id
          );
          this.source.points[point.id] = point;
        }
        if (!point) continue;
        const opt = new CesiumDataController.LabelOptions();
        opt.position = point.position;
        opt.id = point.id;

        let p = data.CurrentGarbageTime / 240;
        p = p > 1 ? 1 : p;

        const hours = parseInt((data.CurrentGarbageTime / 60).toString());
        const minutes = parseInt(
          (Math.ceil(data.CurrentGarbageTime) % 60).toString()
        );

        opt.text = hours
          ? hours + Language.json.Time.hour
          : minutes
          ? minutes + Language.json.Time.minute
          : '';

        const color = new CesiumDataController.Color();
        color.rgb = '#36e323';
        color.hsl = new CesiumDataController.HSL();
        color.hsl.h = 120 - parseInt((p * 90).toString());
        color.hsl.s = 100;
        color.hsl.l = 60;

        opt.color = color;
        opt.value = p;
        if (opt.text) {
          opt.image = new CesiumDataController.ImageOptions();
          opt.image.color = color;
          opt.image.value = p;
          opt.image.resource = CesiumDataController.ImageResource.arcProgress;
        }
        opts.push(opt);
        this.source.labels[opt.id] = opt;
      }
    }

    const ids = opts.map((x) => x.id);

    this.mapClient.Label.Set(opts);
    for (const id in this.source.labels) {
      if (Object.prototype.hasOwnProperty.call(this.source.labels, id)) {
        const label = this.source.labels[id];
        if (label.value === 0 || !ids.includes(id)) {
          this.mapClient.Label.Remove(id);
          delete this.source.labels[id];
        }
      }
    }
  }

  async GetPointCount(villageId: string, divisionType: DivisionType) {
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

  setPointVisibility(value: boolean) {
    this.source.all.forEach((x) => {
      if (!value) {
        if (this.source.labels[x.Id]) {
          this.mapClient!.Point.SetVisibility(x.Id, true);
        } else {
          this.mapClient!.Point.SetVisibility(x.Id, value);
        }
      } else {
        this.mapClient!.Point.SetVisibility(x.Id, value);
      }
    });
  }

  async setRippleLabel(stations: GarbageStation[]) {
    if (!this.mapController || !this.mapClient) return;

    let opts = new Array();
    let ids = new Array();
    for (let i = 0; i < stations.length; i++) {
      const station = stations[i];
      ids.push(station.Id);
      let flags = new Flags(station.StationState);
      if (!flags.contains(StationState.Smoke)) continue;

      let point = this.mapController.Village.Point.Get(
        station.DivisionId!,
        station.Id
      );

      const opt =
        new CesiumDataController.LabelOptions<CesiumDataController.AlarmColor>();
      opt.position = point.position;
      opt.id = point.id;
      opt.image =
        new CesiumDataController.ImageOptions<CesiumDataController.AlarmColor>();
      opt.image.value = CesiumDataController.AlarmColor.orange;
      opt.image.resource = CesiumDataController.ImageResource.ripple;
      opt.position = point.position;
      opts.push(opt);
    }

    this.mapClient.Label.Remove(ids);

    this.mapClient.Label.Set(opts, CesiumDataController.ImageResource.ripple);

    if (opts.length > 0) {
      this.mapClient.Label.Show(CesiumDataController.ImageResource.ripple);
    } else {
      this.mapClient.Label.Hide(CesiumDataController.ImageResource.ripple);
    }
  }

  async setLabelVisibility(value: boolean) {
    this.labelVisibility = value;
    if (this.mapClient) {
      if (value) {
        this.mapClient.Label.Show();
        return await this.setLabel(this.source.all, this.labelFilter).then(
          () => {
            timer(100)
              .toPromise()
              .then(() => {
                this.setLabel(this.source.all, this.labelFilter);
              });
          }
        );
      } else {
        this.mapClient.Label.Hide();
      }
    }
  }

  menuEvents = {
    illegalDropClicked: new EventEmitter(),
    mixedIntoClicked: new EventEmitter(),
    garbageCountClicked: new EventEmitter(),
    stationInformationClicked: new EventEmitter(),
    disarmClicked: new EventEmitter(),
  };

  setContentMenu() {
    if (!this.mapClient) return;
    this.mapClient.ContextMenu.AddItem(
      `<i class="howell-icon-ebikepark" style="font-size: 18px"></i> 火灾预警解除`,
      async (id: string) => {
        this.onMapClicked();

        let station = this.source.all.find((x) => x.Id === id);
        if (!station) {
          const station = await this.stationService.cache.get(id);
          this.source.all.push(station);
        }
        this.menuEvents.disarmClicked.emit(station);
      },
      2
    );

    this.mapClient.ContextMenu.AddItem(
      `<i class="howell-icon-Subsystem" style="font-size: 18px"></i> 车棚${Language.json.info}`,
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
      `<i class="howell-icon-video" style="font-size: 18px"></i> 车棚${Language.json.video}`,
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
}

interface AMapDataSource {
  all: GarbageStation[];
  drop: GarbageStation[];
  labels: Global.Dictionary<CesiumDataController.LabelOptions>;
  points: Global.Dictionary<CesiumDataController.Point>;
  ripple: GarbageStation[];
}

export enum GarbageTimeFilter {
  all = 0,
  m30 = 30 - 1,
  h1 = 60 - 1,
  h2 = 120 - 1,
  h3 = 180 - 1,
  h4 = 240 - 1,
}
