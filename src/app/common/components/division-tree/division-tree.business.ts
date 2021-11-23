import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DivisionTreeConverter } from 'src/app/converter/division-tree.converter';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { Division } from 'src/app/network/model/division.model';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { FlatTreeNode } from 'src/app/view-model/flat-tree-node.model';
import { NestedTreeNode } from 'src/app/view-model/nested-tree-node.model';

@Injectable()
export class DivisionTreeBusiness
  implements DivisionTreeConverter<NestedTreeNode>
{
  dataChange = new BehaviorSubject<NestedTreeNode[]>([]);

  private _divisions: Division[] = [];
  private _nestedNodeMap = new Map<string, NestedTreeNode>();

  constructor(private _divisionRequest: DivisionRequestService) {}

  async initialize() {
    let data = await this.loadData();
    let res = this.toNestedTreeModel(data);
    this.dataChange.next(res);
  }
  async loadChildren(id: string) {
    const node = this._nestedNodeMap.get(id);
    console.log('父节点', node);
    if (node) {
      const type = EnumHelper.GetDivisionChildType(node.divisionType);
      let data = await this.loadData(type, node.id);

      let res = this.toNestedTreeModel(data);
      node.childrentChange.value.push(...res);
      this.dataChange.next(this.dataChange.value);

      console.log('nestedNodeMap', this._nestedNodeMap);
    }
  }

  async loadData(type: DivisionType = DivisionType.City, id?: string) {
    let params = new GetDivisionsParams();
    params.DivisionType = type;
    if (id) params.ParentId = id;
    let res = await this._divisionRequest.list(params);
    this._divisions.push(...res.Data);
    return res.Data;
  }
  toNestedTreeModel<T>(data: T[]): NestedTreeNode[] {
    let res: NestedTreeNode[] = new Array<NestedTreeNode>();

    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      if (item instanceof Division) {
        const node = this._generate(item);
        res.push(node);
      }
    }
    return res;
  }
  private _generate(division: Division) {
    if (this._nestedNodeMap.has(division.Id)) {
      return this._nestedNodeMap.get(division.Id)!;
    }
    const node = new NestedTreeNode(
      division.Id,
      division.Name,
      division.DivisionType,
      !division.IsLeaf,
      division.ParentId
    );

    this._nestedNodeMap.set(node.id, node);

    return node;
  }
}
