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
import { DownloadBusiness } from 'src/app/common/business/download.business';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { EventType } from 'src/app/enum/event-type.enum';
import { IModel } from 'src/app/network/model/model.interface';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { ImagePaged } from 'src/app/view-model/paged.model';
import {
  ImageControlModel,
  ImageControlModelArray,
} from '../../../../../view-model/image-control.model';
import { PagedTableAbstractComponent } from '../../table-abstract.component';
import { EventRecordBusiness } from '../event-record.business';
import {
  EventRecordConverter,
  EventRecordPagedConverter,
} from '../event-record.converter';
import { EventRecordFilter } from '../event-record.model';
import { VideoDownloadPanelBusiness } from '../video-download-panel.business';

@Component({
  selector: 'howell-event-record-table',
  templateUrl: './event-record-table.component.html',
  styleUrls: ['../../table.less', './event-record-table.component.less'],
  providers: [
    EventRecordBusiness,
    DownloadBusiness,
    VideoDownloadPanelBusiness,
    EventRecordConverter,
    EventRecordPagedConverter,
  ],
})
export class EventRecordTableComponent
  extends PagedTableAbstractComponent<EventRecordViewModel>
  implements
    IComponent<IModel, PagedList<EventRecordViewModel>>,
    OnInit,
    OnChanges
{
  @Input() business: IBusiness<IModel, PagedList<EventRecordViewModel>>;
  @Input() type: EventType = EventType.IllegalDrop;
  @Input() load?: EventEmitter<EventRecordFilter>;
  @Input() filter: EventRecordFilter;
  @Input() get?: EventEmitter<Page>;
  @Output() got: EventEmitter<PagedList<EventRecordViewModel>> =
    new EventEmitter();
  @Output() card: EventEmitter<EventRecordViewModel> = new EventEmitter();
  @Output() image: EventEmitter<
    | ImagePaged<EventRecordViewModel>
    | ImageControlModelArray<EventRecordViewModel>
  > = new EventEmitter();
  @Output() video: EventEmitter<EventRecordViewModel> = new EventEmitter();
  constructor(
    business: EventRecordBusiness,
    private download: DownloadBusiness,
    public panel: VideoDownloadPanelBusiness
  ) {
    super();
    this.business = business;
    this.filter = new EventRecordFilter();
  }
  widths = ['10%', '15%', '15%', '13%', '10%', '15%', '12%', '10%'];
  EventType = EventType;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.load && changes.load.firstChange && this.load) {
      this.load.subscribe((x) => {
        if (x) {
          this.filter = x;
        }
        this.loadData(-1, this.pageSize, this.filter);
      });
    }
    if (changes.get && this.get) {
      this.get.subscribe((page) => {
        let params = new PagedParams();
        params.PageSize = page.PageSize;
        params.PageIndex = page.PageIndex;
        let promise = this.business.load(this.type, params, this.filter);
        promise.then((data) => {
          this.got.emit(data);
        });
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
    promise.then((paged) => {
      this.loading = false;
      this.page = paged.Page;

      this.datas = paged.Data;
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
  oncardrecord(model: EventRecordViewModel) {
    this.card.emit(model);
  }

  playvideo(model: EventRecordViewModel) {
    this.video.emit(model);
  }
  imageClick(
    item: EventRecordViewModel,
    img: ImageControlModel,
    index: number
  ) {
    switch (this.type) {
      case EventType.GarbageFull:
        let array = new ImageControlModelArray<EventRecordViewModel>(
          item.images,
          img.index,
          item
        );
        array.data = item;
        this.image.emit(array);
        break;

      default:
        let paged = new ImagePaged<EventRecordViewModel>();
        let number = this.page.PageSize * (this.page.PageIndex - 1) + index + 1;
        paged.Data = item;
        paged.Page = new Page();
        paged.Page.PageCount = this.page.TotalRecordCount;
        paged.Page.PageIndex = number;
        paged.Page.PageSize = 1;
        paged.Page.RecordCount = 1;
        paged.Page.TotalRecordCount = this.page.TotalRecordCount;
        paged.Image = img;

        this.image.emit(paged);
        break;
    }
  }
}
