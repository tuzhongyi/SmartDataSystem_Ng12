import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { VideoModel } from 'src/app/common/components/video-player/video.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { Language } from 'src/app/common/tools/language';
import { GarbageVehicleModelConverter } from 'src/app/converter/models/garbage-vehicle.model.converter';
import { VehiclePositionNo } from 'src/app/enum/position-no.enum';
import { VehicleState } from 'src/app/enum/vehicle-state.enum';
import { Duration } from 'src/app/network/model/duration.model';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { IModel } from 'src/app/network/model/model.interface';
import { VehicleCamera } from 'src/app/network/model/vehicle-camera.model';
import { GarbageVehicleModel } from 'src/app/network/view-model/garbage-vehicle.view-model';
import { CollectionMapRouteVideoBusiness } from './collection-map-route-video.business';

@Component({
  selector: 'collection-map-route-video',
  templateUrl: './collection-map-route-video.component.html',
  styleUrls: ['./collection-map-route-video.component.less'],
  providers: [CollectionMapRouteVideoBusiness, GarbageVehicleModelConverter],
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

  constructor(
    business: CollectionMapRouteVideoBusiness,
    private converter: GarbageVehicleModelConverter
  ) {
    this.business = business;
  }

  toplay: EventEmitter<VideoModel> = new EventEmitter();
  webUrl?: string;
  VehicleState = VehicleState;
  model?: GarbageVehicleModel;
  video?: VideoModel;
  title: SelectItem[] = [];
  position?: VehiclePositionNo;
  cameras: { [key: number]: VehicleCamera } = {};
  playing = false;

  ngOnInit(): void {
    this.initTitle();
    this.inited();
  }
  async inited() {
    this.opened.emit();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.source) {
      if (this.source) {
        this.model = this.converter.Convert(this.source);
        this.initTitle();
      }
    }
    if (changes.play && changes.play.firstChange && this.play) {
      this.play.subscribe(this.onplay.bind(this));
    }
  }

  onplay(duration: Duration) {
    this.begin = duration.begin;
    this.end = duration.end;
    if (!this.position) {
      this.position = this.title.length > 1 ? this.title[1].value : undefined;
    }
    if (this.position) {
      let camera = this.cameras[this.position];
      this.loadData(camera, this.begin, this.end);
    }
  }

  initTitle() {
    this.title = [];
    let info = new SelectItem();
    info.language = '车辆信息';
    this.title.push(info);
    let index: number;
    let no: VehiclePositionNo;
    if (this.model && this.model.Cameras) {
      no = VehiclePositionNo.CarFront;
      index = this.model.Cameras.findIndex((x) => x.PositionNo === no);
      if (index >= 0) {
        this.title.push(SelectItem.create(no, Language.VehiclePositionNo));
        this.cameras[no] = this.model.Cameras[index];
      }

      no = VehiclePositionNo.CarEnd;
      index = this.model.Cameras.findIndex((x) => x.PositionNo === no);
      if (index >= 0) {
        this.title.push(SelectItem.create(no, Language.VehiclePositionNo));
        this.cameras[no] = this.model.Cameras[index];
      }

      no = VehiclePositionNo.TrashCan;
      index = this.model.Cameras.findIndex((x) => x.PositionNo === no);
      if (index >= 0) {
        this.title.push(SelectItem.create(no, Language.VehiclePositionNo));
        this.cameras[no] = this.model.Cameras[index];
      }
    }
  }

  async onpositionchanged() {
    if (this.position && this.begin && this.end) {
      let camera = this.cameras[this.position];
      this.loadData(camera, this.begin, this.end);
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
}
