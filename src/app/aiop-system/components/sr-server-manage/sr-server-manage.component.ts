import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PaginatorComponent } from 'src/app/common/components/paginator/paginator.component';
import { TableComponent } from 'src/app/common/components/table/table.component';
import { FormState } from 'src/app/enum/form-state.enum';
import { SelectEnum } from 'src/app/enum/select.enum';
import { TableSelectStateEnum } from 'src/app/enum/table-select-state.enum';
import { Page } from 'src/app/network/model/page_list.model';
import { ConfirmDialogModel } from 'src/app/view-model/confirm-dialog.model';
import { SRServerManageModel } from 'src/app/view-model/sr-server-manage.model';
import { TableCellEvent, TableColumnModel } from 'src/app/view-model/table.model';
import { SRServerManageConf } from './sr-server-manage..config';
import { SRServerManageBusiness } from './sr-server-manage.business';

@Component({
  selector: 'howell-sr-server-manage',
  templateUrl: './sr-server-manage.component.html',
  styleUrls: ['./sr-server-manage.component.less'],
  providers: [
    SRServerManageBusiness
  ]
})
export class SrServerManageComponent implements OnInit {
  /**private */
  private _pageSize = 9;


  dataSource: SRServerManageModel[] = [];
  dataSubject = new BehaviorSubject<SRServerManageModel[]>([]);
  tableSelectModel = SelectEnum.Multiple;
  columnModel: TableColumnModel[] = [...SRServerManageConf]; // 表格列配置详情
  displayedColumns: string[] = this.columnModel.map((model) => model.columnDef); // 表格列 id
  page: Page | null = null;
  pagerCount: number = 4;
  pageIndex = 1;
  selectedRows: SRServerManageModel[] = [];//table选中项
  willBeDeleted: SRServerManageModel[] = [];
  showDialog = false;
  showConfirm = false;
  dialogModel = new ConfirmDialogModel('确认删除', '删除该项');

  state = FormState.none;
  platformId = '';

  get enableDelBtn() {
    return !!this.selectedRows.length
  }


  @ViewChild(TableComponent) table?: TableComponent;
  @ViewChild(PaginatorComponent) paginator?: PaginatorComponent;

  constructor(private _business: SRServerManageBusiness) { }

  ngOnInit(): void {
    this.init();
  }
  async init() {
    let res = await this._business.loadData();


    console.log(res)
    this.dataSubject.next(res)
  }

  selectTableRow(rows: SRServerManageModel[]) {
    this.selectedRows = rows;
  }
  async selectTableCell({ column, row, event }: TableCellEvent) {
    // console.log(column, row, event);
    // // 特殊处理
    if (column.columnDef == 'Operation') {
      let target = event.target as HTMLElement;
      if (target.id == 'sync') {
        console.log('sync')
      } else if (target.id == 'edit') {
        // console.log('edit')
        this.showDialog = true;
        this.state = FormState.edit;
        this.platformId = row.Id;
      } else if (target.id == 'delete') {

        this.willBeDeleted = [row];
        this.showConfirm = true;
        this.dialogModel.content = `删除${this.willBeDeleted.length}个选项?`

      }
    }
  }
  addBtnClick() {

  }
  deleteBtnClick() {

  }
  tableSelect(type: TableSelectStateEnum) {
    console.log(type);
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

}
