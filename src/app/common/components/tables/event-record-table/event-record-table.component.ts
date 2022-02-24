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
import { PagedList } from 'src/app/network/model/page_list.model';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import {
  ImageControlModel,
  ImageControlModelArray,
} from '../../image-control/image-control.model';
import { TableAbstractComponent } from '../table-abstract.component';
import { EventRecordBusiness } from './event-record.business';
import { EventRecordFilter, EventRecordViewModel } from './event-record.model';
import { VideoDownloadPanelBusiness } from './video-download-panel.business';

@Component({
  selector: 'howell-event-record-table',
  templateUrl: './event-record-table.component.html',
  styleUrls: ['../table.less', './event-record-table.component.less'],
  providers: [
    EventRecordBusiness,
    DownloadBusiness,
    VideoDownloadPanelBusiness,
  ],
})
export class EventRecordTableComponent
  extends TableAbstractComponent<EventRecordViewModel>
  implements
    IComponent<IModel, PagedList<EventRecordViewModel>>,
    OnInit,
    OnChanges
{
  @Input()
  business: IBusiness<IModel, PagedList<EventRecordViewModel>>;

  @Input()
  filter: EventRecordFilter;

  @Input()
  type: EventType = EventType.IllegalDrop;

  @Input()
  load?: EventEmitter<EventRecordFilter>;

  width = ['15%', '15%', '15%', '12%', '15%', '18%'];

  constructor(
    business: EventRecordBusiness,
    private download: DownloadBusiness,
    public panel: VideoDownloadPanelBusiness
  ) {
    super();
    this.business = business;

    this.filter = new EventRecordFilter();
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
  downloadImage(model: EventRecordViewModel) {
    if (model.images && model.images.length > 0) {
      this.download.image(
        model.images[0].src,
        model.ResourceName ?? '',
        model.EventTime
      );
    }
  }
  playvideo(model: EventRecordViewModel) {
    let array = new ImageControlModelArray(model.images, 0, true);
    this.image.emit(array);
  }

  @Output()
  image: EventEmitter<ImageControlModelArray> = new EventEmitter();
  imageClick(item: EventRecordViewModel, img: ImageControlModel) {
    let array = new ImageControlModelArray(item.images, img.index);
    this.image.emit(array);
  }
}
