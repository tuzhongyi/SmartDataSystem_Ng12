import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PaginatorComponent } from 'src/app/common/components/paginator/paginator.component';
import { TableComponent } from 'src/app/common/components/table/table.component';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { FormState } from 'src/app/enum/form-state.enum';
import { SelectEnum } from 'src/app/enum/select.enum';
import { Page } from 'src/app/network/model/page_list.model';
import { CameraAIUrl } from 'src/app/network/url/aiop/Events/Records/CameraAI/camera-ai.url';
import { AIModelManageModel } from 'src/app/view-model/ai-model-manage.model';
import { ConfirmDialogModel } from 'src/app/view-model/confirm-dialog.model';
import {
  TableColumnModel,
  TableOperateModel,
} from 'src/app/view-model/table.model';
import { AIModelManageBusiness } from './ai-model-manage.business';
import { AIModelManageConf } from './ai-model-manage.config';

@Component({
  selector: 'howell-ai-model-manage',
  templateUrl: './ai-model-manage.component.html',
  styleUrls: ['./ai-model-manage.component.less'],
  providers: [AIModelManageBusiness],
})
export class AIModelManageComponent implements OnInit {
  private _pageSize = 9;
  private _condition = '';

  dataSubject = new BehaviorSubject<AIModelManageModel[]>([]);
  tableSelectModel = SelectEnum.Multiple;
  columnModel: TableColumnModel[] = [...AIModelManageConf]; // 表格列配置详情
  displayedColumns: string[] = this.columnModel.map((model) => model.columnDef); // 表格列 id
  page: Page | null = null;
  pagerCount: number = 4;
  pageIndex = 1;
  selectedRows: AIModelManageModel[] = []; //table选中项
  willBeDeleted: AIModelManageModel[] = [];
  showDialog = false;
  showConfirm = false;
  dialogModel = new ConfirmDialogModel('确认删除', '删除该项');
  tableOperates: TableOperateModel[] = [];
  state = FormState.none;

  AIModelId = '';

  get enableDelBtn() {
    return true;
  }

  @ViewChild(TableComponent) table?: TableComponent;
  @ViewChild(PaginatorComponent) paginator?: PaginatorComponent;

  constructor(private _business: AIModelManageBusiness) {
    this.tableOperates.push(
      new TableOperateModel(
        'edit',
        ['howell-icon-modification', 'operate-icon'],
        '编辑',
        this._clickEditBtn.bind(this)
      ),
      new TableOperateModel(
        'delete',
        ['howell-icon-delete-bin', 'operate-icon'],
        '删除',
        this._clickDelBtn.bind(this)
      )
    );
  }

  ngOnInit(): void {
    this._init();
  }

  private async _init() {
    let res = await this._business.init();
    this.page = res.Page;
    this.dataSubject.next(res.Data);

  }



  addBtnClick() { }
  deleteBtnClick() { }

  async searchEvent(condition: string) { }

  private _clickEditBtn() { }
  private _clickDelBtn() { }
}
