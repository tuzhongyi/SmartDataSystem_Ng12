import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
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
  @Input() selected: GarbageStationModel[] = [];
  @Output() selectedChange: EventEmitter<GarbageStationModel[]> =
    new EventEmitter();
  @Output() details: EventEmitter<GarbageStationModel> = new EventEmitter();

  constructor(business: AIOPGarbageStationTableBusiness) {
    super();
    this.business = business;
  }
  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((x) => {
        this.args = x;
        this.loadData(1);
      });
    }
    this.loadData(1);
  }

  widths = ['250px', undefined, undefined, undefined, undefined, '10%'];

  loadData(index: number, size: number = 10): void {
    this.loading = true;
    this.business.load(index, size, this.args).then((x) => {
      this.page = x.Page;
      this.datas = x.Data;
      this.loading = false;
    });
  }
  onselect(item: GarbageStationModel) {
    let index = this.selected.indexOf(item);
    if (index < 0) {
      this.selected.push(item);
    } else {
      this.selected.splice(index, 1);
    }
  }
  ondetails(item: GarbageStationModel) {
    this.details.emit(item);
  }
}
