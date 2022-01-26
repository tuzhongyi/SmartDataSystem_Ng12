import { Component, EventEmitter, OnInit } from '@angular/core';
import { EventRecordFilter } from 'src/app/common/components/tables/event-record-table/event-record.model';
import { WindowComponent } from 'src/app/common/components/window-control/window.component';
import { ToolService } from 'src/app/common/tools/tool';
import { EventType } from 'src/app/enum/event-type.enum';
import { Language } from 'src/app/global/tool/language';

@Component({
  selector: 'howell-garbage-full-station-window',
  templateUrl: './garbage-full-station-window.component.html',
  styleUrls: ['./garbage-full-station-window.component.less'],
})
export class GarbageFullStationWindowComponent
  extends WindowComponent
  implements OnInit
{
  type = EventType.GarbageFull;
  constructor() {
    super();
  }

  index = 0;

  ngOnInit(): void {}

  load: EventEmitter<string> = new EventEmitter();

  onlistsearch(text: string) {
    this.load.emit(text);
  }

  indexChange(index: number) {
    this.index = index;
  }
}
