import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { wait } from 'src/app/common/tools/tool';
import { Duration } from 'src/app/network/model/duration.model';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
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

  constructor(
    private sanitizer: DomSanitizer,
    private business: CollectionMapRouteBusiness
  ) {}

  display = {
    video: false,
  };

  play: EventEmitter<Duration> = new EventEmitter();
  pause: EventEmitter<void> = new EventEmitter();

  date: Date = new Date();
  src?: SafeResourceUrl;

  playing = false;
  duration?: Duration;

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

  onselected(item: IModel) {
    this.model = item as GarbageVehicle;
    this.business.load(this.model);
    this.display.video = true;
  }

  onloaded(source: CollectionMapRouteControlSource) {
    if (source.points && source.points.length > 0) {
      this.duration = {
        begin: source.points[0].Time,
        end: source.points[source.points.length - 1].Time,
      };
    }
    this.business.ready(source.points);
  }
  onscore(e: any) {
    console.log(e);
  }
  onroute(date: Date) {
    if (this.duration) {
      this.duration.begin = date;
    }
    this.business.routing(date);
  }
  toplay(play: boolean) {
    if (play && this.duration) {
      this.play.emit(this.duration);
    } else {
      this.pause.emit();
    }
  }
  onclose() {
    this.display.video = false;
  }
}
