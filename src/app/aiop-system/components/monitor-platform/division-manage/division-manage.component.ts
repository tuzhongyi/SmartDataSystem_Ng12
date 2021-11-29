import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { ToastrService } from 'ngx-toastr';
import { DivisionTreeComponent } from 'src/app/common/components/division-tree/division-tree.component';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { Division } from 'src/app/network/model/division.model';
import { DivisionManageModel } from 'src/app/view-model/division-manange.model';
import { FlatTreeNode } from 'src/app/view-model/flat-tree-node.model';
import { DivisionManageBusiness } from './division-manage.business';

@Component({
  templateUrl: './division-manage.component.html',
  styleUrls: ['division-manage.component.less'],
  providers: [DivisionManageBusiness],
})
export class DivisionManageComponent implements OnInit {
  private _selectedId: string = '';

  @ViewChild('tree') tree?: DivisionTreeComponent;

  constructor(
    private _business: DivisionManageBusiness,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  async addNode() {
    if (this.tree) {
      // 视图数据
      let id = (Math.random() * 9999) >> 0;
      let name = id + 'test';
      let des = '';

      let divisionManageModel = new DivisionManageModel(id + '', name, des);

      let res = await this._business.addDivision(
        this._selectedId,
        divisionManageModel
      );
      if (res) {
        this._toastrService.success('添加成功');
        this.tree.addNode(divisionManageModel);
      }
    }
  }
  async deleteNode() {
    if (this.tree) {
      if (this._selectedId) {
        let res = await this._business.deleteDivision(this._selectedId);
        if (res) {
          this._toastrService.success('删除成功');
          this.tree.deleteNode();
        }
      }
    }
  }
  async editNode() {
    if (this.tree) {
      let divisionManageModel = new DivisionManageModel();
      divisionManageModel.name = 'modify';
      divisionManageModel.description = 'modify';

      if (this._selectedId) {
        let res = await this._business.editDivision(
          this._selectedId,
          divisionManageModel
        );
        if (res) {
          this._toastrService.success('编辑成功');
          this.tree.editNode(divisionManageModel);
        }
      }
    }
  }
  async searchNode(condition: string) {
    if (this.tree) {
      let res = await this.tree.searchNode(condition);
      console.log(res);
      if (res) {
        this._toastrService[res.type](res.msg);
      }
    }
  }
  selectNodeHandler(id: string) {
    this._selectedId = id;
  }
}
