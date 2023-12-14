import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { TableSelectType } from 'src/app/enum/table-select-type.enum';
import { GarbageVehicle } from 'src/app/network/model/garbage-station/garbage-vehicle.model';
import { IModel } from 'src/app/network/model/model.interface';
import { PagedList } from 'src/app/network/model/page_list.model';
import { PagedTableAbstractComponent } from '../table-abstract.component';
import { AIOPGarbageVehicleTableBusiness } from './aiop-garbage-vehicle-table.business';
import { AIOPGarbageVehicleTableArgs } from './aiop-garbage-vehicle-table.model';

@Component({
  selector: 'aiop-garbage-vehicle-table',
  templateUrl: './aiop-garbage-vehicle-table.component.html',
  styleUrls: ['../table.less', './aiop-garbage-vehicle-table.component.less'],
  providers: [AIOPGarbageVehicleTableBusiness],
})
export class AIOPGarbageVehicleTableComponent
  extends PagedTableAbstractComponent<GarbageVehicle>
  implements IComponent<IModel, PagedList<GarbageVehicle>>, OnInit
{
  @Input() load?: EventEmitter<AIOPGarbageVehicleTableArgs>;
  @Input() args: AIOPGarbageVehicleTableArgs =
    new AIOPGarbageVehicleTableArgs();
  @Input() business: IBusiness<IModel, PagedList<GarbageVehicle>>;
  @Input() selecteds: GarbageVehicle[] = [];
  @Output() selectedsChange: EventEmitter<GarbageVehicle[]> =
    new EventEmitter();
  @Output() remove: EventEmitter<GarbageVehicle> = new EventEmitter();
  @Output() details: EventEmitter<GarbageVehicle> = new EventEmitter();
  @Output() cameras: EventEmitter<GarbageVehicle> = new EventEmitter();
  @Output() params: EventEmitter<GarbageVehicle> = new EventEmitter();
  @Output() command: EventEmitter<GarbageVehicle> = new EventEmitter();
  constructor(business: AIOPGarbageVehicleTableBusiness) {
    super();
    this.business = business;
  }

  widths = [
    undefined,
    undefined,
    '7%',
    undefined,
    '178px',
    '7%',
    '7%',
    undefined,
  ];
  ngOnInit(): void {
    this.pageSize = 10;
    if (this.load) {
      this.load.subscribe((x) => {
        this.args = x;
        this.loadData(this.args.tofirst ? 1 : this.page.PageIndex);
      });
    }
    this.loadData(1);
  }

  loadData(index: number, size: number = this.pageSize): void {
    this.loading = true;
    this.business.load(index, size, this.args).then((x) => {
      this.page = x.Page;
      this.datas = x.Data;
      this.loading = false;
    });
  }
  onselect(item: GarbageVehicle) {
    let index = this.selecteds.indexOf(item);
    if (index < 0) {
      this.selecteds.push(item);
    } else {
      this.selecteds.splice(index, 1);
    }

    this.selectedsChange.emit(this.selecteds);
  }
  onremove(e: Event, item: GarbageVehicle) {
    e.stopImmediatePropagation();
    this.remove.emit(item);
  }
  ondetails(e: Event, item: GarbageVehicle) {
    e.stopImmediatePropagation();
    this.details.emit(item);
  }
  oncamera(e: Event, item: GarbageVehicle) {
    e.stopImmediatePropagation();
    this.cameras.emit(item);
  }
  onparams(e: Event, item: GarbageVehicle) {
    e.stopImmediatePropagation();
    this.params.emit(item);
  }
  oncommand(e: Event, item: GarbageVehicle) {
    e.stopImmediatePropagation();
    this.command.emit(item);
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
