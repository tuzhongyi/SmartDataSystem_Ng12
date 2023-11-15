import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import {
  EncodeDeviceManageModel,
  EncodeDeviceManageSearchInfo,
} from 'src/app/aiop-system/components/encode-device-manage/encode-device-manage.model';
import { FormState } from 'src/app/enum/form-state.enum';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { TableSelectType } from 'src/app/enum/table-select-type.enum';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { EncodeDeviceManageBusiness } from './encode-device-manage.business';
import { EncodeDeviceManageTableConfig } from './encode-device-manage.config';
import { EncodeDeviceManageWindow } from './encode-device-manage.window';

@Component({
  selector: 'howell-encode-device-manage',
  templateUrl: './encode-device-manage.component.html',
  styleUrls: [
    '../../../../assets/less/confirm.less',
    './encode-device-manage.component.less',
  ],
  providers: [EncodeDeviceManageBusiness],
})
export class EncodeDeviceManageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _business: EncodeDeviceManageBusiness,
    private _toastrService: ToastrService
  ) {}

  table = new EncodeDeviceManageTableConfig();

  SelectStrategy = SelectStrategy;
  //AndLabelIds: ["1bb10bbfa1f546debf5237eeadb57777"]
  searchInfo = new EncodeDeviceManageSearchInfo();

  // 标签筛选器
  selectedNodes: CommonFlatNode[] = [];
  treeSelectStrategy = SelectStrategy.Multiple;

  window = new EncodeDeviceManageWindow();

  ngOnInit(): void {
    this.table.edit.subscribe((x) => {
      this._clickEditBtn(x);
    });
    this.table.labelclick.subscribe((x) => {
      this.window.label.show = true;
      this.window.label.resource = x;
    });
    this.init();
  }
  private async init() {
    let res = await this._business.init(
      this.searchInfo,
      this.table.page.PageIndex,
      this.table.page.PageSize
    );
    // console.log('编码设备', res)
    this.table.page = res.Page;
    this.table.dataSubject.next(res.Data);
  }

  onsearch() {
    this.table.page.PageIndex = 1;
    this.init();
  }
  tableSelect(type: TableSelectType) {
    this.table.select.emit(type);
  }
  pageEvent(pageInfo: PageEvent) {
    if (this.table.page.PageIndex == pageInfo.pageIndex + 1) return;
    this.table.page.PageIndex = pageInfo.pageIndex + 1;
    this.init();
  }

  // 点击树节点
  selectTreeNode(nodes: CommonFlatNode[]) {
    // console.log('外部结果', nodes)
    this.selectedNodes = nodes;
    this.searchInfo.labelIds = this.selectedNodes.map((n) => n.Id);
  }

  closeForm(update: boolean) {
    this.window.operate.show = false;
    this.window.operate.clear();
    if (update) {
      this.init();
    }
  }
  closeBind(update: boolean) {
    this.window.label.show = false;
    this.window.label.clear();
    if (update) {
      this.init();
    }
  }
  toggleFilter() {
    this.searchInfo.filter = !this.searchInfo.filter;
  }
  addBtnClick() {
    this.window.operate.state = FormState.add;
    this.window.operate.show = true;
  }
  deleteBtnClick() {
    this.window.confirm.models = [...this.table.selected];
    this.window.confirm.show = true;
  }

  bindBtnClick() {
    this.window.label.show = true;
    this.window.label.resource = {
      Id: this.table.selected[0]?.Id || '',
      Name: this.table.selected[0]?.Name || '',
    };
  }

  ondelete(rows: EncodeDeviceManageModel[]) {
    this.window.confirm.show = false;
    this.table.delete.emit(rows);
    let all = rows.map((x) => {
      return this._business.deleteEncodeDevice(x.Id);
    });
    Promise.all(all).then((x) => {
      this._toastrService.success('删除成功');

      this.init();
    });
  }

  private _clickEditBtn(row: EncodeDeviceManageModel) {
    this.window.operate.state = FormState.edit;
    this.window.operate.resource = {
      Id: row.Id,
      Name: row.Name,
    };
    this.window.operate.show = true;
  }
}
