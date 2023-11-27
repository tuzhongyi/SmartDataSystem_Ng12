import { KeyValue } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import {
  AICameraEventsModel,
  AICameraEventsSearchInfo,
} from 'src/app/aiop-system/components/ai-camera-events/ai-camera-events.model';
import { CommonTableComponent } from 'src/app/common/components/common-table/common-table.component';
import { PaginatorComponent } from 'src/app/common/components/paginator/paginator.component';
import { PlayMode } from 'src/app/common/components/video-player/video.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { TimeService } from 'src/app/common/service/time.service';
import { Language } from 'src/app/common/tools/language';
import { Medium } from 'src/app/common/tools/medium';
import { EventType } from 'src/app/enum/event-type.enum';
import { ViewMode } from 'src/app/enum/view-mode.enum';
import { VideoArgs } from 'src/app/network/model/args/video.args';
import { CameraAIModel } from 'src/app/network/model/garbage-station/camera-ai.model';
import { Page } from 'src/app/network/model/page_list.model';
import { AICameraEventsBusiness } from './ai-camera-events.business';
import { AICameraEventsConverter } from './ai-camera-events.converter';
@Component({
  selector: 'howell-ai-camera-events',
  templateUrl: './ai-camera-events.component.html',
  styleUrls: ['./ai-camera-events.component.less'],
  providers: [AICameraEventsBusiness, AICameraEventsConverter],
})
export class AICameraEventsComponent implements OnInit, AfterViewInit {
  Language = Language;
  Medium = Medium;
  ViewMode = ViewMode;
  EventType = EventType;

  windowModel = new WindowViewModel();

  widths = ['10%', '20%', '15%', '10%', '15%', '5%'];

  video = new VideoArgs();

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
    BeginTime: TimeService.beginTime(this.today),
    EndTime: TimeService.endTime(this.today),
    EventType: EventType.None,
    ModelName: '',
    Filter: false,
    PageIndex: 1,
    PageSize: 9,
  };

  @ViewChild(CommonTableComponent) table?: CommonTableComponent;

  @ViewChild(PaginatorComponent) paginator?: PaginatorComponent;

  @ViewChild('filterWrapper', { static: true })
  filterWrapper?: ElementRef<HTMLDivElement>;

  @ViewChild('tableTemplate', { static: false })
  tableTemplate?: TemplateRef<HTMLElement>;

  @ViewChild('cardTemplate', { static: false })
  cardTemplate?: TemplateRef<HTMLElement>;

  constructor(
    private _business: AICameraEventsBusiness,
    private renderer: Renderer2
  ) {}

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
    // template 加载完后，再进行一次 change detection
    setTimeout(() => {
      this._render();
    }, 0);
  }
  search() {
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
      // 重置状态
      this.searchInfo.BeginTime = TimeService.beginTime(this.today);
      this.searchInfo.EndTime = TimeService.endTime(this.today);
      this.searchInfo.EventType = EventType.None;
      this.searchInfo.ModelName = '';

      this.renderer.setAttribute(
        this.filterWrapper?.nativeElement,
        'hidden',
        ''
      );
    } else {
      this.renderer.removeAttribute(
        this.filterWrapper?.nativeElement,
        'hidden'
      );
    }
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
  imageError(img: HTMLImageElement) {
    img.src = Medium.default;
  }
  async clickVideoIcon(item: AICameraEventsModel) {
    if (item.RawData && item.AICameraId) {
      let camera = await this._business.getAICamera(item.AICameraId);
      console.log(camera);
      console.log(item.RawData);

      this.video.autoplay = true;
      this.video.cameraId = item.AICameraId;
      this.video.mode = PlayMode.vod;
      this.video.time = item.RawData?.EventTime;
      this.video.title = item.ResourceName;

      this.windowModel.show = true;
    }
  }
  private _render() {
    if (this.viewMode == ViewMode.table) {
      this.template = this.tableTemplate;
    } else if (this.viewMode == ViewMode.card) {
      this.template = this.cardTemplate;
    }
  }
}
