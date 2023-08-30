import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { StoreService } from 'src/app/common/service/store.service';
import { SmokeEventRecord } from 'src/app/network/model/garbage-event-record.model';
import { IModel } from 'src/app/network/model/model.interface';
import { ImageControlModelArray } from 'src/app/view-model/image-control.model';
import { AlarmBusiness } from './alarm.business';
import { ElectricBikeAlarmModel } from './alarm.model';

@Component({
  selector: 'howell-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.less'],
  providers: [AlarmBusiness],
})
export class AlarmComponent
  implements IComponent<IModel, ElectricBikeAlarmModel[]>, OnInit
{
  @Input()
  business: IBusiness<IModel, ElectricBikeAlarmModel<any>[]>;
  @Output()
  picture: EventEmitter<ImageControlModelArray> = new EventEmitter();
  @Output()
  playback: EventEmitter<ImageControlModelArray> = new EventEmitter();
  @Output()
  itemClick: EventEmitter<SmokeEventRecord> = new EventEmitter();
  @Input() load?: EventEmitter<void>;

  constructor(business: AlarmBusiness, private store: StoreService) {
    this.business = business;
  }

  datas: ElectricBikeAlarmModel[] = [];

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((x) => {
        this.loadData();
      });
    }
    this.loadData();
  }

  async loadData() {
    this.datas = await this.business.load();
  }

  onpicture(event: Event, item: ElectricBikeAlarmModel<SmokeEventRecord>) {
    if (item.images) {
      let img = new ImageControlModelArray(item.images, 0);
      if (item.data) {
        img.resourceId = item.data.ResourceId;
      }
      this.picture.emit(img);
    }
    event.cancelBubble = true;
  }
  onplayback(event: Event, item: ElectricBikeAlarmModel) {
    if (item.images) {
      let img = new ImageControlModelArray(item.images, 0);
      if (item.data) {
        img.resourceId = item.data.ResourceId;
      }
      this.playback.emit(img);
    }
    event.cancelBubble = true;
  }

  onitemclick(item?: ElectricBikeAlarmModel) {
    if (item) {
      this.itemClick.emit(item.data);
    } else {
      this.itemClick.emit();
    }
  }
}
