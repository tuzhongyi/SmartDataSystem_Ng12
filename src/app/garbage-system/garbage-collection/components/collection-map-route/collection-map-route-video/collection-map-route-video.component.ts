import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { VideoModel } from 'src/app/common/components/video-player/video.model';
import { Language } from 'src/app/common/tools/language';
import { VehiclePositionNo } from 'src/app/enum/position-no.enum';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { ItemModel } from 'src/app/view-model/item.model';

@Component({
  selector: 'collection-map-route-video',
  templateUrl: './collection-map-route-video.component.html',
  styleUrls: ['./collection-map-route-video.component.less'],
})
export class CollectionMapRouteVideoComponent implements OnInit, OnChanges {
  @Input()
  begin: Date = new Date();
  @Input()
  end: Date = new Date();
  @Input()
  model!: GarbageVehicle;

  constructor() {}

  video?: VideoModel;
  title: SelectItem[] = [];
  position?: VehiclePositionNo;

  ngOnInit(): void {
    this.initTitle();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.model && !changes.model.firstChange) {
      this.initTitle();
    }
  }

  initTitle() {
    this.title = [];
    let info = new SelectItem();
    info.language = '车辆信息';
    this.title.push(info);
    let index: number;
    let no: VehiclePositionNo;
    if (this.model.Cameras) {
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
