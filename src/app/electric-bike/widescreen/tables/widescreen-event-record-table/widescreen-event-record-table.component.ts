import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { StoreService } from 'src/app/common/service/store.service';
import { AlarmBusiness } from 'src/app/electric-bike/alarm/alarm.business';
import { ElectricBikeAlarmModel } from 'src/app/electric-bike/alarm/alarm.model';
import { IModel } from 'src/app/network/model/model.interface';
import { ImageControlModelArray } from 'src/app/view-model/image-control.model';

@Component({
  selector: 'howell-widescreen-event-record-table',
  templateUrl: './widescreen-event-record-table.component.html',
  styleUrls: [
    '../table.less',
    './widescreen-event-record-table.component.less',
  ],
  providers: [AlarmBusiness],
})
export class WidescreenEventRecordTableComponent
  implements IComponent<IModel, ElectricBikeAlarmModel[]>, OnInit
{
  @Input()
  business: IBusiness<IModel, ElectricBikeAlarmModel[]>;
  @Input()
  divisionId?: string;
  @Output()
  picture: EventEmitter<ImageControlModelArray> = new EventEmitter();
  @Output()
  playback: EventEmitter<ImageControlModelArray> = new EventEmitter();

  constructor(business: AlarmBusiness, private store: StoreService) {
    this.business = business;
  }
  widths = ['35%', '33%', '20%', '12%'];
  datas: ElectricBikeAlarmModel[] = [];

  ngOnInit(): void {
    this.loadData();
    this.store.interval.subscribe((x) => {
      this.loadData();
    });
    this.store.refresh.subscribe((x) => {
      this.loadData();
    });
  }

  async loadData() {
    this.datas = await this.business.load();
  }

  onpicture(event: Event, item: ElectricBikeAlarmModel) {
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
}
