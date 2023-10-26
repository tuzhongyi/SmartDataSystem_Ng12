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
import { Language } from 'src/app/common/tools/language';
import { GarbageVehicleCameraConverter } from 'src/app/converter/garbage-vehicle-camera.converter';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { VehiclePositionNo } from 'src/app/enum/position-no.enum';
import { VehicleCamera } from 'src/app/network/model/garbage-station/vehicle-camera.model';
import { IModel } from 'src/app/network/model/model.interface';
import { SelectItem } from '../../select-control/select-control.model';

import { GarbageVehicleCameraTableBusiness } from './garbage-vehicle-camera-table.business';

@Component({
  selector: 'garbage-vehicle-camera-table',
  templateUrl: './garbage-vehicle-camera-table.component.html',
  styleUrls: ['../table.less', './garbage-vehicle-camera-table.component.less'],
  providers: [GarbageVehicleCameraTableBusiness, GarbageVehicleCameraConverter],
})
export class GarbageVehicleCameraTableComponent
  implements IComponent<IModel, VehicleCamera[]>, OnInit, OnChanges
{
  @Input()
  business: IBusiness<IModel[], VehicleCamera[]>;
  @Input()
  condition?: string;
  @Input()
  selected: VehicleCamera[] = [];
  @Output()
  selectedChange: EventEmitter<VehicleCamera[]> = new EventEmitter();
  @Input()
  vehicleId!: string;

  constructor(business: GarbageVehicleCameraTableBusiness) {
    this.business = business;
  }
  OnlineStatus = OnlineStatus;
  widths = ['40%', '30%', '30%'];

  datas: VehicleCamera[] = [];
  loading = false;
  positions: SelectItem[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.condition && !changes.condition.firstChange) {
      this.loadData(this.condition);
    }
  }

  ngOnInit(): void {
    this.initPositions();
    this.loadData(this.condition);
  }

  initPositions() {
    this.positions = [];
    this.positions.push(new SelectItem(undefined, undefined, '未知'));
    this.positions.push(
      SelectItem.create(VehiclePositionNo.CarFront, Language.VehiclePositionNo)
    );
    this.positions.push(
      SelectItem.create(VehiclePositionNo.CarEnd, Language.VehiclePositionNo)
    );
    this.positions.push(
      SelectItem.create(VehiclePositionNo.TrashCan, Language.VehiclePositionNo)
    );
  }

  async loadData(condition?: string) {
    this.loading = true;
    this.business.load(this.vehicleId, condition).then((datas) => {
      this.loading = false;
      this.datas = datas;
    });
  }

  onselect(item: VehicleCamera) {
    let index = this.selected.indexOf(item);
    if (index < 0) {
      this.selected.push(item);
    } else {
      this.selected.splice(index, 1);
    }
    this.selectedChange.emit(this.selected);
  }

  onpositionselect(e: Event) {
    e.stopPropagation();
  }
}
