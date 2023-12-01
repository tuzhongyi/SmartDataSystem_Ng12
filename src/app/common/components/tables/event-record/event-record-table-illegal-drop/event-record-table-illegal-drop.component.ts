import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { IBusiness, IGet } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { EventType } from 'src/app/enum/event-type.enum';
import { GarbageFullEventData } from 'src/app/network/model/garbage-station/event-record/garbage-full-event-record.model';
import { IModel, PagedArgs } from 'src/app/network/model/model.interface';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { PagedTableAbstractComponent } from '../../table-abstract.component';
import { EventRecordFilter } from '../event-record.model';

@Component({
  selector: 'event-record-table-illegal-drop',
  templateUrl: './event-record-table-illegal-drop.component.html',
  styleUrls: [
    '../../table.less',
    '../event-record-table/event-record-table.component.less',
  ],
})
export class EventRecordTableIllegalDropComponent
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
  // @Output() image: EventEmitter<
  //   | ImagePaged<EventRecordViewModel>
  //   | ImageControlModelArray<EventRecordViewModel>
  // > = new EventEmitter();
  @Output() video: EventEmitter<EventRecordViewModel> = new EventEmitter();

  @Output() image: EventEmitter<PagedArgs<EventRecordViewModel>> =
    new EventEmitter();
  @Output() downloadVideo: EventEmitter<EventRecordViewModel> =
    new EventEmitter();
  @Output() downloadImage: EventEmitter<EventRecordViewModel> =
    new EventEmitter();

  widths = ['20%'];
  selected?: EventRecordViewModel;

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
          EventType.IllegalDrop,
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

    let promise = this.business.load(
      EventType.IllegalDrop,
      params,
      this.filter
    );
    this.loading = true;
    promise.then((paged) => {
      this.loading = false;
      this.page = paged.Page;

      this.datas = paged.Data;
    });
    return promise;
  }

  onDownloadVideo(model: EventRecordViewModel) {
    this.downloadVideo.emit(model);
  }
  async onDownloadImage(model: EventRecordViewModel) {
    this.downloadImage.emit(model);
  }
  onselect(item: EventRecordViewModel) {
    if (item === this.selected) {
      this.selected = undefined;
    } else {
      this.selected = item;
    }
  }

  playvideo(e: Event, model: EventRecordViewModel) {
    this.video.emit(model);
    if (model === this.selected) {
      e.stopPropagation();
    }
  }

  onimage(e: Event, item: EventRecordViewModel, index: number) {
    let plain = instanceToPlain(this.page);
    let page = plainToInstance(Page, plain);
    if (item.Data instanceof GarbageFullEventData) {
      page = Page.create(index, item.urls.length);
    } else {
      page.RecordCount = this.page.TotalRecordCount;
      page.PageCount = this.page.TotalRecordCount;
      page.PageSize = 1;
      index = this.datas.indexOf(item);
      page.PageIndex =
        (this.page.PageIndex - 1) * this.page.PageSize + index + 1;
    }
    this.image.emit({ page: page, data: item });
    if (this.selected === item) {
      e.stopPropagation();
    }
  }
}
