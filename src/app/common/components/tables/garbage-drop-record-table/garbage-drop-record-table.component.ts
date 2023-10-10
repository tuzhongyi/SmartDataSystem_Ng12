import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { IModel, PagedArgs } from 'src/app/network/model/model.interface';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { PagedParams } from 'src/app/network/request/IParams.interface';
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
  implements
    IComponent<IModel, PagedList<GarbageDropRecordViewModel>>,
    OnInit,
    OnChanges
{
  @Input() business: IBusiness<IModel, PagedList<GarbageDropRecordViewModel>>;
  @Input() load?: EventEmitter<GarbageDropRecordFilter>;
  @Input() filter: GarbageDropRecordFilter;
  @Output() video: EventEmitter<GarbageDropRecordViewModel> =
    new EventEmitter();
  @Output() image: EventEmitter<PagedArgs<GarbageDropRecordViewModel>> =
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
    '10%',
    '7%',
    '7%',
    '5%',
  ];

  loading = false;
  selected?: GarbageDropRecordViewModel;
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

  onvideo(item: GarbageDropRecordViewModel) {
    this.video.emit(item);
  }

  onimage(e: Event, item: GarbageDropRecordViewModel, index: number) {
    this.image.emit({
      page: Page.create(index),
      data: item,
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
}
