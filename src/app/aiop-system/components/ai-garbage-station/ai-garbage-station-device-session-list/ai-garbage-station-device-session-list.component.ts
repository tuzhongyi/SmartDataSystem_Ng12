import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { AIGarbageStationDeviceTableService } from 'src/app/common/components/tables/ai-garbage-station-tables/ai-garbage-station-device-table/ai-garbage-station-device-table.service';
import { ColorTool } from 'src/app/common/tools/color-tool/color.tool';
import { Language } from 'src/app/common/tools/language';
import { isEmpty } from 'src/app/common/tools/tool';
import { TableSelectType } from 'src/app/enum/table-select-type.enum';
import { AIGarbageRegion } from 'src/app/network/model/ai-garbage/region.model';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { Page } from 'src/app/network/model/page_list.model';
import { AIGarbageStationDeviceSessionListBusiness } from './ai-garbage-station-device-session-list.business';
import {
  AIGarbageDeviceModel,
  AIGarbageDeviceTreeSelection,
  AIGarbageStationDeviceSessionListArgs,
} from './ai-garbage-station-device-session-list.model';

@Component({
  selector: 'ai-garbage-station-device-session-list',
  templateUrl: './ai-garbage-station-device-session-list.component.html',
  styleUrls: ['./ai-garbage-station-device-session-list.component.less'],
  providers: [
    AIGarbageStationDeviceTableService,
    AIGarbageStationDeviceSessionListBusiness,
  ],
})
export class AIGarbageStationDeviceSessionListComponent
  implements OnInit, OnDestroy
{
  @Input() selecteds: AIGarbageDeviceModel[] = [];
  @Output() selectedsChange: EventEmitter<AIGarbageDeviceModel[]> =
    new EventEmitter();

  @Output() session = new EventEmitter<AIGarbageDeviceModel>();

  constructor(
    private business: AIGarbageStationDeviceSessionListBusiness,
    private toastr: ToastrService
  ) {}

  datas: AIGarbageDeviceModel[] = [];
  args = new AIGarbageStationDeviceSessionListArgs();
  page = new Page();
  isEmpty = isEmpty;
  Color = ColorTool;
  Language = Language;
  handle?: NodeJS.Timer;
  selection = {
    region: new AIGarbageDeviceTreeSelection(),
  };

  ngOnInit(): void {
    this.selection.region.select.subscribe((x) => {
      this.args.regionId = undefined;
      this.args.divisionId = undefined;
      if (x instanceof Division) {
        this.args.divisionId = x.Id;
      } else if (x instanceof AIGarbageRegion) {
        this.args.regionId = x.Id;
      } else {
      }
    });
    this.onload(1);
  }
  ngOnDestroy(): void {
    if (this.handle) {
      clearTimeout(this.handle);
    }
  }

  onload(index: number, size: number = 100) {
    this.clear();
    this.business.load(index, size, this.args).then((x) => {
      this.datas = x.Data;
      this.page = x.Page;
      if (!this.handle) {
        this.status();
      }
    });
  }

  status() {
    this.handle = setTimeout(() => {
      this.business.sessions().then((sessions) => {
        this.datas.forEach((item) => {
          item.session = sessions.find((x) => x.DeviceId == item.Id);
        });
        this.status();
      });
    }, 5 * 1000);
  }

  onitemclick(e: Event, item: AIGarbageDeviceModel) {
    this.selecteds = [item];
    this.selectedsChange.emit(this.selecteds);
    this.onsession(item);
  }

  isselected(item: AIGarbageDeviceModel) {
    return this.selecteds.includes(item);
  }

  oncheckclick(item: AIGarbageDeviceModel) {
    this.onselect(item);
  }

  onselect(item: AIGarbageDeviceModel) {
    let index = this.selecteds.indexOf(item);
    if (index < 0) {
      this.selecteds.push(item);

      this.onsession(item);
    } else {
      this.selecteds.splice(index, 1);
    }

    this.selectedsChange.emit(this.selecteds);
  }

  clear() {
    this.selecteds = [];
    this.selectedsChange.emit(this.selecteds);
  }

  onallselect(type: TableSelectType) {
    switch (type) {
      case TableSelectType.All:
        this.selecteds = this.datas;
        break;
      case TableSelectType.Cancel:
        this.selecteds = [];
        break;
      case TableSelectType.Reverse:
        this.selecteds = this.datas.filter((x) => {
          return !this.selecteds.includes(x);
        });
        break;

      default:
        break;
    }
    this.selectedsChange.emit(this.selecteds);
  }

  pageEvent(page: PageEvent) {
    this.onload(page.pageIndex + 1, this.page.PageSize);
  }

  onsearch(name: string) {
    this.args.name = name;
    this.onload(1);
  }

  onsession(item: AIGarbageDeviceModel) {
    this.session.emit(item);
  }

  oncommand() {
    if (this.selecteds.length > 0) {
      this.business
        .command(this.selecteds.map((x) => x.Id))
        .then((x) => {
          this.toastr.success('命令已发送');
          this.clear();
        })
        .catch((e) => {
          this.toastr.error('命令发送失败');
        });
    }
  }
}
