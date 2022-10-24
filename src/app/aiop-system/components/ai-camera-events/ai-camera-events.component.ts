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
} from 'src/app/view-model/ai-camera-events.model';
import { AICameraEventsBusiness } from './ai-camera-events.business';
import { ViewMode } from 'src/app/enum/view-mode.enum';
@Component({
  selector: 'howell-ai-camera-events',
  templateUrl: './ai-camera-events.component.html',
  styleUrls: ['./ai-camera-events.component.less'],
  providers: [AICameraEventsBusiness],
})
export class AICameraEventsComponent implements OnInit, AfterViewInit {
  Language = Language;
  ViewMode = ViewMode;

  aiModels: CameraAIModel[] = [];
  dataSource: AICameraEventsModel[] = [];
  widths = ['10%', '10%', '10%', '10%', '15%', '10%', '5%'];
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
  disableSearch = false;
  dateFormat: string = 'yyyy年MM月dd日';
  today = new Date();

  eventTypes = [
    EventType.IllegalDrop,
    EventType.MixedInto,
    EventType.GarbageVolume,
  ];
  eventType = EventType.None;

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
  ) {}

  async ngOnInit() {
    this.aiModels = await this._business.listAIModels();
    this._init();
  }
  private async _init() {
    this.dataSource = [];

    let res = await this._business.init(this.searchInfo);

    this.page = res.Page;

    // console.log(res);
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
    this.disableSearch = this.searchInfo.Filter = !this.searchInfo.Filter;
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
