import { formatDate } from '@angular/common';
import { EventEmitter, Injectable } from '@angular/core';
import { Flags } from 'src/app/common/tools/flags';
import { StationState } from 'src/app/enum/station-state.enum';
import { StoreService } from 'src/app/global/service/store.service';
import { Language } from 'src/app/global/tool/language';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { GetGarbageStationStatisticNumbersParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class AMapBusiness {
  constructor(
    private storeService: StoreService,
    private stationService: GarbageStationRequestService
  ) {
    this.storeService.interval.subscribe((x) => {
      this.init();
      if (this.labelVisibility) {
        this.setLabelVisibility(true);
      }
    });
    this.storeService.statusChange.subscribe((x) => {
      this.divisionSelect(this.storeService.divisionId);
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

  pointDoubleClicked: EventEmitter<GarbageStation> = new EventEmitter();

  mapClicked: EventEmitter<void> = new EventEmitter();

  private source: AMapDataSource = {
    all: [],
    drop: [],
    labels: {},
    points: {},
  };

  getSrc() {
    const host = document.location.hostname;
    const port = document.location.port;
    //let date = this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
    const date = formatDate(new Date(), 'yyyyMMddHHmmss', 'en');

    return `http://${host}:${port}/amap/map_ts.html?v=${date}`;
  }
  loaded = false;
  init() {
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
  }

  createMapClient(iframe: HTMLIFrameElement) {
    this.mapClient = new CesiumMapClient(iframe);
    this.mapClient.Events.OnLoaded = async () => {
      this.mapController = this.mapClient!.DataController;
      this.init();

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
          status.status = StationState.Error;
        } else if (flags.contains(StationState.Full)) {
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

  async setLabel(stations: GarbageStation[]) {
    if (!this.mapClient) return;
    const params = new GetGarbageStationStatisticNumbersParams();
    params.PageSize = 9999;
    params.Ids = stations.map((x) => x.Id);
    const list = await this.stationService.statistic.number.list(params);

    let dropIds = list.Data.filter((x) => {
      return x.CurrentGarbageTime && x.CurrentGarbageTime > 0;
    }).map((x) => {
      return x.Id;
    });

    this.source.drop = stations.filter((x) => dropIds.includes(x.Id));

    const opts = new Array();
    for (let i = 0; i < list.Data.length; i++) {
      const data = list.Data[i];
      const station = stations.find((x) => x.Id == data.Id);

      if (station && data.CurrentGarbageTime && data.CurrentGarbageTime > 0) {
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

  setPointVisibility(value: boolean) {
    this.source.all.forEach((x) => {
      if (this.source.labels[x.Id]) return;
      this.mapClient!.Point.SetVisibility(x.Id, value);
    });
  }

  setLabelVisibility(value: boolean) {
    this.labelVisibility = value;
    if (this.mapClient) {
      if (value) {
        this.mapClient.Label.Show();
        this.setLabel(this.source.all);
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
  };

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
}

interface AMapDataSource {
  all: GarbageStation[];
  drop: GarbageStation[];
  labels: Global.Dictionary<CesiumDataController.LabelOptions>;
  points: Global.Dictionary<CesiumDataController.Point>;
}
