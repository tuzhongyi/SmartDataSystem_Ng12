import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { DivisionTreeComponent } from 'src/app/common/components/division-tree/division-tree.component';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { DivisionManageModel } from 'src/app/view-model/division-manange.model';
import { DivisionManageBusiness } from './division-manage.business';

@Component({
  templateUrl: './division-manage.component.html',
  styleUrls: ['division-manage.component.less'],
  providers: [DivisionManageBusiness],
})
export class DivisionManageComponent implements OnInit {
  @ViewChild('tree') tree?: DivisionTreeComponent;

  ngOnInit(): void {}
  addNode() {
    if (this.tree) {
      // 视图数据
      let id = (Math.random() * 9999) >> 0;
      let name = id + 'test';
      let des = '';

      let divisionManageModel = new DivisionManageModel(id + '', name, des);

      this.tree.addNode(divisionManageModel);
    }
  }
  deleteNode() {
    if (this.tree) {
      this.tree.deleteNode();
    }
  }
  editNode() {
    if (this.tree) {
      let divisionManageModel = new DivisionManageModel();
      divisionManageModel.name = 'modify';
      divisionManageModel.description = 'modify';

      this.tree.editNode(divisionManageModel);
    }
  }
  searchNode() {
    if (this.tree) {
      let condition = '长寿路';
      this.tree.searchNode(condition);
    }
  }
}
