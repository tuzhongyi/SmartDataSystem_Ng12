import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { VideoModel } from 'src/app/common/components/video-player/video.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { Language } from 'src/app/common/tools/language';
import { VehiclePositionNo } from 'src/app/enum/position-no.enum';
import { VehicleState } from 'src/app/enum/vehicle-state.enum';
import { VehicleType } from 'src/app/enum/vehicle-type.enum';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { IModel } from 'src/app/network/model/model.interface';
import { GarbageVehicleModel } from 'src/app/network/view-model/garbage-vehicle.view-model';
import { ItemModel } from 'src/app/view-model/item.model';
import { CollectionMapRouteVideoBusiness } from './collection-map-route-video.business';

@Component({
  selector: 'collection-map-route-video',
  templateUrl: './collection-map-route-video.component.html',
  styleUrls: ['./collection-map-route-video.component.less'],
  providers: [CollectionMapRouteVideoBusiness],
})
export class CollectionMapRouteVideoComponent
  implements IComponent<IModel, GarbageVehicleModel>, OnInit, OnChanges
{
  @Input()
  business: IBusiness<IModel, GarbageVehicleModel>;
  @Input()
  begin: Date = new Date();
  @Input()
  end: Date = new Date();
  @Input()
  source?: GarbageVehicle;

  constructor(business: CollectionMapRouteVideoBusiness) {
    this.business = business;
  }

  VehicleState = VehicleState;
  model?: GarbageVehicleModel;
  video?: VideoModel;
  title: SelectItem[] = [];
  position?: VehiclePositionNo;

  ngOnInit(): void {
    this.initTitle();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.source && !changes.source.firstChange) {
      this.initTitle();
    }
    if (changes.source) {
      this.business.load(this.source).then((x) => {
        this.model = x;
      });
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
      }

      no = VehiclePositionNo.CarEnd;
      index = this.model.Cameras.findIndex((x) => x.PositionNo === no);
      if (index >= 0) {
        this.title.push(SelectItem.create(no, Language.VehiclePositionNo));
      }

      no = VehiclePositionNo.TrashCan;
      index = this.model.Cameras.findIndex((x) => x.PositionNo === no);
      if (index >= 0) {
        this.title.push(SelectItem.create(no, Language.VehiclePositionNo));
      }
    }
  }
}
