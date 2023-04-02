import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject } from 'rxjs';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { Page } from 'src/app/network/model/page_list.model';
import {
  IllegalDropEventModel,
  IllegalDropEventSearchInfo,
} from 'src/app/aiop-system/components/illegal-drop-event/illegal-drop-event.model';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { TimeService } from '../../../common/service/time.service';
import { IllegalDropEventBusiness } from './illegal-drop-event.business';

import { IllegalDropEventConverter } from './illegal-drop-event.converter';
import { ViewMode } from 'src/app/enum/view-mode.enum';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { DivisionTreeSource } from '../../../common/components/division-tree/division-tree.model';
import { Language } from '../../../common/tools/language';
import { EventType } from 'src/app/enum/event-type.enum';
import { SearchConditionKey } from 'src/app/enum/search-condition.enum';
import { KeyValue } from '@angular/common';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { Camera } from 'src/app/network/model/camera.model';
import { DateTimePickerView } from '../../../common/directives/date-time-picker/date-time-picker.directive';
import { DivisionTreeComponent } from '../../../common/components/division-tree/division-tree.component';

@Component({
  selector: 'howell-illegal-drop-event',
  templateUrl: './illegal-drop-event.component.html',
  styleUrls: ['./illegal-drop-event.component.less'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          height: '45px',
          overflow: 'visible',
        })
      ),
      state(
        'close',
        style({
          height: '0',
          overflow: 'hidden',
        })
      ),
      transition('open<=>close', [animate(100)]),
    ]),
  ],
  providers: [IllegalDropEventBusiness, IllegalDropEventConverter],
})
export class IllegalDropEventComponent implements OnInit {
  Language = Language;
  SelectStrategy = SelectStrategy;
  ViewMode = ViewMode;
  EventType = EventType;
  DateTimePickerView = DateTimePickerView;

  dateFormat: string = 'yyyy-MM-dd HH:mm';
  showMode = false;

  widths = ['7%', '13%', '10%', '10%', '10%', '10%', '10%', '5%'];
  dataSource: IllegalDropEventModel[] = [];
  selectedNodes: CommonFlatNode[] = [];

  // 搜索字段名数据源
  searchConditionKeyDataSource: Map<SearchConditionKey, string> = new Map([
    [
      SearchConditionKey.StationName,
      Language.SearchConditionKey(SearchConditionKey.StationName),
    ],
    [
      SearchConditionKey.CommunityName,
      Language.SearchConditionKey(SearchConditionKey.CommunityName),
    ],
  ]);
  customCompare = (
    keyValueA: KeyValue<string, string>,
    keyValueB: KeyValue<string, string>
  ): number => {
    // console.log(keyValueA);

    // 返回0表示按照书写顺序
    return 0;
  };

  // 投放点数据源
  stationDataSource: GarbageStation[] = [];
  cameraDataSource: Camera[] = [];

  page: Page = {
    PageIndex: 0,
    PageSize: 0,
    RecordCount: 0,
    TotalRecordCount: 0,
    PageCount: 0,
  };

  today = new Date();
  searchInfo: IllegalDropEventSearchInfo = {
    Condition: '',
    BeginTime: this._timeService.beginTime(this.today),
    EndTime: this._timeService.endTime(this.today),
    // DivisionIds: ['310109000000', '310110018000', '310109011002'],
    DivisionIds: [], // IllegalDrop事件参数规定不能为空字符串 ""
    StationId: '', //"310109009002001000"
    CameraId: '', //"f13000a3662d462da1bf755f32d526ce"
    Filter: false,
    PageIndex: 1,
    PageSize: 9,
    SearchConditionKey: SearchConditionKey.StationName,
    State: 'close',
  };

  viewMode = ViewMode.table;
  template?: TemplateRef<HTMLElement>;

  @ViewChild('tableTemplate') tableTemplate?: TemplateRef<HTMLElement>;
  @ViewChild('cardTemplate') cardTemplate?: TemplateRef<HTMLElement>;
  @ViewChild(DivisionTreeComponent) divisionTree?: DivisionTreeComponent;

  constructor(
    private _business: IllegalDropEventBusiness,
    private _timeService: TimeService
  ) {}

  async ngOnInit() {
    this._init();
  }
  private async _init() {
    let res = await this._business.init(this.searchInfo);

    // console.log(res);
    this.page = res.Page;

    this.dataSource = res.Data;
  }
  ngAfterViewInit(): void {
    // template 加载完后，需要再进行一次 change detection
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
  async toggleFilterHandler() {
    // 使用 *ngIf="Filter" 会重复渲染 divisionTree,慢
    this.searchInfo.Filter = !this.searchInfo.Filter;

    this.searchInfo.State = this.searchInfo.Filter ? 'open' : 'close';
    if (this.searchInfo.Filter) {
      this._initSelectionDataSource();
    } else {
      // 重置状态
      this.divisionTree?.reset();

      this.divisionTree?.collapseAll();

      this.searchInfo.BeginTime = TimeService.beginTime(this.today);
      this.searchInfo.EndTime = TimeService.endTime(this.today);
      this.searchInfo.DivisionIds = [];
      this.searchInfo.StationId = '';
      this.searchInfo.CameraId = '';
      this.stationDataSource = [];
      this.cameraDataSource = [];
      this.selectedNodes = [];
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

  selectTreeNode(nodes: CommonFlatNode<DivisionTreeSource>[]) {
    console.log('select');
    this.selectedNodes = nodes;

    this.searchInfo.DivisionIds = nodes.map((node) => node.Id);

    this.searchInfo.StationId = '';
    this.searchInfo.CameraId = '';
    this.stationDataSource = [];
    this.cameraDataSource = [];

    this._initSelectionDataSource();
  }

  changeStation(stationId: string) {
    this.searchInfo.CameraId = '';
    this._initCameraDataSource();
  }
  private async _initSelectionDataSource() {
    await this._initStationDataSource();
    this._initCameraDataSource();
  }
  private async _initStationDataSource() {
    let { Data } = await this._business.listTotalStations(this.searchInfo);
    this.stationDataSource = Data;
  }
  private _initCameraDataSource() {
    this.cameraDataSource =
      this.stationDataSource.find(
        (station) => station.Id == this.searchInfo.StationId
      )?.Cameras || [];
  }
  private _render() {
    if (this.viewMode == ViewMode.table) {
      this.template = this.tableTemplate;
    } else if (this.viewMode == ViewMode.card) {
      this.template = this.cardTemplate;
    }
  }
}
