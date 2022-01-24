import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DeviceListTableFilter } from 'src/app/common/components/tables/device-list-table/device-list-table.component';
import { WindowComponent } from 'src/app/common/components/window-control/window.component';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { OnlineStatus } from 'src/app/enum/online-status.enum';

@Component({
  selector: 'howell-device-list-table-window',
  templateUrl: './device-list-table-window.component.html',
  styleUrls: ['./device-list-table-window.component.less'],
})
export class DeviceListTableWindowComponent
  extends WindowComponent
  implements OnInit, OnChanges
{
  constructor() {
    super();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.status) {
      debugger;
      this.filter.status = this.status;
      this.load.emit(this.filter);
    }
  }

  ngOnInit(): void {}

  load: EventEmitter<DeviceListTableFilter> = new EventEmitter();

  filter: DeviceListTableFilter = {};

  @Input()
  status?: OnlineStatus;

  onsearch(text: string) {
    this.filter.name = text;
    this.load.emit(this.filter);
  }
}
