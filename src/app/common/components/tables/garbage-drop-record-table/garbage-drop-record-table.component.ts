import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import {
  IModel,
  ImagePagedArgs,
  PagedArgs,
} from 'src/app/network/model/model.interface';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { PagedTableAbstractComponent } from '../table-abstract.component';
import { GarbageDropRecordTableBusiness } from './garbage-drop-record-table.business';
import {
  GarbageDropEventRecordConverter,
  GarbageDropEventRecordPagedConverter,
} from './garbage-drop-record-table.converter';
import {
  GarbageDropRecordFilter,
  GarbageDropRecordViewModel,
} from './garbage-drop-record.model';

@Component({
  selector: 'howell-garbage-drop-record-table',
  templateUrl: './garbage-drop-record-table.component.html',
  styleUrls: ['../table.less', './garbage-drop-record-table.component.less'],
  providers: [
    GarbageDropEventRecordConverter,
    GarbageDropEventRecordPagedConverter,
    GarbageDropRecordTableBusiness,
  ],
})
export class GarbageDropRecordTableComponent
  extends PagedTableAbstractComponent<GarbageDropRecordViewModel>
  implements IComponent<IModel, PagedList<GarbageDropRecordViewModel>>, OnInit
{
  @Input() business: IBusiness<IModel, PagedList<GarbageDropRecordViewModel>>;
  @Input() load?: EventEmitter<GarbageDropRecordFilter>;
  @Input() filter: GarbageDropRecordFilter;
  @Output() video: EventEmitter<GarbageDropRecordViewModel> =
    new EventEmitter();
  @Output() image: EventEmitter<ImagePagedArgs<GarbageDropRecordViewModel>> =
    new EventEmitter();

  @Input() get?: EventEmitter<Page>;
  @Output() got: EventEmitter<PagedList<GarbageDropRecordViewModel>> =
    new EventEmitter();
  @Output() complete: EventEmitter<PagedArgs<GarbageDropRecordViewModel>> =
    new EventEmitter();

  constructor(record: GarbageDropRecordTableBusiness) {
    super();
    this.business = record;
    this.filter = new GarbageDropRecordFilter();
  }

  widths = [
    '12%',
    '10%',
    '9%',
    '9%',
    '8%',
    '9%',
    '7%',
    '7%',
    '8%',
    '7%',
    '7%',
    '7%',
  ];

  loading = false;
  selected?: GarbageDropRecordViewModel;

  async ngOnInit() {
    if (this.load) {
      this.load.subscribe((x) => {
        this.filter = x;
        this.loadData(-1, this.pageSize, this.filter);
      });
    }
    if (this.get) {
      this.get.subscribe((page) => {
        let promise = this.business.load(
          page.PageIndex,
          page.PageSize,
          this.filter
        );
        promise.then((data) => {
          this.got.emit(data);
        });
      });
    }
    this.loadData(-1, this.pageSize, this.filter);
  }

  async pageEvent(page: PageEvent) {
    this.loadData(page.pageIndex + 1, this.pageSize, this.filter);
  }

  loadData(index: number, size: number, filter: GarbageDropRecordFilter) {
    let promise = this.business.load(index, size, filter);
    this.loading = true;
    promise
      .then((paged) => {
        this.page = paged.Page;
        this.datas = paged.Data;
      })
      .finally(() => {
        this.loading = false;
      });
    return promise;
  }

  onvideo(e: Event, item: GarbageDropRecordViewModel) {
    this.video.emit(item);
    if (this.selected === item) {
      e.stopPropagation();
    }
  }

  onimage(e: Event, item: GarbageDropRecordViewModel, index: number) {
    let plain = instanceToPlain(this.page);
    let page = plainToInstance(Page, plain);

    page.RecordCount = this.page.TotalRecordCount;
    page.PageCount = this.page.TotalRecordCount;
    page.PageSize = 1;
    let _index = this.datas.indexOf(item);
    page.PageIndex =
      (this.page.PageIndex - 1) * this.page.PageSize + _index + 1;

    this.image.emit({
      page: page,
      data: item,
      index: index,
    });
    if (this.selected === item) {
      e.stopPropagation();
    }
  }

  onselect(item: GarbageDropRecordViewModel) {
    if (this.selected === item) {
      this.selected = undefined;
    } else {
      this.selected = item;
    }
  }
  oncomplete(e: Event, item: GarbageDropRecordViewModel) {
    let plain = instanceToPlain(this.page);
    let page = plainToInstance(Page, plain);
    page.RecordCount = this.page.TotalRecordCount;
    page.PageCount = this.page.TotalRecordCount;
    page.PageSize = 1;
    let _index = this.datas.indexOf(item);
    page.PageIndex =
      (this.page.PageIndex - 1) * this.page.PageSize + _index + 1;
    this.complete.emit({ page: page, data: item });
    if (item === this.selected) {
      e.stopPropagation();
    }
  }
}
