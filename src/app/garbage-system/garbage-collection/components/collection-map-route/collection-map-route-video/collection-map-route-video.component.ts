import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { VideoModel } from 'src/app/common/components/video-player/video.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { VehicleState } from 'src/app/enum/vehicle-state.enum';
import { Duration } from 'src/app/network/model/duration.model';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { IModel } from 'src/app/network/model/model.interface';
import { VehicleCamera } from 'src/app/network/model/vehicle-camera.model';
import { CollectionMapRouteVideoBusiness } from './collection-map-route-video.business';

@Component({
  selector: 'collection-map-route-video',
  templateUrl: './collection-map-route-video.component.html',
  styleUrls: ['./collection-map-route-video.component.less'],
  providers: [CollectionMapRouteVideoBusiness],
})
export class CollectionMapRouteVideoComponent
  implements IComponent<IModel, VideoModel>, OnInit, OnChanges
{
  @Input()
  business: IBusiness<IModel, VideoModel>;
  @Input()
  begin?: Date = new Date();
  @Input()
  end?: Date = new Date();
  @Input()
  source?: GarbageVehicle;
  @Input()
  play?: EventEmitter<Duration>;
  @Input()
  pause?: EventEmitter<void>;
  @Input()
  stop?: EventEmitter<void>;
  @Output()
  close: EventEmitter<void> = new EventEmitter();
  @Output()
  opened: EventEmitter<void> = new EventEmitter();
  @Output()
  splitview: EventEmitter<boolean> = new EventEmitter();

  constructor(business: CollectionMapRouteVideoBusiness) {
    this.business = business;
  }

  toplay: EventEmitter<VideoModel> = new EventEmitter();
  webUrl?: string;
  VehicleState = VehicleState;
  video?: VideoModel;
  camera?: VehicleCamera;
  playing = false;
  splited = false;

  ngOnInit(): void {
    this.initTitle();
    this.inited();
  }
  async inited() {
    this.opened.emit();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.source && this.source) {
      this.initTitle();
    }
    if (changes.play && changes.play.firstChange && this.play) {
      this.play.subscribe(this.onplay.bind(this));
    }
    if (this.begin && this.end) {
      let duration: Duration = {
        begin: this.begin,
        end: this.end,
      };
      if (changes.begin && changes.end) {
        this.onplay(duration);
      } else if (changes.begin) {
        this.onplay(duration);
      } else if (changes.end) {
        this.onplay(duration);
      } else {
      }
    }
  }

  onplay(duration: Duration) {
    this.begin = duration.begin;
    this.end = duration.end;
    if (this.camera) {
      this.loadData(this.camera, this.begin, this.end);
    }
  }

  initTitle() {
    if (this.source && this.source.Cameras && this.source.Cameras.length > 0) {
      this.source.Cameras = this.source.Cameras.sort((a, b) => {
        return LocaleCompare.compare(a.Name, b.Name);
      });
      if (!this.camera) {
        this.camera = this.source.Cameras[0];
      }
    }
  }

  async onpositionchanged() {
    if (this.camera && this.begin && this.end) {
      this.loadData(this.camera, this.begin, this.end);
    }
  }

  loadData(camera: VehicleCamera, begin: Date, end: Date) {
    this.business.load(camera.Id, begin, end).then((x) => {
      this.toplay.emit(x);
    });
  }

  onclose() {
    this.close.emit();
  }

  onsplitview() {
    this.splited = !this.splited;
    this.splitview.emit(this.splited);
  }
}
