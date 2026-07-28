import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { IBusiness, IGet } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { ColorTool } from 'src/app/common/tools/color-tool/color.tool';
import { EventType } from 'src/app/enum/event-type.enum';
import {
  IModel,
  ImagePagedArgs,
  PagedArgs
} from 'src/app/network/model/model.interface';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { PagedTableAbstractComponent } from '../../table-abstract.component';
import { EventRecordFilter } from '../event-record.model';

@Component({
  selector: 'event-record-table-mixed-into',
  templateUrl: './event-record-table-mixed-into.component.html',
  styleUrls: [
    '../../table-sticky.less',
    './event-record-table-mixed-into.component.less'
  ]
})
export class EventRecordTableMixedIntoComponent
  extends PagedTableAbstractComponent<EventRecordViewModel>
  implements IComponent<IModel, PagedList<EventRecordViewModel>>, OnInit
{
  @Input() business!: IBusiness<IModel, PagedList<EventRecordViewModel>> &
    IGet<PagedList<EventRecordViewModel>>;
  @Input() load?: EventEmitter<EventRecordFilter>;
  @Input() filter: EventRecordFilter = new EventRecordFilter();
  @Input() get?: EventEmitter<Page>;
  @Output() got: EventEmitter<PagedList<EventRecordViewModel>> =
    new EventEmitter();
  @Output() card = new EventEmitter<EventRecordViewModel>();
  @Output() video = new EventEmitter<EventRecordViewModel>();
  @Output() image = new EventEmitter<ImagePagedArgs<EventRecordViewModel>>();
  @Output() downloadVideo = new EventEmitter<EventRecordViewModel>();
  @Output() downloadImage = new EventEmitter<EventRecordViewModel>();
  @Output() allvideo = new EventEmitter<EventRecordViewModel>();
  @Output() complete = new EventEmitter<PagedArgs<EventRecordViewModel>>();
  @Output() find = new EventEmitter<EventRecordViewModel>();
  @Input() findable = false;
  constructor() {
    super(true);
  }

  widths = [
    '155px',
    '250px',
    '200px',
    '120px',
    '120px',
    '180px',
    '210px',
    '120px',
    '120px',
    '120px',
    '120px',
    '200px'
  ];
  selected?: EventRecordViewModel;
  Color = ColorTool;

  async ngOnInit() {
    if (this.load) {
      this.load.subscribe((x) => {
        if (x) {
          this.filter = x;
        }
        this.loadData(-1, this.pageSize);
      });
    }
    if (this.get) {
      this.get.subscribe((page) => {
        let params = new PagedParams();
        params.PageSize = page.PageSize;
        params.PageIndex = page.PageIndex;
        let promise = this.business.load(
          EventType.MixedInto,
          params,
          this.filter
        );
        promise.then((data) => {
          this.got.emit(data);
        });
      });
    }
    this.loadData(-1, this.pageSize);
  }

  loadData(index: number, size: number) {
    let params = new PagedParams();
    params.PageSize = size;
    params.PageIndex = index;

    let promise = this.business.load(EventType.MixedInto, params, this.filter);
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

  on = {
    download: {
      video: (model: EventRecordViewModel) => {
        this.downloadVideo.emit(model);
      },
      image: (model: EventRecordViewModel) => {
        this.downloadImage.emit(model);
      }
    },
    select: (item: EventRecordViewModel) => {
      if (item === this.selected) {
        this.selected = undefined;
      } else {
        this.selected = item;
      }
    },
    cardrecord: (model: EventRecordViewModel) => {
      this.card.emit(model);
    },
    find: (e: Event, model: EventRecordViewModel) => {
      this.find.emit(model);
      if (model === this.selected) {
        e.stopPropagation();
      }
    },

    image: (e: Event, item: EventRecordViewModel, index: number) => {
      let plain = instanceToPlain(this.page);
      let page = plainToInstance(Page, plain);

      page.RecordCount = this.page.TotalRecordCount;
      page.PageCount = this.page.TotalRecordCount;
      page.PageSize = 1;
      let _index = this.datas.indexOf(item);
      page.PageIndex =
        (this.page.PageIndex - 1) * this.page.PageSize + _index + 1;

      this.image.emit({ page: page, data: item, index: index });
      if (this.selected === item) {
        e.stopPropagation();
      }
    },
    video: {
      play: (e: Event, model: EventRecordViewModel) => {
        this.video.emit(model);
        if (model === this.selected) {
          e.stopPropagation();
        }
      },
      all: (e: Event, model: EventRecordViewModel) => {
        this.allvideo.emit(model);
        if (model === this.selected) {
          e.stopPropagation();
        }
      }
    },
    complete: (e: Event, item: EventRecordViewModel) => {
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
  };
}
