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
import { DeviceViewModel } from 'src/app/common/components/tables/device-list-table/device.model';
import { WindowComponent } from 'src/app/common/components/window-control/window.component';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import {
  SearchOptionKey,
  SearchOptions,
} from 'src/app/view-model/search-options.model';

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
    this.filter.status = this.status;
    this.load.emit();
  }

  ngOnInit(): void {}

  load: EventEmitter<SearchOptions> = new EventEmitter();

  filter: DeviceListTableFilter = {};

  onsearch(text: string) {
    let opts: SearchOptions = {
      text: text,
      propertyName: SearchOptionKey.name,
    };
    this.load.emit(opts);
  }
  onimage(model: DeviceViewModel) {
    this.image.emit(model);
  }
}
