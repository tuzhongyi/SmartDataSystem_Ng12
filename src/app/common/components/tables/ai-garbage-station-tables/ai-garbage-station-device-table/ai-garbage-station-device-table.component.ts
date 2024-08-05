import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ColorTool } from 'src/app/common/tools/color-tool/color.tool';
import { Language } from 'src/app/common/tools/language';
import { TableSelectType } from 'src/app/enum/table-select-type.enum';
import { AIGarbageDeviceCommandNo } from 'src/app/network/model/ai-garbage/garbage-device-command.enum';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';

import { PagedList } from 'src/app/network/model/page_list.model';
import { PagedTableAbstractComponent } from '../../table-abstract.component';
import { AIGarbageStationDeviceTableBusiness } from './ai-garbage-station-device-table.business';
import { AIGarbageStationDeviceTableConverter } from './ai-garbage-station-device-table.converter';
import {
  AIGarbageDeviceCamerasState,
  AIGarbageDeviceState,
  AIGarbageStationDeviceTableArgs,
  AIGarbageStationDeviceTableItem,
} from './ai-garbage-station-device-table.model';
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
  extends PagedTableAbstractComponent<AIGarbageStationDeviceTableItem>
  implements OnInit
{
  @Input() args: AIGarbageStationDeviceTableArgs =
    new AIGarbageStationDeviceTableArgs();
  @Input() load?: EventEmitter<AIGarbageStationDeviceTableArgs>;
  @Input() selecteds: AIGarbageDevice[] = [];
  @Output() selectedsChange: EventEmitter<AIGarbageDevice[]> =
    new EventEmitter();
  @Output() loaded: EventEmitter<PagedList<AIGarbageDevice>> =
    new EventEmitter();
  @Output() details: EventEmitter<AIGarbageDevice> = new EventEmitter();
  @Output() command: EventEmitter<AIGarbageDevice> = new EventEmitter();
  @Output() delete: EventEmitter<AIGarbageDevice> = new EventEmitter();
  @Output() dropwindow: EventEmitter<AIGarbageDevice> = new EventEmitter();
  @Output() camera: EventEmitter<AIGarbageDevice> = new EventEmitter();
  @Output() schedule: EventEmitter<AIGarbageDevice> = new EventEmitter();
  @Output() status: EventEmitter<AIGarbageDevice> = new EventEmitter();
  @Output() session: EventEmitter<AIGarbageDevice> = new EventEmitter();
  constructor(private business: AIGarbageStationDeviceTableBusiness) {
    super();
  }

  widths = ['20%', '15%', '15%', undefined, undefined, undefined, '16%', '12%'];

  Language = Language;
  DeviceState = AIGarbageDeviceState;
  CameraState = AIGarbageDeviceCamerasState;
  Command = AIGarbageDeviceCommandNo;
  Color = ColorTool;

  ngOnInit(): void {
    this.pageSize = 10;
    if (this.load) {
      this.load.subscribe((x) => {
        if (x) {
          this.args = x;
        }
        this.loadData(
          x.tofirst ? 1 : this.page.PageIndex,
          this.pageSize,
          this.args
        );
      });
    }
    this.loadData(1);
  }

  loadData(index: number, size: number = this.pageSize, ...args: any[]): void {
    this.selecteds = [];
    this.selectedsChange.emit(this.selecteds);
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
    this.loadData(this.page.PageIndex);
  }

  ondetails(e: Event, item: AIGarbageStationDeviceTableItem) {
    e.stopImmediatePropagation();
    this.details.emit(item);
  }
  oncommand(e: Event, item: AIGarbageStationDeviceTableItem) {
    e.stopImmediatePropagation();
    this.command.emit(item);
  }
  onremove(e: Event, item: AIGarbageStationDeviceTableItem) {
    e.stopImmediatePropagation();
    this.delete.emit(item);
  }
  oncamera(e: Event, item: AIGarbageStationDeviceTableItem) {
    e.stopImmediatePropagation();
    this.camera.emit(item);
  }
  ondropwindow(e: Event, item: AIGarbageStationDeviceTableItem) {
    e.stopImmediatePropagation();
    this.dropwindow.emit(item);
  }
  onschedule(e: Event, item: AIGarbageStationDeviceTableItem) {
    e.stopImmediatePropagation();
    this.schedule.emit(item);
  }
  onsession(e: Event, item: AIGarbageStationDeviceTableItem) {
    e.stopImmediatePropagation();
    if (
      !item.Status ||
      !item.Status.GCHAStatus ||
      item.Status.GCHAStatus.OnlineState != 0
    ) {
      return;
    }
    this.session.emit(item);
  }
  onselected(item: AIGarbageStationDeviceTableItem) {
    let index = this.selecteds.indexOf(item);
    if (index < 0) {
      this.selecteds.push(item);
    } else {
      this.selecteds.splice(index, 1);
    }
    this.selectedsChange.emit(this.selecteds);
  }
  onstatus(e: Event, item: AIGarbageStationDeviceTableItem) {
    e.stopImmediatePropagation();
    this.status.emit(item);
  }

  toselect(type: TableSelectType) {
    switch (type) {
      case TableSelectType.All:
        this.selecteds = [...this.datas];
        break;
      case TableSelectType.Cancel:
        this.selecteds = [];
        break;
      case TableSelectType.Reverse:
        this.selecteds = this.datas.filter((x) => !this.selecteds.includes(x));
        break;

      default:
        break;
    }
    this.selectedsChange.emit(this.selecteds);
  }
}
