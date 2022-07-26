import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { PaginatorComponent } from 'src/app/common/components/paginator/paginator.component';
import { CommonTableComponent } from 'src/app/common/components/common-table/common.component';
import { Language } from 'src/app/common/tools/language';
import { Time } from 'src/app/common/tools/time';
import { EventType } from 'src/app/enum/event-type.enum';
import { FormState } from 'src/app/enum/form-state.enum';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { CameraAIModel } from 'src/app/network/model/camera-ai.model';
import { Page } from 'src/app/network/model/page_list.model';
import { AICameraEventsModel, AICameraEventsSearchInfo } from 'src/app/view-model/ai-camera-events.model';
import { ConfirmDialogModel } from 'src/app/view-model/confirm-dialog.model';
import { TableColumnModel, TableOperateModel } from 'src/app/view-model/table.model';
import { AICameraEventsBusiness } from './ai-camera-events.business';
import { AICameraEventsConf } from './ai-camera-events.config';
@Component({
  selector: 'howell-ai-camera-events',
  templateUrl: './ai-camera-events.component.html',
  styleUrls: ['./ai-camera-events.component.less'],
  providers: [
    AICameraEventsBusiness
  ]
})
export class AICameraEventsComponent implements OnInit {

  /**private */
  private _pageSize = 9;

  aiModels: CameraAIModel[] = [];

  // Table
  dataSubject = new BehaviorSubject<AICameraEventsModel[]>([]);
  selectStrategy = SelectStrategy.Single;
  columnModel: TableColumnModel[] = [...AICameraEventsConf]; // 表格列配置详情
  displayedColumns: string[] = this.columnModel.map((model) => model.columnDef); // 表格列 id
  tableOperates: TableOperateModel[] = []
  zoomIn = true;

  selectedRows: AICameraEventsModel[] = [];//table选中项
  willBeDeleted: AICameraEventsModel[] = [];

  // Paginator
  page: Page | null = null;
  pagerCount: number = 4;
  pageIndex = 1;


  // 对话框
  showDialog = false;
  showConfirm = false;
  dialogModel = new ConfirmDialogModel('确认删除', '删除该项');


  // 搜索
  disableSearch = false;
  dateFormat: string = 'yyyy年MM月dd日';
  today = new Date();

  eventTypes = [
    EventType.IllegalDrop,
    EventType.MixedInto,
    EventType.GarbageVolume,
  ]
  eventType = EventType.None;
  Language = Language;
  modelName = '';

  searchInfo: AICameraEventsSearchInfo = {
    Condition: '',
    BeginTime: Time.beginTime(this.today),
    EndTime: Time.endTime(this.today),
    EventType: EventType.None,
    ModelName: '',
    Filter: false,
  }

  @ViewChild(CommonTableComponent) table?: CommonTableComponent;
  @ViewChild(PaginatorComponent) paginator?: PaginatorComponent;


  constructor(private _business: AICameraEventsBusiness, private _toastrService: ToastrService) {
    this.tableOperates.push(
      new TableOperateModel(
        'play',
        ['howell-icon-video'],
        '视频',
        this._clickPlay.bind(this)
      ),

    );
  }

  async ngOnInit() {
    this.aiModels = await this._business.listAIModels();
    this._init();
  }
  private async _init() {
    let res = await this._business.init(this.searchInfo, this.pageIndex, this._pageSize);


    this.page = res.Page;
    this.dataSubject.next(res.Data);
  }

  async search() {
    this.pageIndex = 1;
    this._init();
  }


  selectTableRow(rows: AICameraEventsModel[]) {
    this.selectedRows = rows;
  }

  pageEvent(pageInfo: PageEvent) {
    if (this.pageIndex == pageInfo.pageIndex + 1) return;
    this.pageIndex = pageInfo.pageIndex + 1;
    this._init();
  }
  toggleFilterHandler() {

    this.disableSearch = this.searchInfo.Filter = !this.searchInfo.Filter;
    if (!this.searchInfo.Filter) {
      this.searchInfo.BeginTime = Time.beginTime(this.today);
      this.searchInfo.EndTime = Time.endTime(this.today);
      this.searchInfo.EventType = EventType.None;
      this.searchInfo.ModelName = ''
    }
  }
  changeBegin(date: Date) {
    this.searchInfo.BeginTime = date;
  }
  changeEnd(date: Date) {
    this.searchInfo.EndTime = date;
  }


  private _clickPlay(row: AICameraEventsModel) {
    console.log(row)
  }

}
