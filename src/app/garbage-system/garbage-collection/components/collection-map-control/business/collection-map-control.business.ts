import { formatDate } from '@angular/common';
import { EventEmitter, Injectable } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Language } from 'src/app/common/tools/language';
import { VehicleState } from 'src/app/enum/vehicle-state.enum';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';
import { CollectionMapControlConverter } from '../collection-map-control.converter';

@Injectable()
export class CollectionMapControlBusiness {
  constructor(
    private storeService: GlobalStorageService,
    private vehicleService: GarbageVehicleRequestService,
    private divisionService: DivisionRequestService
  ) {
    this.storeService.interval.subscribe((x) => {
      this.init();
    });
    this.storeService.statusChange.subscribe((x) => {
      this.divisionSelect(this.storeService.divisionId);
    });
  }
  private converter = new CollectionMapControlConverter();
  private iframe?: HTMLIFrameElement;

  private _mapClient: CesiumMapClient | undefined;
  public get mapClient(): CesiumMapClient | undefined {
    if (!this.iframe || !this.iframe.contentWindow) {
      return undefined;
    }
    return this._mapClient;
  }
  public set mapClient(v: CesiumMapClient | undefined) {
    this._mapClient = v;
  }

  pointCountChanged: EventEmitter<number> = new EventEmitter();

  pointDoubleClicked: EventEmitter<GarbageVehicle> = new EventEmitter();
  mapClicked: EventEmitter<void> = new EventEmitter();

  private source: AMapDataSource = {
    all: [],
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

  async init() {
    let promise = this.vehicleService.list();
    promise.then((paged) => {
      let datas = paged.Data;
      this.source.all = datas;
      // this.PointClean(this.source.points);
      this.PointUpdate(datas);
      this.setPointStatus(this.source.all);
    });
  }

  createMapClient(iframe: HTMLIFrameElement) {
    this.iframe = iframe;
    this.mapClient = new CesiumMapClient(iframe);
    this.mapClient.Events.OnLoaded = async () => {
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

  PointUpdate(datas: GarbageVehicle[]) {
    if (this.mapClient) {
      for (let i = 0; i < datas.length; i++) {
        const data = datas[i];
        if (!data.GisPoint) continue;
        let point = this.converter.GarbageVehicle(data);
        point.url = 'img/route/vehicle.png';
        this.mapClient.Point.Create(point);
        this.source.points[point.id] = point;
      }
    }
  }

  PointClean(datas: Global.Dictionary<CesiumDataController.Point>) {
    if (this.mapClient) {
      for (const pointId in datas) {
        this.mapClient.Point.Remove(pointId);
        delete datas[pointId];
      }
    }
  }
  loadDivision(divisionId: string) {
    if (this.mapClient) {
      this.mapClient.Village.Select(divisionId, true, false);
      this.mapClient.Viewer.Focus(divisionId);
    }
  }

  divisionSelect(divisionId: string) {
    if (this.mapClient) {
      this.mapClient.Village.Select(divisionId, false, false);
      this.mapClient.Viewer.Focus(divisionId);
    }
  }

  pointSelect(vehicle: GarbageVehicle) {
    if (this.mapClient) {
      let point = this.source.points[vehicle.Id];
      if (vehicle.GisPoint) {
        point.position = this.converter.GisPoint(vehicle.GisPoint);
      }
      if (point && point.position) {
        this.mapClient.Viewer.MoveTo(point.position);
      }
    }
  }

  onPointDoubleClicked(point: CesiumDataController.Point) {
    let vehicle = this.source.all.find((x) => x.Id === point.id);
    this.pointDoubleClicked.emit(vehicle);
  }

  onMapClicked() {
    this.mapClicked.emit();
  }

  setPointStatus(vehicles: GarbageVehicle[]) {
    console.log('setPointStatus');
    if (!this.mapClient || !vehicles || vehicles.length === 0) return;

    const arrayStatus = new Array();
    for (let i = 0; i < vehicles.length; i++) {
      const vehicle = vehicles[i];
      try {
        const status = {
          id: vehicle.Id,
          status: 0,
        };
        if (vehicle.State && vehicle.State.contains(VehicleState.Offline)) {
          status.status = 2;
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

  setPointVisibility(value: boolean) {
    this.source.all.forEach((x) => {
      if (this.mapClient && value) {
        this.mapClient.Point.SetVisibility(x.Id, value);
      }
    });
  }

  menuEvents = {
    illegalDropClicked: new EventEmitter(),
    mixedIntoClicked: new EventEmitter(),
    garbageCountClicked: new EventEmitter(),
    vehicleInformationClicked: new EventEmitter(),
    routeClicked: new EventEmitter(),
    powerClicked: new EventEmitter(),
  };

  setContentMenu() {
    if (!this.mapClient) return;
    this.mapClient.ContextMenu.AddItem(
      `<i class="howell-icon-Record" style="font-size: 17px"></i> 轨迹回溯`,
      async (id: string) => {
        this.onMapClicked();

        let vehicle = this.source.all.find((x) => x.Id === id);
        if (!vehicle) {
          const vehicle = await this.vehicleService.cache.get(id);
          this.source.all.push(vehicle);
        }
        this.menuEvents.routeClicked.emit(vehicle);
      },
      2
    );

    this.mapClient.ContextMenu.AddItem(
      `<i class="howell-icon-Subsystem" style="font-size: 18px"></i> ${Language.json.vehicle}${Language.json.info}`,
      async (id: string) => {
        this.onMapClicked();
        const status = document.getElementsByClassName(
          'map-bar status'
        )[0] as HTMLElement;
        if (status) {
          status['style'].display = 'none';
        }
        let vehicle = this.source.all.find((x) => x.Id === id);
        if (!vehicle) {
          const vehicle = await this.vehicleService.cache.get(id);
          this.source.all.push(vehicle);
        }
        this.menuEvents.vehicleInformationClicked.emit(vehicle);
      },
      3
    );
    this.mapClient.ContextMenu.AddItem(
      `<i class="howell-icon-video" style="font-size: 18px"></i> ${Language.json.vehicle}${Language.json.video}`,
      async (id: string) => {
        let vehicle = this.source.all.find((x) => x.Id === id);
        if (!vehicle) {
          const vehicle = await this.vehicleService.cache.get(id);
          this.source.all.push(vehicle);
        }
        this.pointDoubleClicked.emit(vehicle);
      },
      4
    );
    this.mapClient.ContextMenu.AddItem(
      `<i class="glyphicon glyphicon-off" style="font-size: 14px"></i> 远程唤醒`,
      async (id: string) => {
        let vehicle = this.source.all.find((x) => x.Id === id);
        if (!vehicle) {
          const vehicle = await this.vehicleService.cache.get(id);
          this.source.all.push(vehicle);
        }
        this.menuEvents.powerClicked.emit(vehicle);
      },
      5
    );

    this.mapClient.ContextMenu.Enable();
  }

  power(id: string) {
    return this.vehicleService.nb.power(id);
  }
}

interface AMapDataSource {
  all: GarbageVehicle[];
  points: Global.Dictionary<CesiumDataController.Point>;
}
