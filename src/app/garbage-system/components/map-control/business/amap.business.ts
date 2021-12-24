import { formatDate } from '@angular/common';
import { EventEmitter, Injectable } from '@angular/core';
import { StoreService } from 'src/app/global/service/store.service';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class AMapBusiness {
  constructor(
    private storeService: StoreService,
    private stationService: GarbageStationRequestService
  ) {
    this.init();
  }

  async init() {
    this.garbageStation = await this.stationService.cache.all();
  }

  private mapClient?: CesiumMapClient;
  private mapController?: CesiumDataController.Controller;

  pointDoubleClicked: EventEmitter<GarbageStation> = new EventEmitter();

  mapClicked: EventEmitter<void> = new EventEmitter();

  garbageStation: GarbageStation[] = [];

  getSrc() {
    const host = document.location.hostname;
    const port = document.location.port;
    //let date = this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
    const date = formatDate(new Date(), 'yyyyMMddHHmmss', 'en');

    return `http://${host}:${port}/amap/map_ts.html?v=${date}`;
  }

  createMapClient(iframe: HTMLIFrameElement) {
    this.mapClient = new CesiumMapClient(iframe);
    this.mapClient.Events.OnLoaded = () => {
      if (this.mapClient) {
        this.mapController = this.mapClient.DataController;
        this.mapClient.Events.OnElementsDoubleClicked = (elements) => {
          if (elements && elements.length > 0) {
            this.onPointDoubleClicked(
              elements[0] as unknown as CesiumDataController.Point
            );
          }
        };
        this.mapClient.Events.OnMouseClick = () => {};
      }
      this.loadDivision(this.storeService.divisionId);
    };
  }

  loadDivision(divisionId: string) {
    if (this.mapClient) {
      this.mapClient.Village.Select(divisionId, true);
      this.mapClient.Viewer.Focus(divisionId);
    }
  }

  onPointDoubleClicked(point: CesiumDataController.Point) {
    let station = this.garbageStation.find((x) => x.Id === point.id);
    this.pointDoubleClicked.emit(station);
  }

  onMapClicked() {
    this.mapClicked.emit();
  }
}
