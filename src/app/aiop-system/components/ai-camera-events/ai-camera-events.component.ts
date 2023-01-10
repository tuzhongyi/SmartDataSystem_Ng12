import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { PaginatorComponent } from 'src/app/common/components/paginator/paginator.component';
import { CommonTableComponent } from 'src/app/common/components/common-table/common.component';
import { Language } from 'src/app/common/tools/language';
import { Time } from 'src/app/common/tools/time';
import { EventType } from 'src/app/enum/event-type.enum';
import { CameraAIModel } from 'src/app/network/model/camera-ai.model';
import { Page } from 'src/app/network/model/page_list.model';
import {
  AICameraEventsModel,
  AICameraEventsSearchInfo,
} from 'src/app/aiop-system/components/ai-camera-events/ai-camera-events.model';
import { AICameraEventsBusiness } from './ai-camera-events.business';
import { ViewMode } from 'src/app/enum/view-mode.enum';
import { AICameraEventsConverter } from './ai-camera-events.converter';
import { KeyValue } from '@angular/common';
import { VideoListArgs } from 'src/app/network/model/args/video-list.args';
import { PlayMode } from 'src/app/common/components/video-player/video.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { VideoControlConverter } from 'src/app/converter/video-control.converter';
@Component({
  selector: 'howell-ai-camera-events',
  templateUrl: './ai-camera-events.component.html',
  styleUrls: ['./ai-camera-events.component.less'],
  providers: [AICameraEventsBusiness, AICameraEventsConverter],
})
export class AICameraEventsComponent implements OnInit, AfterViewInit {
  Language = Language;
  ViewMode = ViewMode;
  EventType = EventType;
  windowModel = new WindowViewModel();

  widths = ['10%', '15%', '10%', '10%', '10%', '10%', '5%'];

  aiModels: CameraAIModel[] = [];
  dataSource: AICameraEventsModel[] = [];
  viewMode = ViewMode.table;
  template?: TemplateRef<HTMLElement>;

  showMode = false;

  page: Page = {
    PageIndex: 0,
    PageSize: 0,
    RecordCount: 0,
    TotalRecordCount: 0,
    PageCount: 0,
  };

  pagerCount: number = 4;

  // 搜索
  dateFormat: string = 'yyyy年MM月dd日';

  selectDataSource = new Map<EventType, string>([
    [EventType.IllegalDrop, Language.EventType(EventType.IllegalDrop)],
    [EventType.MixedInto, Language.EventType(EventType.MixedInto)],
    [EventType.GarbageVolume, Language.EventType(EventType.GarbageVolume)],
  ]);
  customCompare = (
    keyValueA: KeyValue<number, string>,
    keyValueB: KeyValue<number, string>
  ): number => {
    return (keyValueA.key - keyValueB.key) * -1;
  };

  today = new Date();
  searchInfo: AICameraEventsSearchInfo = {
    Condition: '',
    BeginTime: Time.beginTime(this.today),
    EndTime: Time.endTime(this.today),
    EventType: EventType.None,
    ModelName: '',
    Filter: false,
    PageIndex: 1,
    PageSize: 9,
  };

  @ViewChild(CommonTableComponent) table?: CommonTableComponent;
  @ViewChild(PaginatorComponent) paginator?: PaginatorComponent;

  @ViewChild('tableTemplate') tableTemplate?: TemplateRef<HTMLElement>;
  @ViewChild('cardTemplate') cardTemplate?: TemplateRef<HTMLElement>;

  constructor(
    private _business: AICameraEventsBusiness,
    private _toastrService: ToastrService
  ) {
    this.windowModel.show = true;
  }

  async ngOnInit() {
    let { Data } = await this._business.listAIModels();
    this.aiModels = Data;
    this._init();
  }
  private async _init() {
    let res = await this._business.init(this.searchInfo);

    this.page = res.Page;

    this.dataSource = res.Data;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._render();
    }, 0);
  }
  async search() {
    this.searchInfo.PageIndex = 1;
    this._init();
  }

  pageEvent(pageInfo: PageEvent) {
    if (this.searchInfo.PageIndex == pageInfo.pageIndex + 1) return;
    this.searchInfo.PageIndex = pageInfo.pageIndex + 1;
    this._init();
  }
  toggleFilterHandler() {
    this.searchInfo.Filter = !this.searchInfo.Filter;
    if (!this.searchInfo.Filter) {
      this.searchInfo.BeginTime = Time.beginTime(this.today);
      this.searchInfo.EndTime = Time.endTime(this.today);
      this.searchInfo.EventType = EventType.None;
      this.searchInfo.ModelName = '';
    }
  }
  changeBegin(date: Date) {
    this.searchInfo.BeginTime = date;
  }
  changeEnd(date: Date) {
    this.searchInfo.EndTime = date;
  }
  changeViewMode(viewMode: ViewMode) {
    console.log(viewMode);
    this.viewMode = viewMode;
    this.showMode = false;
    if (viewMode == ViewMode.table) {
      this.searchInfo.PageIndex = 1;
      this.searchInfo.PageSize = 9;
    } else if (viewMode == ViewMode.card) {
      this.searchInfo.PageIndex = 1;
      this.searchInfo.PageSize = 12;
    }
    this._init();
    this._render();
  }
  async clickVideoIcon(item: AICameraEventsModel) {
    if (item.RawData && item.AICameraId) {
      let camera = await this._business.getAICamera(item.AICameraId);
      console.log(camera);

      let args = new VideoListArgs();
      args.autoplay = true;
      args.cameras = [camera];
      args.mode = PlayMode.vod;
      args.time = item.RawData?.EventTime;
      args.title = item.ResourceName;
      VideoControlConverter;
      //"5bb6f7c353e944c8b51cc5ab5b137b60"
    }
  }
  private _render() {
    if (this.viewMode == ViewMode.table) {
      this.template = this.tableTemplate;
    } else if (this.viewMode == ViewMode.card) {
      this.template = this.cardTemplate;
    }
  }

  private _clickPlay(row: AICameraEventsModel) {
    console.log(row);
  }
}
