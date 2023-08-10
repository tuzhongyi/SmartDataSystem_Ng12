import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Language } from 'src/app/common/tools/language';
import { AIGarbageDeviceCommandRecord } from 'src/app/network/model/ai-garbage/device-command-record.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { PagedTableAbstractComponent } from '../../table-abstract.component';
import { AIGarbageStationDeviceRecordCommandTableBusiness } from './ai-garbage-station-device-record-command-table.business';
import { AIGarbageStationDeviceRecordCommandTableArgs } from './ai-garbage-station-device-record-command-table.model';

@Component({
  selector: 'ai-garbage-station-device-record-command-table',
  templateUrl:
    './ai-garbage-station-device-record-command-table.component.html',
  styleUrls: [
    '../../table.less',
    './ai-garbage-station-device-record-command-table.component.less',
  ],
  providers: [AIGarbageStationDeviceRecordCommandTableBusiness],
})
export class AIGarbageStationDeviceRecordCommandTableComponent
  extends PagedTableAbstractComponent<AIGarbageDeviceCommandRecord>
  implements OnInit
{
  @Input()
  args: AIGarbageStationDeviceRecordCommandTableArgs =
    new AIGarbageStationDeviceRecordCommandTableArgs();
  @Input()
  load?: EventEmitter<AIGarbageStationDeviceRecordCommandTableArgs>;

  @Output()
  loaded: EventEmitter<PagedList<AIGarbageDeviceCommandRecord>> =
    new EventEmitter();
  @Output()
  image: EventEmitter<AIGarbageDeviceCommandRecord> = new EventEmitter();

  constructor(
    private business: AIGarbageStationDeviceRecordCommandTableBusiness
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
    '8%',
    '8%',
    '20%',
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

  onimage(e: Event, item: AIGarbageDeviceCommandRecord) {
    e.stopImmediatePropagation();
    this.image.emit(item);
  }
}
