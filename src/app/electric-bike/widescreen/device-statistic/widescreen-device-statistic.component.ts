import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { StoreService } from 'src/app/common/service/store.service';
import { StationState } from 'src/app/enum/station-state.enum';
import { IModel } from 'src/app/network/model/model.interface';
import { DeviceStatisticBusiness } from '../../device-statistic/device-statistic.business';
import { DeviceStatisticModel } from '../../device-statistic/device-statistic.model';

@Component({
  selector: 'howell-widescreen-device-statistic',
  templateUrl: './widescreen-device-statistic.component.html',
  styleUrls: ['./widescreen-device-statistic.component.less'],
  providers: [DeviceStatisticBusiness],
})
export class WidescreenDeviceStatisticComponent
  implements IComponent<IModel, DeviceStatisticModel>, OnInit, OnChanges
{
  @Input()
  business: IBusiness<IModel, DeviceStatisticModel>;

  @Output()
  statusClick: EventEmitter<StationState | undefined> = new EventEmitter();
  @Input()
  load?: EventEmitter<void>;

  constructor(business: DeviceStatisticBusiness, private store: StoreService) {
    this.business = business;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.load) {
      if (this.load) {
        this.load.subscribe((x) => {
          this.loadData();
        });
      }
    }
  }

  StationState = StationState;

  data: DeviceStatisticModel = new DeviceStatisticModel();
  ngOnInit(): void {
    this.loadData();

    this.store.statusChange.subscribe((x) => {
      this.loadData();
    });
    this.store.refresh.subscribe((x) => {
      this.loadData();
    });
  }
  async loadData() {
    this.data = await this.business.load();
  }

  onStatusClicked(status?: StationState) {
    this.statusClick.emit(status);
  }
}
