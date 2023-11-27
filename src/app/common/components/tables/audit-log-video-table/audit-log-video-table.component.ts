import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { VideoOperationLog } from 'src/app/network/model/garbage-station/log-operation-video.model';
import { IModel } from 'src/app/network/model/model.interface';
import { PagedList } from 'src/app/network/model/page_list.model';
import { PagedTableAbstractComponent } from '../table-abstract.component';
import { AuditLogVideoTableBusiness } from './audit-log-video-table.business';
import { AuditLogVideoTableArgs } from './audit-log-video-table.model';
import { AuditLogVideoTableService } from './audit-log-video-table.service';

@Component({
  selector: 'audit-log-video-table',
  templateUrl: './audit-log-video-table.component.html',
  styleUrls: ['../table.less', './audit-log-video-table.component.less'],
  providers: [AuditLogVideoTableService, AuditLogVideoTableBusiness],
})
export class AuditLogVideoTableComponent
  extends PagedTableAbstractComponent<VideoOperationLog>
  implements OnInit
{
  @Input() load?: EventEmitter<AuditLogVideoTableArgs>;
  @Input() args: AuditLogVideoTableArgs = new AuditLogVideoTableArgs();
  @Input() business: IBusiness<IModel, PagedList<VideoOperationLog>>;

  constructor(business: AuditLogVideoTableBusiness) {
    super();
    this.business = business;
    this.pageSize = 10;
  }
  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((x) => {
        this.args = x;
        this.loadData(this.args.tofirst ? 1 : this.page.PageIndex);
      });
    }
    this.loadData(1);
  }

  widths = ['230px'];

  loadData(index: number, size: number = this.pageSize): void {
    this.loading = true;
    this.business.load(index, size, this.args).then((x) => {
      this.page = x.Page;
      this.datas = x.Data;
      this.loading = false;
    });
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
