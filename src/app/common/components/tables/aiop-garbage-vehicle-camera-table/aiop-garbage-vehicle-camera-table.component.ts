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
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { VehicleCamera } from 'src/app/network/model/garbage-station/vehicle-camera.model';
import { IModel } from 'src/app/network/model/model.interface';
import { PagedList } from 'src/app/network/model/page_list.model';
import { VehicleCameraModel } from 'src/app/network/view-model/vehicle-camera.view-model';
import { PagedTableAbstractComponent } from '../table-abstract.component';
import { AiopGarbageVehicleCameraTableTableBusiness as AiopGarbageVehicleCameraTableBusiness } from './aiop-garbage-vehicle-camera-table.business';

@Component({
  selector: 'aiop-garbage-vehicle-camera-table',
  templateUrl: './aiop-garbage-vehicle-camera-table.component.html',
  styleUrls: [
    '../table.less',
    './aiop-garbage-vehicle-camera-table.component.less',
  ],
  providers: [AiopGarbageVehicleCameraTableBusiness],
})
export class AiopGarbageVehicleCameraTableComponent
  extends PagedTableAbstractComponent<VehicleCameraModel>
  implements
    IComponent<IModel, PagedList<VehicleCameraModel>>,
    OnInit,
    OnChanges
{
  @Input()
  business: IBusiness<IModel, PagedList<VehicleCameraModel>>;
  @Input()
  divisionId?: string;
  @Input()
  load?: EventEmitter<string>;

  @Output()
  update: EventEmitter<VehicleCameraModel> = new EventEmitter();

  @Input()
  selected?: VehicleCamera[];
  @Output()
  selectedChange: EventEmitter<VehicleCamera[]> = new EventEmitter();

  constructor(business: AiopGarbageVehicleCameraTableBusiness) {
    super();
    this.business = business;
  }
  OnlineStatus = OnlineStatus;
  widths = ['45%', '15%', '20%', '10%', '10%'];

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.divisionId) {
      if (this.divisionId) {
        this.loadData(1, this.pageSize);
      }
    }
    if (changes.load) {
      if (this.load) {
        this.load.subscribe((name) => {
          this.loadData(1, this.pageSize, name);
        });
      }
    }
  }
  async loadData(index: number, size: number, name?: string) {
    this.selected = undefined;

    let paged = await this.business.load(index, size, this.divisionId, name);
    this.page = paged.Page;
    this.datas = paged.Data;
  }

  onupdate(e: Event, item: VehicleCameraModel) {
    this.update.emit(item);
    e.stopPropagation();
  }

  onselected(item: VehicleCameraModel) {
    if (!this.selected) {
      this.selected = [];
    }
    let index = this.selected.indexOf(item);
    if (index < 0) {
      this.selected.push(item);
    } else {
      this.selected.splice(index, 1);
    }
    this.selectedChange.emit(this.selected);
  }
}
