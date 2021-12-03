import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TreeServiceEnum } from 'src/app/enum/tree-service.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { FlatTreeNode } from 'src/app/view-model/flat-tree-node.model';
import { NestedTreeNode } from 'src/app/view-model/nested-tree-node.model';
import { ServiceInterface } from '../interface/service.interface';
import { DivisionTreeService } from './division-tree.service';

@Injectable()
export class StationTreeService implements ServiceInterface {
  dataChange = new BehaviorSubject<NestedTreeNode[]>([]);

  constructor(private _divisionTreeService: DivisionTreeService) {}
  getName() {
    return TreeServiceEnum.Station;
  }
  async initialize() {
    let res = await this._divisionTreeService.initialize();
    this.dataChange.next(res);

    return res;
  }
  async loadChildren(node: FlatTreeNode) {
    if (node.type == UserResourceType.Station) {
    } else {
      this._divisionTreeService.loadChildren(node);
    }
  }
  addNode() {}
  deleteNode(id: string): void {}
  editNode(node: NestedTreeNode): void {}
  searchNode(condition: string): Promise<NestedTreeNode[]> {
    return Promise.resolve([]);
  }
}
