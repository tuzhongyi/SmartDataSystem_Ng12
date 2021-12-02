import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { ToastrService } from 'ngx-toastr';
import { DivisionTreeComponent } from 'src/app/common/components/division-tree/division-tree.component';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { TreeServiceEnum } from 'src/app/enum/tree-service.enum';
import { TreeSelectEnum } from 'src/app/enum/tree-select.enum';
import { Division } from 'src/app/network/model/division.model';
import { DivisionManageModel } from 'src/app/view-model/division-manange.model';
import { FlatTreeNode } from 'src/app/view-model/flat-tree-node.model';
import { DivisionManageBusiness } from './division-manage.business';
import { TreeComponent } from 'src/app/common/components/tree/tree.component';
import { TreeConverter } from 'src/app/converter/tree.converter';

@Component({
  templateUrl: './division-manage.component.html',
  styleUrls: ['division-manage.component.less'],
  providers: [DivisionManageBusiness],
})
export class DivisionManageComponent implements OnInit {
  private _selectedId: string = '';

  @ViewChild('tree') tree?: TreeComponent;

  private _condition: string | Symbol = Symbol.for('DIVISION-TREE');
  // 要屏蔽的搜索字符串
  private _searchGuards: string[] = ['街道', '路居委会'];

  /**
   *  屏蔽: 街,街道,道,居,居委,居委会,委,委会,会
   */
  private _excludeGuards: string[] = [];

  /*****public ********/
  treeServiceProvider = TreeServiceEnum.Division;

  treeSelectModel = TreeSelectEnum.Single;

  constructor(
    private _business: DivisionManageBusiness,
    private _toastrService: ToastrService,
    private _converter: TreeConverter
  ) {
    this._searchGuards.reduce((previous, current) => {
      previous.push(...this._generateExclude(current));
      return previous;
    }, this._excludeGuards);
  }

  ngOnInit(): void {}

  async addNode() {
    if (this.tree) {
      // 视图数据
      let id = (Math.random() * 9999) >> 0;
      let name = id + 'test';
      let des = '';

      let model = new DivisionManageModel(id + '', name, des);

      let res = await this._business.addDivision(this._selectedId, model);
      if (res) {
        this._toastrService.success('添加成功');

        const node = this._converter.fromDivisionManage(model);
        node.parentId = this._selectedId;

        this.tree?.addNode(node);
      }
    }
  }
  async deleteNode() {
    if (this.tree) {
      if (this._selectedId) {
        let res = await this._business.deleteDivision(this._selectedId);
        if (res) {
          this._toastrService.success('删除成功');
          this.tree?.deleteNode(this._selectedId);
        }
      }
    }
  }
  async editNode() {
    if (this.tree) {
      if (this._selectedId) {
        let model = new DivisionManageModel();
        model.id = this._selectedId;
        model.name = 'test';
        model.description = 'modify';
        let res = await this._business.editDivision(this._selectedId, model);
        if (res) {
          this._toastrService.success('编辑成功');

          const node = this._converter.fromDivisionManage(model);

          // this.tree.editNode(divisionManageModel);
          this.tree?.editNode(node);
        }
      }
    }
  }
  async searchNode(condition: string) {
    if (condition == '' && this._condition == Symbol.for('DIVISION-TREE')) {
      this._toastrService.warning('输入内容再搜索');
      // return new SearchedTreeModel('warning', '输入内容再搜索');
      return;
    }
    if (this._condition == condition) {
      this._toastrService.warning('重复搜索相同字段');
      return;
    }
    if (this._excludeGuards.includes(condition)) {
      this._toastrService.warning('关键字不能是: ' + condition);
    }

    this._condition = condition;

    if (this.tree) {
      let res = await this.tree.searchNode(condition);
      console.log(res);
      if (res.length) {
        this._toastrService.success('操作成功');
      } else {
        this._toastrService.warning('无匹配结果');
      }
    }
  }

  selectTree(ids: string[]) {
    this._selectedId = ids[0];
  }

  private _generateExclude(condition: string) {
    let res: string[] = [];
    for (let i = 0; i < condition.length; i++) {
      let len = condition.length - i;
      let temp = '';
      for (let j = 0; j < len; j++) {
        temp += condition[i + j];
        res.push(temp);
      }
    }

    return res;
  }
}
