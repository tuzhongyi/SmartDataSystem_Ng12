import { Injectable } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { AMapDivisionBusiness } from './amap/amap-division.business';
import { AMapPointBusiness } from './amap/amap-point.business';
import { AMapClient } from './amap/amap.client';
import { AMapEvent } from './amap/amap.event';

@Injectable()
export class AMapBusiness {
  constructor(
    private storeService: GlobalStorageService,
    private amap: AMapClient,
    public division: AMapDivisionBusiness,
    public point: AMapPointBusiness,
    public event: AMapEvent
  ) {
    this.storeService.statusChange.subscribe((x) => {
      if (this.division) {
        this.division.select(this.storeService.divisionId);
      }
      if (this.point) {
        let promise = this.point.count(this.storeService.divisionId);
        promise.then((count) => {
          this.event.point.count.emit(count);
        });
      }
    });
    this.amap.loaded.subscribe((x) => {
      this.point.init();
      this.regist();
      this.division.load(this.storeService.divisionId);
    });
  }

  get src() {
    return this.amap.src;
  }

  get source() {
    return this.amap.source;
  }

  async regist() {
    let client = await this.amap.client;
    client.Events.OnElementsDoubleClicked = (elements) => {
      if (elements && elements.length > 0) {
        let point = elements[0] as unknown as CesiumDataController.Point;
        let station = this.amap.source.all.find((x) => x.Id === point.id);
        this.event.point.doubleclick.emit(station);
      }
    };
    client.Events.OnMouseClick = () => {
      this.event.mapclick.emit();
    };
  }

  init(iframe: HTMLIFrameElement) {
    this.amap.init(iframe);
  }
}
