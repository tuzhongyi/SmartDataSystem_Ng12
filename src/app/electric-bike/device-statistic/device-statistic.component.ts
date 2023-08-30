import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { StationState } from 'src/app/enum/station-state.enum';
import { IModel } from 'src/app/network/model/model.interface';
import { DeviceStatisticBusiness } from './device-statistic.business';
import { DeviceStatisticModel } from './device-statistic.model';

@Component({
  selector: 'howell-device-statistic',
  templateUrl: './device-statistic.component.html',
  styleUrls: ['./device-statistic.component.less'],
  providers: [DeviceStatisticBusiness],
})
export class DeviceStatisticComponent
  implements IComponent<IModel, DeviceStatisticModel>, OnInit
{
  @Input()
  business: IBusiness<IModel, DeviceStatisticModel>;

  @Output()
  statusClick: EventEmitter<StationState | undefined> = new EventEmitter();
  @Input()
  load?: EventEmitter<void>;

  constructor(business: DeviceStatisticBusiness) {
    this.business = business;
  }

  StationState = StationState;

  data: DeviceStatisticModel = new DeviceStatisticModel();
  ngOnInit(): void {
    this.loadData();

    if (this.load) {
      this.load.subscribe((x) => {
        this.loadData();
      });
    }
  }
  async loadData() {
    this.data = await this.business.load();
  }

  onStatusClicked(status?: StationState) {
    this.statusClick.emit(status);
  }
}
