import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
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
  implements
    IComponent<IModel, PagedList<EventRecordViewModel>>,
    OnInit,
    OnChanges
{
  @Input()
  business: IBusiness<IModel, PagedList<EventRecordViewModel>>;

  width = ['15%', '15%', '15%', '12%', '15%', '18%'];

  loading = false;

  begin: Date = new Date();
  end: Date = new Date();

  private _filter?: EventRecordFilter;
  public get filter(): EventRecordFilter {
    if (!this._filter) {
      this.filter = new EventRecordFilter(this.begin, this.end);
    }
    return this._filter!;
  }
  @Input()
  public set filter(v: EventRecordFilter) {
    this._filter = v;
  }

  private _search?: EventEmitter<EventRecordFilter>;
  public get search(): EventEmitter<EventRecordFilter> | undefined {
    return this._search;
  }
  @Input()
  public set search(v: EventEmitter<EventRecordFilter> | undefined) {
    this._search = v;
    if (this._search) {
      this._search.subscribe((x) => {
        this.filter = x;
        this.loadData(1, this.pageSize, false).then((x) => {
          if (this.page && this.page.PageCount > 1) {
            this.loadData(this.page.PageCount, this.pageSize);
          }
        });
      });
    }
  }

  page?: Page;

  getPaged(count: number, size: number): Page {
    let current = size % count;
    if (current === 0) {
      current = size;
    }

    let page = {
      PageSize: size,
      PageCount: Math.ceil(count / size),
      PageIndex: Math.ceil(count / size),
      RecordCount: current,
      TotalRecordCount: count,
    };
    return page;
  }

  datas?: EventRecordViewModel[];

  @Input()
  count: number = 0;

  @Input()
  type: EventType = EventType.IllegalDrop;

  pageSize = 9;

  constructor(
    business: EventRecordBusiness,
    private download: DownloadBusiness,
    public panel: VideoDownloadPanelBusiness
  ) {
    this.business = business;
    let now = new Date();
    this.begin = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);

    if (changes.count && changes.count.firstChange) {
      this.page = this.getPaged(this.count, this.pageSize);
      if (this.page) {
        this.loadData(this.page.PageCount, this.pageSize);
      }
    }
  }

  async ngOnInit() {}

  async pageEvent(page: PageEvent) {
    this.loadData(page.pageIndex + 1, this.pageSize);
  }

  loadData(index: number, size: number, show = true) {
    let params = new PagedParams();
    params.PageSize = size;
    params.PageIndex = index;

    let promise = this.business.load(this.type, params, this.filter);
    this.loading = true;
    promise.then((paged) => {
      this.loading = false;
      this.page = paged.Page;
      if (show) {
        this.datas = paged.Data;
      }
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
    this.download.image(
      model.imageSrc,
      model.ResourceName ?? '',
      model.EventTime
    );
  }
  playvideo(model: EventRecordViewModel) {}
}
