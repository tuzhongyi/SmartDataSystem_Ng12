import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { wait } from 'src/app/common/tools/tool';
import { Duration } from 'src/app/network/model/duration.model';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { GisRoutePoint } from 'src/app/network/model/gis-point.model';
import { IModel } from 'src/app/network/model/model.interface';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { CollectionMapControlConverter } from '../collection-map-control/collection-map-control.converter';
import { CollectionMapRouteControlSource } from './collection-map-route-control/collection-map-route-control.model';
import { CollectionMapRouteBusiness } from './collection-map-route.business';

@Component({
  selector: 'collection-map-route',
  templateUrl: './collection-map-route.component.html',
  styleUrls: ['./collection-map-route.component.less'],
  providers: [CollectionMapRouteBusiness, CollectionMapControlConverter],
})
export class CollectionMapRouteComponent implements OnInit {
  @Input()
  model?: GarbageVehicle;
  @Output()
  close: EventEmitter<void> = new EventEmitter();

  constructor(
    private sanitizer: DomSanitizer,
    private business: CollectionMapRouteBusiness
  ) {
    this.business.seek.subscribe((x) => {
      if (this.display.video && this.duration) {
        this.duration.begin = x.Time;
        this.play.emit(this.duration);
      }
      // if (this.splitview) {
      //   this.business.routing(x.Time);
      // } else {
      this.controlseek.emit(x);
      // }
    });
  }

  splitview = false;

  display = {
    info: false,
    video: false,
    operation: false,
    query: true,
  };

  play: EventEmitter<Duration> = new EventEmitter();
  pause: EventEmitter<void> = new EventEmitter();
  controlseek: EventEmitter<GisRoutePoint> = new EventEmitter();

  duration?: Duration;

  date: Date = new Date();
  src?: SafeResourceUrl;

  wantplay = false;

  @ViewChild('iframe')
  element?: ElementRef;
  private get iframe(): HTMLIFrameElement | undefined {
    if (this.element && this.element.nativeElement.contentWindow) {
      let _iframe = this.element.nativeElement as HTMLIFrameElement;
      if (_iframe.contentWindow) {
        return _iframe;
      }
    }
    return;
  }

  ngOnInit(): void {
    console.log('CollectionMapRouteComponent', this.model);
    this.src = this.sanitizer.bypassSecurityTrustResourceUrl(this.business.src);
  }

  //#region template event
  onIframeLoad(event: Event) {
    wait(
      () => {
        return !!this.iframe;
      },
      () => {
        this.business.init(this.iframe!);
      }
    );
  }
  //#endregion
  //#region list
  onqueryselect(item: IModel) {
    this.model = item as GarbageVehicle;
    if (this.display.video === false) {
      this.display.operation = true;
    }
    this.business.load(this.model).then((x) => {
      this.wantplay = this.display.video;
    });
  }

  onqueryclose() {
    this.display.query = false;
  }
  onquerybuttonclick() {
    this.display.query = true;
  }
  //#endregion
  //#region control
  onloaded(source?: CollectionMapRouteControlSource) {
    if (source) {
      if (source.points && source.points.length > 0) {
        this.duration = {
          begin: source.points[0].Time,
          end: source.points[source.points.length - 1].Time,
        };
      }
      this.business.ready(source.points);
    }
  }
  onscore(date: Date) {
    if (this.duration) {
      this.duration.begin = date;
    }
    if (this.display.video) {
      this.play.emit(this.duration);
    }
  }
  onroute(date: Date) {
    if (this.duration) {
      this.duration.begin = date;
    }
    this.business.route(date);
  }
  onrouteclick(date: Date) {
    if (this.duration) {
      this.duration.begin = date;
    }
    if (this.display.video) {
      this.play.emit(this.duration);
    }
  }
  //#endregion
  onvideoclose() {
    this.display.video = false;
    this.display.info = false;
    this.display.operation = true;
    this.play.unsubscribe();
    this.play = new EventEmitter();
  }
  onvideoopened() {
    if (this.wantplay) {
      this.play.emit(this.duration);
    }
    this.wantplay = false;

    this.display.operation = false;
  }

  onvehicleclick() {
    this.display.info = true;
    this.display.video = false;
    this.display.operation = false;
  }
  onvideoclick() {
    this.wantplay = true;
    this.display.video = true;
    this.display.info = false;
  }
  onvideosplitview(splited: boolean) {
    this.splitview = splited;
  }
  oninfoclose() {
    this.display.info = false;
    this.display.operation = true;
  }
  onclose() {
    this.close.emit();
  }
}