import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { AIGarbageDeviceCommandNo } from 'src/app/network/model/ai-garbage/garbage-device-command.enum';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';

import { PagedList } from 'src/app/network/model/page_list.model';
import { PagedTableAbstractComponent } from '../../table-abstract.component';
import { AIGarbageStationDeviceTableBusiness } from './ai-garbage-station-device-table.business';
import { AIGarbageStationDeviceTableConverter } from './ai-garbage-station-device-table.converter';
import { AIGarbageStationDeviceTableArgs } from './ai-garbage-station-device-table.model';
import { AIGarbageStationDeviceTableService } from './ai-garbage-station-device-table.service';

@Component({
  selector: 'ai-garbage-station-device-table',
  templateUrl: './ai-garbage-station-device-table.component.html',
  styleUrls: [
    '../../table.less',
    './ai-garbage-station-device-table.component.less',
  ],
  providers: [
    AIGarbageStationDeviceTableService,
    AIGarbageStationDeviceTableConverter,
    AIGarbageStationDeviceTableBusiness,
  ],
})
export class AIGarbageStationDeviceTableComponent
  extends PagedTableAbstractComponent<AIGarbageDevice>
  implements OnInit
{
  @Input()
  args: AIGarbageStationDeviceTableArgs = new AIGarbageStationDeviceTableArgs();
  @Input()
  load?: EventEmitter<AIGarbageStationDeviceTableArgs>;
  @Input()
  selecteds: AIGarbageDevice[] = [];
  @Output()
  selectedsChange: EventEmitter<AIGarbageDevice[]> = new EventEmitter();
  @Output()
  loaded: EventEmitter<PagedList<Promise<AIGarbageDevice>>> =
    new EventEmitter();
  @Output()
  details: EventEmitter<AIGarbageDevice> = new EventEmitter();
  @Output()
  command: EventEmitter<AIGarbageDevice> = new EventEmitter();
  @Output()
  delete: EventEmitter<AIGarbageDevice> = new EventEmitter();
  @Output()
  dropwindow: EventEmitter<AIGarbageDevice> = new EventEmitter();
  @Output()
  camera: EventEmitter<AIGarbageDevice> = new EventEmitter();
  @Output()
  schedule: EventEmitter<AIGarbageDevice> = new EventEmitter();

  constructor(private business: AIGarbageStationDeviceTableBusiness) {
    super();
  }
  Command = AIGarbageDeviceCommandNo;
  widths = ['20%', '15%', '15%', undefined, undefined, undefined, '16%', '12%'];
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
    this.selecteds = [];
    this.selectedsChange.emit(this.selecteds);
    this.business.load(index, size, this.args).then((x) => {
      this.page = x.Page;
      Promise.all(x.Data).then((datas) => {
        this.datas = datas;
        this.loaded.emit(x);
      });
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

  ondetails(e: Event, item: AIGarbageDevice) {
    e.stopImmediatePropagation();
    this.details.emit(item);
  }
  oncommand(e: Event, item: AIGarbageDevice) {
    e.stopImmediatePropagation();
    this.command.emit(item);
  }
  onremove(e: Event, item: AIGarbageDevice) {
    e.stopImmediatePropagation();
    this.delete.emit(item);
  }
  oncamera(e: Event, item: AIGarbageDevice) {
    e.stopImmediatePropagation();
    this.camera.emit(item);
  }
  ondropwindow(e: Event, item: AIGarbageDevice) {
    e.stopImmediatePropagation();
    this.dropwindow.emit(item);
  }
  onschedule(e: Event, item: AIGarbageDevice) {
    e.stopImmediatePropagation();
    this.schedule.emit(item);
  }
  onselected(item: AIGarbageDevice) {
    let index = this.selecteds.indexOf(item);
    if (index < 0) {
      this.selecteds.push(item);
    } else {
      this.selecteds.splice(index, 1);
    }
    this.selectedsChange.emit(this.selecteds);
  }
}
