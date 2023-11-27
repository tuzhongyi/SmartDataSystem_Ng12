import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DeviceListTableArgs } from 'src/app/common/components/tables/device-list-table/device-list-table.model';

import { DeviceViewModel } from 'src/app/common/components/tables/device-list-table/device.model';
import { WindowComponent } from 'src/app/common/components/window-control/window.component';
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
  @Input() status?: OnlineStatus;
  @Output() image: EventEmitter<DeviceViewModel> = new EventEmitter();

  constructor() {
    super();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.args.status = this.status;
    this.load.emit();
  }

  ngOnInit(): void {}

  load: EventEmitter<DeviceListTableArgs> = new EventEmitter();

  args = new DeviceListTableArgs();

  onsearch(text: string) {
    this.args.name = text;
    this.load.emit(this.args);
  }
  onimage(model: DeviceViewModel) {
    this.image.emit(model);
  }
}
