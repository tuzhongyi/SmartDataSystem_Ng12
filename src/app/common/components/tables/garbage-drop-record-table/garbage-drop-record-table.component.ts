import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { EventType } from 'src/app/enum/event-type.enum';
import { IModel } from 'src/app/network/model/model.interface';
import { PagedList } from 'src/app/network/model/page_list.model';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { EventRecordBusiness } from '../event-record-table/event-record.business';
import { TableAbstractComponent } from '../table-abstract.component';
import { GarbageDropRecordTableBusiness } from './garbage-drop-record-table.business';
import {
  GarbageDropRecordFilter,
  GarbageDropRecordViewModel,
} from './garbage-drop-record.model';

@Component({
  selector: 'howell-garbage-drop-record-table',
  templateUrl: './garbage-drop-record-table.component.html',
  styleUrls: ['../table.less', './garbage-drop-record-table.component.less'],
  providers: [GarbageDropRecordTableBusiness],
})
export class GarbageDropRecordTableComponent
  extends TableAbstractComponent<GarbageDropRecordViewModel>
  implements
    IComponent<IModel, PagedList<GarbageDropRecordViewModel>>,
    OnInit,
    OnChanges
{
  @Input()
  business: IBusiness<IModel, PagedList<GarbageDropRecordViewModel>>;
  @Input()
  load?: EventEmitter<GarbageDropRecordFilter>;

  @Input()
  filter: GarbageDropRecordFilter;

  width = [
    '11%',
    '13%',
    '12%',
    '11%',
    '9%',
    '9%',
    '9%',
    '7%',
    '7%',
    '7%',
    '5%',
  ];

  loading = false;

  constructor(record: GarbageDropRecordTableBusiness) {
    super();
    this.business = record;
    this.filter = new GarbageDropRecordFilter();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.load && changes.load.firstChange && this.load) {
      this.load.subscribe((x) => {
        this.filter = x;
        this.loadData(-1, this.pageSize, this.filter);
      });
    }
  }

  async ngOnInit() {
    this.loadData(-1, this.pageSize, this.filter);
  }

  async pageEvent(page: PageEvent) {
    this.loadData(page.pageIndex + 1, this.pageSize, this.filter);
  }

  loadData(index: number, size: number, filter: GarbageDropRecordFilter) {
    let params = new PagedParams();
    params.PageSize = size;
    params.PageIndex = index;

    let promise = this.business.load(params, filter);
    this.loading = true;
    promise.then((paged) => {
      this.loading = false;
      this.page = paged.Page;

      this.datas = paged.Data;
    });
    return promise;
  }
}