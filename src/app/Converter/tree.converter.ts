import { Injectable } from '@angular/core';
import { EnumHelper } from '../enum/enum-helper';
import { DivisionNode } from '../network/model/division-tree.model';
import { Division } from '../network/model/division.model';
import { DivisionManageModel } from '../view-model/division-manange.model';
import { NestedTreeNode } from '../view-model/nested-tree-node.model';

@Injectable({
  providedIn: 'root',
})
export class TreeConverter {
  fromDivisionNode(item: DivisionNode, parentId: string | null = null) {
    const node = new NestedTreeNode(
      item.Id,
      item.Name,
      item.Description,
      EnumHelper.ConvertDivisionToUserResource(item.DivisionType),
      item.Nodes.length > 0,
      parentId,
      true
    );
    return node;
  }

  fromDivision(division: Division) {
    const node = new NestedTreeNode(
      division.Id,
      division.Name,
      division.Description,
      EnumHelper.ConvertDivisionToUserResource(division.DivisionType),
      !division.IsLeaf,
      division.ParentId
    );
    return node;
  }
  fromDivisionManage(model: DivisionManageModel) {
    const node = new NestedTreeNode(model.id, model.name, model.description);
    return node;
  }

  iterateToNested<T>(data: T[]): NestedTreeNode[] {
    let res: NestedTreeNode[] = new Array<NestedTreeNode>();
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      if (item instanceof Division) {
        const node = this.fromDivision(item)
        res.push(node);
      } else {
      }
    }
    return res;
  }
  recurseToNested(data: DivisionNode[], parentId: string | null = null) {
    let res: NestedTreeNode[] = [];
    for (let i = 0; i < data.length; i++) {
      let divisionNode = data[i];
      const node = this.fromDivisionNode(divisionNode);
      node.parentId = parentId;
      res.push(node);
      if (divisionNode.Nodes && divisionNode.Nodes.length > 0) {
        let children = this.recurseToNested(divisionNode.Nodes, node.id);
        node.childrenChange.value.push(...children);
        node.hasChildren = true;
      }
    }

    return res;
  }

}
