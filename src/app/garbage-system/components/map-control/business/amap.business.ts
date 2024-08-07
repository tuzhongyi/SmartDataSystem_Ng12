import { Injectable } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { AMapDivisionBusiness } from './amap/amap-division.business';
import { AMapPointBusiness } from './amap/amap-point.business';
import { AMapClient } from './amap/amap.client';
import { AMapEvent } from './amap/amap.event';

@Injectable()
export class AMapBusiness {
  constructor(
    private global: GlobalStorageService,
    private amap: AMapClient,
    public division: AMapDivisionBusiness,
    public point: AMapPointBusiness,
    public event: AMapEvent
  ) {
    this.global.division.change.subscribe((x) => {
      this.global.division.selected.then((x) => {
        if (this.division) {
          this.division.select(x.Id);
        }
        if (this.point) {
          this.point.count(x.Id).then((count) => {
            this.event.point.count.emit(count);
          });
        }
      });
    });
    this.amap.loaded.subscribe((x) => {
      this.point.init();
      this.regist();
      this.global.division.selected.then((x) => {
        this.division.load(x.Id);
      });
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
    this.point.init();
  }
}
