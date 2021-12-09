import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { ToastrService } from 'ngx-toastr';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { TreeServiceEnum } from 'src/app/enum/tree-service.enum';
import { TreeSelectEnum } from 'src/app/enum/tree-select.enum';
import { Division } from 'src/app/network/model/division.model';
import { DivisionManageModel } from 'src/app/view-model/division-manange.model';
import { FlatTreeNode } from 'src/app/view-model/flat-tree-node.model';
import { DivisionManageBusiness } from './division-manage.business';
import { TreeComponent } from 'src/app/common/components/tree/tree.component';
import { TreeConverter } from 'src/app/converter/tree.converter';
import { UserResource } from 'src/app/network/model/user.model';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { EnumHelper } from 'src/app/enum/enum-helper';

@Component({
  templateUrl: './division-manage.component.html',
  styleUrls: ['division-manage.component.less'],
  providers: [DivisionManageBusiness],
})
export class DivisionManageComponent implements OnInit {
  private _condition: string | Symbol = Symbol.for('DIVISION-TREE');
  // 要屏蔽的搜索字符串
  private _searchGuards: string[] = ['街道', '路居委会'];

  /**
   *  屏蔽: 街,街道,道,居,居委,居委会,委,委会,会
   */
  private _excludeGuards: string[] = [];

  /*****public ********/
  treeServiceProvider = TreeServiceEnum.Station;
  treeSelectModel = TreeSelectEnum.Single;
  currentNode?: FlatTreeNode;
  type: UserResourceType = UserResourceType.None;

  get enableAddBtn() {
    return (
      !this.currentNode ||
      this.currentNode?.type == UserResourceType.City ||
      this.currentNode?.type == UserResourceType.County
    );
  }
  get enableDelBtn() {
    return (
      !!this.currentNode &&
      this.currentNode.type != UserResourceType.None &&
      this.currentNode.type != UserResourceType.Station
    );
  }

  get enableEditBtn() {
    return (
      !!this.currentNode &&
      this.currentNode.type != UserResourceType.None &&
      this.currentNode.type != UserResourceType.Station
    );
  }

  @ViewChild('tree') tree?: TreeComponent;

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
      let parentId = this.currentNode ? this.currentNode.id : '';
      let res = await this._business.addDivision(parentId, model);
      if (res) {
        this._toastrService.success('添加成功');
        const node = this._converter.fromDivisionManage(model);
        node.parentId = parentId;
        node.type = EnumHelper.ConvertDivisionToUserResource(res.DivisionType);
        this.tree.addNode(node);
      }
    }
  }
  async deleteNode() {
    if (this.tree) {
      if (this.currentNode?.id) {
        let res = await this._business.deleteDivision(this.currentNode?.id);
        if (res) {
          this._toastrService.success('删除成功');

          this.tree?.deleteNode(this.currentNode?.id);
        }
      }
    }
  }
  async editNode() {
    if (this.tree) {
      if (this.currentNode?.id) {
        let model = new DivisionManageModel();
        model.id = this.currentNode?.id;
        model.name = 'test';
        model.description = 'modify';
        let res = await this._business.editDivision(
          this.currentNode?.id,
          model
        );
        if (res) {
          this._toastrService.success('编辑成功');

          const node = this._converter.fromDivisionManage(model);
          this.tree.editNode(node);
        }
      }
    }
  }
  async searchNode(condition: string) {
    if (condition == '' && this._condition == Symbol.for('DIVISION-TREE')) {
      this._toastrService.warning('输入内容再搜索');
      return;
    }
    if (this._condition == condition) {
      this._toastrService.warning('重复搜索相同字段');
      return;
    }
    if (this._excludeGuards.includes(condition)) {
      this._toastrService.warning('关键字不能是: ' + condition);
      return;
    }

    this._condition = condition;

    if (this.tree) {
      let res = await this.tree.searchNode(condition);
      if (res && res.length) {
        this._toastrService.success('操作成功');
      } else {
        this._toastrService.warning('无匹配结果');
      }
    }
  }

  selectTree(nodes: FlatTreeNode[]) {
    this.currentNode = nodes[0];
    console.log('nodes', nodes);
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
