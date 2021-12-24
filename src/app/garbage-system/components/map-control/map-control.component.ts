import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LocalStorageService } from 'src/app/global/service/local-storage.service';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { AMapBusiness } from './business/amap.business';
import { MapControlBusiness } from './business/map-control.bussiness';

@Component({
  selector: 'app-map-control',
  templateUrl: './map-control.component.html',
  styleUrls: ['./map-control.component.less'],
  providers: [MapControlBusiness, AMapBusiness],
})
export class MapControlComponent implements OnInit, OnDestroy {
  @ViewChild('iframe')
  element?: ElementRef;

  src?: SafeResourceUrl;

  private get iframe(): HTMLIFrameElement | undefined {
    if (this.element && this.element.nativeElement) {
      let _iframe = this.element.nativeElement as HTMLIFrameElement;
      if (_iframe.contentWindow) {
        return _iframe;
      }
    }
    return;
  }

  constructor(
    private sanitizer: DomSanitizer,
    private bussiness: MapControlBusiness,
    private amap: AMapBusiness
  ) {}

  //#region wait
  loadHandle?: NodeJS.Timer;
  private wait(reject: () => void) {
    this.loadHandle = setTimeout(() => {
      if (this.iframe) {
        reject();
      } else {
        this.wait(reject);
      }
    }, 100);
  }
  //#endregion

  ngOnInit(): void {
    let src = this.amap.getSrc();
    this.src = this.sanitizer.bypassSecurityTrustResourceUrl(src);
    this.amap.pointDoubleClicked.subscribe((x) => {
      this.onPointDoubleClicked(x);
    });
    this.amap.mapClicked.subscribe(() => {
      this.onMapClicked();
    });
  }
  ngOnDestroy(): void {
    if (this.loadHandle) {
      clearTimeout(this.loadHandle);
    }
  }

  display = {
    status: true,
    videoList: false,
  };

  pointCount = 0;

  //#region template event
  onLoad(event: Event) {
    this.wait(() => {
      this.amap.createMapClient(this.iframe!);
    });
  }
  //#endregion

  //#region map event regist
  onPointDoubleClicked(station: GarbageStation) {
    this.display.status = false;
    this.display.videoList = true;
  }
  onMapClicked() {
    this.display.status = true;
    this.display.videoList = false;
  }
  //#endregion
}
