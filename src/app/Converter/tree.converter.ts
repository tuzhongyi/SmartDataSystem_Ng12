import { Injectable } from '@angular/core';
import { DivisionType } from '../enum/division-type.enum';
import { EnumHelper } from '../enum/enum-helper';
import { UserResourceType } from '../enum/user-resource-type.enum';
import { DivisionNode } from '../network/model/division-tree.model';
import { Division } from '../network/model/division.model';
import { GarbageStation } from '../network/model/garbage-station.model';
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

  fromDivision(item: Division) {
    const node = new NestedTreeNode(
      item.Id,
      item.Name,
      item.Description,
      EnumHelper.ConvertDivisionToUserResource(item.DivisionType),
      !item.IsLeaf,
      item.ParentId
    );
    return node;
  }
  fromDivisionManage(model: DivisionManageModel) {
    const node = new NestedTreeNode(model.id, model.name, model.description);
    return node;
  }
  fromGarbageStation(item: GarbageStation) {
    const node = new NestedTreeNode(item.Id, item.Name, item.Description, UserResourceType.Station, false, item.DivisionId);
    return node;
  }


  iterateToNested<T>(data: T[]): NestedTreeNode[] {
    let res: NestedTreeNode[] = new Array<NestedTreeNode>();
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      if (item instanceof Division) {
        const node = this.fromDivision(item)
        res.push(node);
      } else if (item instanceof GarbageStation) {
        const node = this.fromGarbageStation(item);
        res.push(node)
      }
    }
    return res;
  }
  recurseToNested<T>(data: T[], parentId: string | null = null) {
    let res: NestedTreeNode[] = [];
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      if (item instanceof DivisionNode) {
        const node = this.fromDivisionNode(item);
        node.parentId = parentId;
        res.push(node);
        if (item.Nodes && item.Nodes.length > 0) {
          let children = this.recurseToNested(item.Nodes, node.id);
          node.childrenChange.value.push(...children);
          node.hasChildren = true;
        }
      }

    }

    return res;
  }
  buildNestedTree<T>(data: T[]) {
    // 最终根节点树
    let res: NestedTreeNode[] = [];

    // 所有树节点
    let m = new Map<string, NestedTreeNode>();

    // 暂时没有父节点的节点
    let hanged = new Map<string, NestedTreeNode>();// 暂存区

    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      let node: NestedTreeNode | null = null;



      if (item instanceof Division) {
        if (m.has(item.Id)) {
          node = m.get(item.Id)!
        } else {
          node = this.fromDivision(item);
          m.set(node.id, node)
        }


      } else if (item instanceof GarbageStation) {
        if (m.has(item.Id)) {
          node = m.get(item.Id)!
        }
        else {
          node = this.fromGarbageStation(item);
          m.set(node.id, node)
        }
      }

      if (node) {

        // 动态用Map,静态用Array
        for (let h of hanged.values()) {
          if (h.parentId == node.id) {
            node.childrenChange.value.push(h);
            hanged.delete(h.id)
          }
        }

        if (node.parentId) {
          if (m.has(node.parentId)) {
            // 当前已经有 parentNode 记录
            let parentNode = m.get(node.parentId)!;
            parentNode.childrenChange.value.push(node)
          } else if (hanged.has(node.parentId)) {
            let parentNode = hanged.get(node.parentId)!;
            parentNode.childrenChange.value.push(node)

          } else {
            // parentNode还没有创建
            hanged.set(node.id, node)
          }
        } else {
          // 跟区划
          res.push(node)
        }
      }
    }

    return res;
  }


}
