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
import { AICameraEventsModel } from 'src/app/view-model/ai-camera-events.model';
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

  // Table
  dataSubject = new BehaviorSubject<AICameraEventsModel[]>([]);
  selectStrategy = SelectStrategy.Single;
  columnModel: TableColumnModel[] = [...AICameraEventsConf]; // 表格列配置详情
  displayedColumns: string[] = this.columnModel.map((model) => model.columnDef); // 表格列 id
  tableOperates: TableOperateModel[] = []
  aiModels: CameraAIModel[] = [];
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

  // 表单
  state = FormState.none;
  platformId = '';

  // 搜索
  disableSearch = false;
  showFilter = false;
  placeHolder = '搜索设备名称'
  condition = '';
  dateFormat: string = 'yyyy年MM月dd日';
  today = new Date();
  beginTime = Time.beginTime(this.today)
  endTime = Time.endTime(this.today);

  eventTypes = [
    EventType.IllegalDrop,
    EventType.MixedInto,
    EventType.GarbageVolume,
  ]
  eventType = EventType.None;
  Language = Language;
  modelName = '';

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
    let res = await this._business.init(this.condition, this.beginTime, this.endTime, this.eventType, this.modelName, this.pageIndex, this._pageSize);


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
  showFilterHandler() {

    this.disableSearch = this.showFilter = !this.showFilter;

    this.beginTime = this.today;
    this.endTime = this.today
    this.eventType = EventType.None;
    this.modelName = '';
  }
  changeBegin(date: Date) {
    this.beginTime = date;
  }
  changeEnd(date: Date) {
    this.endTime = date;
  }


  private _clickPlay(row: AICameraEventsModel) {
    console.log(row)
  }

}
