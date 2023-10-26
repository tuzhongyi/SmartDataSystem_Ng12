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
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { DownloadBusiness } from 'src/app/common/business/download.business';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { EventType } from 'src/app/enum/event-type.enum';
import { GarbageFullEventData } from 'src/app/network/model/garbage-station/garbage-event-record.model';
import { IModel, PagedArgs } from 'src/app/network/model/model.interface';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { ImageControlModel } from '../../../../../view-model/image-control.model';
import { EventRecordCardModel } from '../../../cards/event-record-card/event-record-card.model';
import { ListAbstractComponent } from '../../table-abstract.component';
import { EventRecordBusiness } from '../event-record.business';
import {
  EventRecordConverter,
  EventRecordPagedConverter,
} from '../event-record.converter';
import { EventRecordFilter } from '../event-record.model';
import { VideoDownloadPanelBusiness } from '../video-download-panel.business';
import { EventRecordListConverter } from './event-record-list.converter';

@Component({
  selector: 'howell-event-record-list',
  templateUrl: './event-record-list.component.html',
  styleUrls: ['../../table.less', './event-record-list.component.less'],
  providers: [
    EventRecordBusiness,
    DownloadBusiness,
    VideoDownloadPanelBusiness,
    EventRecordPagedConverter,
    EventRecordConverter,
  ],
})
export class EventRecordListComponent
  extends ListAbstractComponent<EventRecordViewModel, EventRecordCardModel>
  implements
    IComponent<IModel, PagedList<EventRecordViewModel>>,
    OnInit,
    OnChanges
{
  converter = new EventRecordListConverter();

  @Input() type: EventType = EventType.IllegalDrop;
  @Input() load?: EventEmitter<EventRecordFilter>;
  @Input() filter: EventRecordFilter;
  @Output() image: EventEmitter<PagedArgs<EventRecordViewModel>> =
    new EventEmitter();
  @Output() video: EventEmitter<EventRecordViewModel> = new EventEmitter();

  constructor(
    public business: EventRecordBusiness,
    private download: DownloadBusiness,
    public panel: VideoDownloadPanelBusiness
  ) {
    super();
    this.business = business;
    this.filter = new EventRecordFilter();
  }

  widths: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.load && changes.load.firstChange && this.load) {
      this.load.subscribe((x) => {
        if (x) {
          this.filter = x;
        }
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

  loadData(index: number, size: number, filter: EventRecordFilter) {
    let params = new PagedParams();
    params.PageSize = size;
    params.PageIndex = index;

    let promise = this.business.load(this.type, params, filter);
    this.loading = true;
    promise.then(async (paged) => {
      this.loading = false;
      this.page = paged.Page;

      this.datas = paged.Data;
      this.list = await this.converter.Convert(this.datas, {
        division: (id: string) => {
          return this.business.getDivision(id);
        },
        img: (id: string) => {
          return this.business.getImage(id);
        },
      });
    });
    return promise;
  }

  downloadVideo(model: EventRecordViewModel) {
    // if(model.GarbageStation && model.ResourceId)
    // this.download.video(model.GarbageStation.Id, model.ResourceId, {BeginTime:}
    //    )
    this.panel.record = model;
    this.panel.show = true;
  }
  async downloadImage(model: EventRecordViewModel) {
    if (model.images && model.images.length > 0) {
      let src = await model.images[0].src;
      this.download.image(src, model.ResourceName ?? '', model.EventTime);
    }
  }
  playvideo(model: EventRecordViewModel) {
    this.video.emit(model);
  }

  imageClick(item: EventRecordViewModel, img: ImageControlModel) {
    let plain = instanceToPlain(this.page);
    let page = plainToInstance(Page, plain);
    let index = img.index;
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
  }

  onCardPlayVideo(model: EventRecordCardModel) {
    if (model.source) {
      this.playvideo(model.source);
    }
  }
  onCardDownloadImage(model: EventRecordCardModel) {
    if (model.source) {
      this.downloadImage(model.source);
    }
  }
  onCardDownloadVideo(model: EventRecordCardModel) {
    if (model.source) {
      this.downloadVideo(model.source);
    }
  }
  onCardClick(model: EventRecordCardModel) {
    if (model.source) {
      let vm = model.source as EventRecordViewModel;
      if (vm.images && vm.images.length > 0) {
        this.imageClick(model.source, vm.images[0]);
      }
    }
  }
}
