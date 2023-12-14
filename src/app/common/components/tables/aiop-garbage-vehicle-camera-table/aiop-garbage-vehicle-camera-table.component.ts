import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { TableSelectType } from 'src/app/enum/table-select-type.enum';
import { VehicleCamera } from 'src/app/network/model/garbage-station/vehicle-camera.model';
import { IModel } from 'src/app/network/model/model.interface';
import { PagedList } from 'src/app/network/model/page_list.model';
import { VehicleCameraModel } from 'src/app/network/view-model/vehicle-camera.view-model';
import { PagedTableAbstractComponent } from '../table-abstract.component';
import { AiopGarbageVehicleCameraTableTableBusiness as AiopGarbageVehicleCameraTableBusiness } from './aiop-garbage-vehicle-camera-table.business';
import { AiopGarbageVehicleCameraTableArgs } from './aiop-garbage-vehicle-camera-table.model';

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
  implements IComponent<IModel, PagedList<VehicleCameraModel>>, OnInit
{
  @Input() business: IBusiness<IModel, PagedList<VehicleCameraModel>>;
  @Input() init = true;
  @Input() args = new AiopGarbageVehicleCameraTableArgs();
  @Input() load?: EventEmitter<AiopGarbageVehicleCameraTableArgs>;
  @Output() details: EventEmitter<VehicleCameraModel> = new EventEmitter();
  @Input() selecteds: VehicleCamera[] = [];
  @Output() selectedsChange: EventEmitter<VehicleCamera[]> = new EventEmitter();

  constructor(business: AiopGarbageVehicleCameraTableBusiness) {
    super();
    this.business = business;
  }

  OnlineStatus = OnlineStatus;
  widths = [];

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((args) => {
        this.args = args;
        this.loadData(
          this.args.tofirst ? 1 : this.page.PageIndex,
          this.pageSize
        );
      });
    }
    if (this.init) {
      this.loadData(1, this.pageSize);
    }
  }

  async loadData(index: number, size: number) {
    this.selecteds = [];
    let paged = await this.business.load(index, size, this.args);
    this.page = paged.Page;
    this.datas = paged.Data;
  }

  ondetails(e: Event, item: VehicleCameraModel) {
    this.details.emit(item);
    e.stopPropagation();
  }

  onselected(item: VehicleCameraModel) {
    if (!this.selecteds) {
      this.selecteds = [];
    }
    let index = this.selecteds.indexOf(item);
    if (index < 0) {
      this.selecteds.push(item);
    } else {
      this.selecteds.splice(index, 1);
    }
    this.selectedsChange.emit(this.selecteds);
  }
  toselect(type: TableSelectType) {
    switch (type) {
      case TableSelectType.All:
        this.selecteds = [...this.datas];
        break;
      case TableSelectType.Cancel:
        this.selecteds = [];
        break;
      case TableSelectType.Reverse:
        this.selecteds = this.datas.filter((x) => !this.selecteds.includes(x));
        break;

      default:
        break;
    }
    this.selectedsChange.emit(this.selecteds);
  }
}
