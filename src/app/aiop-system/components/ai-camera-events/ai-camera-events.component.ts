import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { PaginatorComponent } from 'src/app/common/components/paginator/paginator.component';
import { TableComponent } from 'src/app/common/components/table/table.component';
import { FormState } from 'src/app/enum/form-state.enum';
import { SelectEnum } from 'src/app/enum/select.enum';
import { TableSelectStateEnum } from 'src/app/enum/table-select-state.enum';
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
  private _condition = '';

  // Table
  dataSubject = new BehaviorSubject<AICameraEventsModel[]>([]);
  tableSelectModel = SelectEnum.Multiple;
  columnModel: TableColumnModel[] = [...AICameraEventsConf]; // 表格列配置详情
  displayedColumns: string[] = this.columnModel.map((model) => model.columnDef); // 表格列 id
  tableOperates: TableOperateModel[] = []
  aiModels: CameraAIModel[] = [];

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


  get enableDelBtn() {
    return !!this.selectedRows.length
  }

  @ViewChild(TableComponent) table?: TableComponent;
  @ViewChild(PaginatorComponent) paginator?: PaginatorComponent;


  constructor(private _business: AICameraEventsBusiness, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this._init();
  }
  private async _init() {
    this.aiModels = await this._business.listAIModels();
    let res = await this._business.init();
    console.log(res)

    this.page = res.Page;
    this.dataSubject.next(res.Data);
  }

  async searchEvent(condition: string) {
    this._condition = condition;
    this._business.search();
  }


  selectTableRow(rows: AICameraEventsModel[]) {
    this.selectedRows = rows;
  }
  tableSelectEvent(type: TableSelectStateEnum) {
    if (this.table) {
      switch (type) {
        case TableSelectStateEnum.All:
          this.table.selectAll();
          break;
        case TableSelectStateEnum.Reverse:
          this.table.selectReverse();
          break;
        case TableSelectStateEnum.Cancel:
          this.table.selectCancel();
          break;
        default:
          throw new TypeError('类型错误');
      }
    }
  }
  pageEvent(pageInfo: PageEvent) {
    if (this.pageIndex == pageInfo.pageIndex + 1) return;
    this.pageIndex = pageInfo.pageIndex + 1;
    this._init();
  }


}
