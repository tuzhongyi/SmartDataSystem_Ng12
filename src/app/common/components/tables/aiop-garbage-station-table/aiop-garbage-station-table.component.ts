import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { IModel } from 'src/app/network/model/model.interface';
import { PagedList } from 'src/app/network/model/page_list.model';
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
  extends PagedTableAbstractComponent<GarbageStation>
  implements IComponent<IModel, PagedList<GarbageStation>>, OnInit
{
  @Input() load?: EventEmitter<AIOPGarbageStationTableArgs>;
  @Input() args: AIOPGarbageStationTableArgs =
    new AIOPGarbageStationTableArgs();
  @Input() business: IBusiness<IModel, PagedList<GarbageStation>>;
  @Output() details: EventEmitter<GarbageStation> = new EventEmitter();
  constructor(business: AIOPGarbageStationTableBusiness) {
    super();
    this.business = business;
  }
  ngOnInit(): void {
    this.loadData(1);
  }

  widths = [];
  selected?: GarbageStation;

  loadData(index: number, size: number = 10): void {
    this.loading = true;
    this.business.load(index, size, this.args).then((x) => {
      this.page = x.Page;
      this.datas = x.Data;
      this.loading = false;
    });
  }
  onselect(item: GarbageStation) {
    if (this.selected === item) {
      this.selected = undefined;
    } else {
      this.selected = item;
    }
  }
  ondetails(item: GarbageStation) {
    this.details.emit(item);
  }
}
