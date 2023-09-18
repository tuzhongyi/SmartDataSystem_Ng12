import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { Language } from 'src/app/common/tools/language';
import { SupervisedState } from 'src/app/network/model/garbage-drop-super-vision-data.model';
import { IModel } from 'src/app/network/model/model.interface';
import { DaPuQiaoGarbageStationEventRecordVisionTableBusiness } from './dapuqiao-garbage-station-event-record-vision-table.business';
import {
  DaPuQiaoGarbageStationEventRecordVisionModel,
  DaPuQiaoGarbageStationEventRecordVisionTableArgs,
} from './dapuqiao-garbage-station-event-record-vision-table.model';
import { DaPuQiaoGarbageStationEventRecordVisionTableService } from './dapuqiao-garbage-station-event-record-vision-table.service';

@Component({
  selector: 'dapuqiao-garbage-station-event-record-vision-table',
  templateUrl:
    './dapuqiao-garbage-station-event-record-vision-table.component.html',
  styleUrls: [
    './dapuqiao-garbage-station-event-record-vision-table.component.less',
  ],
  providers: [
    DaPuQiaoGarbageStationEventRecordVisionTableService,
    DaPuQiaoGarbageStationEventRecordVisionTableBusiness,
  ],
})
export class DaPuQiaoGarbageStationEventRecordVisionTableComponent
  implements
    IComponent<IModel, DaPuQiaoGarbageStationEventRecordVisionModel[]>,
    OnInit
{
  @Input() business: IBusiness<
    IModel,
    DaPuQiaoGarbageStationEventRecordVisionModel[]
  >;
  @Input() args = new DaPuQiaoGarbageStationEventRecordVisionTableArgs();
  @Input() isinit = true;
  @Input() load?: EventEmitter<void>;
  @Output() loaded: EventEmitter<
    DaPuQiaoGarbageStationEventRecordVisionModel[]
  > = new EventEmitter();
  @Output()
  details: EventEmitter<DaPuQiaoGarbageStationEventRecordVisionModel> =
    new EventEmitter();
  @Output() select: EventEmitter<DaPuQiaoGarbageStationEventRecordVisionModel> =
    new EventEmitter();
  @Output() image: EventEmitter<DaPuQiaoGarbageStationEventRecordVisionModel> =
    new EventEmitter();

  constructor(business: DaPuQiaoGarbageStationEventRecordVisionTableBusiness) {
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
  datas: DaPuQiaoGarbageStationEventRecordVisionModel[] = [];
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

  onselect(e: Event, item: DaPuQiaoGarbageStationEventRecordVisionModel) {
    this.select.emit(item);
  }
  ondetails(e: Event, item: DaPuQiaoGarbageStationEventRecordVisionModel) {
    this.details.emit(item);
    e.stopImmediatePropagation();
  }
  onimage(e: Event, item: DaPuQiaoGarbageStationEventRecordVisionModel) {
    this.image.emit(item);
    e.stopImmediatePropagation();
  }
}
