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
  selector: 'howell-device-list-window',
  templateUrl: './device-list-window.component.html',
  styleUrls: ['./device-list-window.component.less'],
})
export class DeviceListWindowComponent
  extends WindowComponent
  implements OnInit, OnChanges
{
  constructor() {
    super();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.filter.status = this.status;
    this.load.emit();
  }

  ngOnInit(): void {}

  load: EventEmitter<string> = new EventEmitter();

  @Input()
  status?: OnlineStatus;
  filter: DeviceListTableFilter = {};

  onsearch(text: string) {
    this.load.emit(text);
  }
}
