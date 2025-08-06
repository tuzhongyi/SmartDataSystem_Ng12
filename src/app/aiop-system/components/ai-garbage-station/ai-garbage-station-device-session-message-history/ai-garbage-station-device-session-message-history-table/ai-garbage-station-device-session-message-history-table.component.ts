import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { AIGarbageDevice } from 'src/app/network/model/ai-garbage/garbage-device.model';

@Component({
  selector: 'ai-garbage-station-device-session-message-history-table',
  templateUrl:
    './ai-garbage-station-device-session-message-history-table.component.html',
  styleUrls: [
    './ai-garbage-station-device-session-message-history-table.component.less',
  ],
})
// '../../../../../common/components/tables/table.less',
export class AiGarbageStationDeviceSessionMessageHistoryTableComponent
  implements OnInit
{
  @Input() datas: AIGarbageDevice[] = [];
  @Input() success: string[] = [];
  @Input() selected?: AIGarbageDevice;
  @Output() selectedChange = new EventEmitter<AIGarbageDevice>();

  constructor() {}

  widths = [];

  ngOnInit(): void {}

  on = {
    select: (item: AIGarbageDevice) => {
      this.selected = item;
      this.selectedChange.emit(item);
    },
    sort: (sort: Sort) => {
      this.datas = this.datas.sort((a, b) => {
        let _a = a as any;
        let _b = b as any;
        return LocaleCompare.compare(
          _a[sort.active],
          _b[sort.active],
          sort.direction == 'asc'
        );
      });
    },
  };
}
