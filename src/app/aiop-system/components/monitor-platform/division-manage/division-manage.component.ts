import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { DivisionTree2Component } from 'src/app/common/components/division-tree2/division-tree2.component';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { DivisionManageModel } from 'src/app/view-model/division-manange.model';
import { DivisionManageBusiness } from './division-manage.business';

@Component({
  templateUrl: './division-manage.component.html',
  styleUrls: ['division-manage.component.less'],
  providers: [DivisionManageBusiness],
})
export class DivisionManageComponent implements OnInit {
  @ViewChild('tree') tree?: DivisionTree2Component;

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
  searchNode(condition: string) {
    if (this.tree) {
      this.tree.searchNode(condition);
    }
  }
}
