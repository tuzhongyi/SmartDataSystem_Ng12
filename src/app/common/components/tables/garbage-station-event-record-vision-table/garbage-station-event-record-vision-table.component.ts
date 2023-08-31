import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { Language } from 'src/app/common/tools/language';
import { SupervisedState } from 'src/app/network/model/garbage-drop-super-vision-data.model';
import { IModel } from 'src/app/network/model/model.interface';
import { GarbageStationEventRecordVisionTableBusiness } from './garbage-station-event-record-vision-table.business';
import {
  GarbageStationEventRecordVisionModel,
  GarbageStationEventRecordVisionTableArgs,
} from './garbage-station-event-record-vision-table.model';
import { GarbageStationEventRecordVisionTableService } from './garbage-station-event-record-vision-table.service';

@Component({
  selector: 'garbage-station-event-record-vision-table',
  templateUrl: './garbage-station-event-record-vision-table.component.html',
  styleUrls: ['./garbage-station-event-record-vision-table.component.less'],
  providers: [
    GarbageStationEventRecordVisionTableService,
    GarbageStationEventRecordVisionTableBusiness,
  ],
})
export class GarbageStationEventRecordVisionTableComponent
  implements IComponent<IModel, GarbageStationEventRecordVisionModel[]>, OnInit
{
  @Input() business: IBusiness<IModel, GarbageStationEventRecordVisionModel[]>;
  @Input() args = new GarbageStationEventRecordVisionTableArgs();
  @Input() isinit = true;
  @Input() load?: EventEmitter<void>;
  @Output() loaded: EventEmitter<GarbageStationEventRecordVisionModel[]> =
    new EventEmitter();
  @Output()
  details: EventEmitter<GarbageStationEventRecordVisionModel> =
    new EventEmitter();
  @Output() select: EventEmitter<GarbageStationEventRecordVisionModel> =
    new EventEmitter();
  @Output() image: EventEmitter<GarbageStationEventRecordVisionModel> =
    new EventEmitter();

  constructor(business: GarbageStationEventRecordVisionTableBusiness) {
    this.business = business;
  }

  widths: Array<string | undefined> = [
    '8%',
    undefined,
    '15%',
    '12%',
    '12%',
    '12%',
    '8%',
    '12%',
  ];
  datas: GarbageStationEventRecordVisionModel[] = [];
  Language = Language;
  State = SupervisedState;

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((x) => {
        // this.args = x;
        this.loadData();
      });
    }
    if (this.isinit) {
      this.loadData();
    }
  }

  loadData() {
    this.business.load(this.args).then((x) => {
      this.datas = x;
      this.loaded.emit(x);
    });
  }

  onselect(e: Event, item: GarbageStationEventRecordVisionModel) {
    this.select.emit(item);
  }
  ondetails(e: Event, item: GarbageStationEventRecordVisionModel) {
    this.details.emit(item);
    e.stopImmediatePropagation();
  }
  onimage(e: Event, item: GarbageStationEventRecordVisionModel) {
    this.image.emit(item);
    e.stopImmediatePropagation();
  }
}
