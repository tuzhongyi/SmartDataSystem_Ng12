import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Language } from 'src/app/common/tools/language';
import { AIGarbageDeviceEventRecord } from 'src/app/network/model/ai-garbage/device-event-record.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { PagedTableAbstractComponent } from '../../table-abstract.component';
import { AIGarbageStationDeviceRecordEventTableBusiness } from './ai-garbage-station-device-record-event-table.business';
import { AIGarbageStationDeviceRecordEventTableArgs } from './ai-garbage-station-device-record-event-table.model';

@Component({
  selector: 'ai-garbage-station-device-record-event-table',
  templateUrl: './ai-garbage-station-device-record-event-table.component.html',
  styleUrls: [
    '../../table.less',
    './ai-garbage-station-device-record-event-table.component.less',
  ],
  providers: [AIGarbageStationDeviceRecordEventTableBusiness],
})
export class AIGarbageStationDeviceRecordEventTableComponent
  extends PagedTableAbstractComponent<AIGarbageDeviceEventRecord>
  implements OnInit
{
  @Input()
  args: AIGarbageStationDeviceRecordEventTableArgs =
    new AIGarbageStationDeviceRecordEventTableArgs();
  @Input()
  load?: EventEmitter<AIGarbageStationDeviceRecordEventTableArgs>;

  @Output()
  loaded: EventEmitter<PagedList<AIGarbageDeviceEventRecord>> =
    new EventEmitter();
  @Output()
  image: EventEmitter<AIGarbageDeviceEventRecord> = new EventEmitter();

  constructor(
    private business: AIGarbageStationDeviceRecordEventTableBusiness
  ) {
    super();
  }
  Language = Language;
  override widths = [
    '15%',
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ];
  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((x) => {
        if (x) {
          this.args = x;
        }
        this.loadData(1, this.pageSize, this.args);
      });
    }
    this.loadData(1);
  }

  loadData(index: number, size: number = 10, ...args: any[]): void {
    this.business.load(index, size, this.args).then((x) => {
      this.page = x.Page;
      this.datas = x.Data;
      this.loaded.emit(x);
    });
  }
  sortData(sort: Sort) {
    const isAsc = sort.direction === 'asc';
    this.args.desc = undefined;
    this.args.asc = undefined;
    if (isAsc) {
      this.args.asc = sort.active;
    } else {
      this.args.desc = sort.active;
    }
    this.loadData(1);
  }

  onimage(e: Event, item: AIGarbageDeviceEventRecord) {
    e.stopImmediatePropagation();
    this.image.emit(item);
  }
}
