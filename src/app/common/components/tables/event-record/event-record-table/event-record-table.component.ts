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
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import {
  ImageControlModel,
  ImageControlModelArray,
} from '../../../../../view-model/image-control.model';
import { TableAbstractComponent } from '../../table-abstract.component';
import { EventRecordBusiness } from '../event-record.business';
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
  type: EventType = EventType.IllegalDrop;
  @Input()
  load?: EventEmitter<EventRecordFilter>;
  @Input()
  filter: EventRecordFilter;
  @Output()
  image: EventEmitter<ImageControlModelArray> = new EventEmitter();
  @Output()
  play: EventEmitter<ImageControlModelArray> = new EventEmitter();
  constructor(
    business: EventRecordBusiness,
    private download: DownloadBusiness,
    public panel: VideoDownloadPanelBusiness
  ) {
    super();
    this.business = business;
    this.filter = new EventRecordFilter();
  }
  width = ['10%', '15%', '15%', '15%', '10%', '15%', '10%', '10%'];
  get zoom() {
    switch (this.type) {
      case EventType.GarbageFull:
      case EventType.MixedInto:
      case EventType.Smoke:
        return false;

      default:
        return true;
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.load && changes.load.firstChange && this.load) {
      this.load.subscribe((x) => {
        if (x) {
          this.filter = x;
        }
        this.loadData(1, this.pageSize, this.filter);
      });
    }
    if (changes.type) {
      switch (this.type) {
        case EventType.IllegalDrop:
          this.width = ['10%', '15%', '15%', '15%', '10%', '15%', '10%', '10%'];
          break;
        case EventType.Smoke:
          this.width = ['15%', '15%', '9%', '9%', '12%', '15%', '15%', '10%'];
          break;
        default:
          break;
      }
    }
  }

  async ngOnInit() {
    this.loadData(1, this.pageSize, this.filter);
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
    array.resourceId = model.ResourceId;
    this.play.emit(array);
  }

  imageClick(item: EventRecordViewModel, img: ImageControlModel) {
    let array = new ImageControlModelArray(item.images, img.index);
    array.resourceId = item.ResourceId;
    this.image.emit(array);
  }
}
