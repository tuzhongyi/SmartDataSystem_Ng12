import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { ResourceOnlineStatusRecord } from 'src/app/network/model/aiop/resource-online-status-record.model';
import { IModel } from 'src/app/network/model/model.interface';
import { PagedList } from 'src/app/network/model/page_list.model';
import { PagedTableAbstractComponent } from '../table-abstract.component';
import { AIOPRecordResourceStatusOnlineTableBusiness } from './aiop-record-resource-status-online-table.business';
import { AIOPRecordResourceStatusOnlineTableArgs } from './aiop-record-resource-status-online-table.model';

@Component({
  selector: 'aiop-record-resource-status-online-table',
  templateUrl: './aiop-record-resource-status-online-table.component.html',
  styleUrls: [
    '../table.less',
    './aiop-record-resource-status-online-table.component.less',
  ],
  providers: [AIOPRecordResourceStatusOnlineTableBusiness],
})
export class AIOPRecordResourceStatusOnlineTableComponent
  extends PagedTableAbstractComponent<ResourceOnlineStatusRecord>
  implements OnInit
{
  @Input() load?: EventEmitter<AIOPRecordResourceStatusOnlineTableArgs>;
  @Input() args: AIOPRecordResourceStatusOnlineTableArgs =
    new AIOPRecordResourceStatusOnlineTableArgs();
  @Input() business: IBusiness<IModel, PagedList<ResourceOnlineStatusRecord>>;
  @Output() details: EventEmitter<ResourceOnlineStatusRecord> =
    new EventEmitter();

  constructor(business: AIOPRecordResourceStatusOnlineTableBusiness) {
    super();
    this.business = business;
  }

  widths = [];
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
  ondetails(e: Event, item: ResourceOnlineStatusRecord) {
    e.stopImmediatePropagation();
    this.details.emit(item);
  }

  sortData(sort: Sort) {
    this.args.asc = undefined;
    this.args.desc = undefined;
    const isAsc = sort.direction === 'asc';
    if (isAsc) {
      this.args.asc = sort.active;
    } else {
      this.args.desc = sort.active;
    }
    this.loadData(this.page.PageIndex);
  }
}
