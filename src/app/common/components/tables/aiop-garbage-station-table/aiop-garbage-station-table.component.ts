import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { TableSelectType } from 'src/app/enum/table-select-type.enum';
import { IModel } from 'src/app/network/model/model.interface';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GarbageStationModel } from 'src/app/view-model/garbage-station.model';
import { PagedTableAbstractComponent } from '../table-abstract.component';
import { AIOPGarbageStationTableBusiness } from './aiop-garbage-station-table.business';
import { AIOPGarbageStationTableArgs } from './aiop-garbage-station-table.model';
import { AIOPGarbageStationTableService } from './aiop-garbage-station-table.service';

@Component({
  selector: 'aiop-garbage-station-table',
  templateUrl: './aiop-garbage-station-table.component.html',
  styleUrls: ['../table.less', './aiop-garbage-station-table.component.less'],
  providers: [AIOPGarbageStationTableService, AIOPGarbageStationTableBusiness],
})
export class AIOPGarbageStationTableComponent
  extends PagedTableAbstractComponent<GarbageStationModel>
  implements IComponent<IModel, PagedList<GarbageStationModel>>, OnInit
{
  @Input() load?: EventEmitter<AIOPGarbageStationTableArgs>;
  @Input() args: AIOPGarbageStationTableArgs =
    new AIOPGarbageStationTableArgs();
  @Input() business: IBusiness<IModel, PagedList<GarbageStationModel>>;
  @Input() selecteds: GarbageStationModel[] = [];
  @Output() selectedsChange: EventEmitter<GarbageStationModel[]> =
    new EventEmitter();
  @Output() details: EventEmitter<GarbageStationModel> = new EventEmitter();

  constructor(business: AIOPGarbageStationTableBusiness) {
    super();
    this.business = business;
  }

  widths = ['250px', undefined, undefined, undefined, undefined, '10%'];
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
  onselect(item: GarbageStationModel) {
    let index = this.selecteds.indexOf(item);
    if (index < 0) {
      this.selecteds.push(item);
    } else {
      this.selecteds.splice(index, 1);
    }

    this.selectedsChange.emit(this.selecteds);
  }
  ondetails(e: Event, item: GarbageStationModel) {
    this.details.emit(item);
    e.stopPropagation();
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
