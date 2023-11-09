import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CardRecordTableArgs } from 'src/app/common/components/tables/card-record-table/card-record-table.model';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { Language } from 'src/app/common/tools/language';
import { AIGarbageRfidCardRecord } from 'src/app/network/model/ai-garbage/rfid-card-record.model';

import { GarbageStationCardRecordBusiness } from './garbage-station-card-record.business';
import { LabelTreeManager } from './garbage-station-card-record.model';
@Component({
  selector: 'hw-garbage-station-card-record',
  templateUrl: './garbage-station-card-record.component.html',
  styleUrls: ['./garbage-station-card-record.component.less'],
  providers: [GarbageStationCardRecordBusiness],
})
export class GarbageStationCardRecordComponent implements OnInit {
  @Output()
  video: EventEmitter<AIGarbageRfidCardRecord> = new EventEmitter();
  constructor(
    public business: GarbageStationCardRecordBusiness,
    global: GlobalStorageService
  ) {
    this.args = new CardRecordTableArgs();
    this.args.duration = DateTimeTool.allDay(new Date());
    this.divisiontree = new LabelTreeManager(global.defaultDivisionType);
  }
  load: EventEmitter<CardRecordTableArgs> = new EventEmitter();

  divisiontree: LabelTreeManager;

  args: CardRecordTableArgs = new CardRecordTableArgs();
  Language = Language;

  ngOnInit() {
    this.business.first().then((x) => {
      this.divisiontree.ids = [x.Id];
      this.args.stationId = x.Id;
      this.args.tofirst = true;
      this.load.emit(this.args);
    });
    this.divisiontree.select.subscribe((x) => {
      this.args.stationId = x;
    });
  }

  search() {
    this.args.tofirst = true;
    this.load.emit(this.args);
  }

  onvideo(record: AIGarbageRfidCardRecord) {
    this.video.emit(record);
  }
}
