import { Injectable } from "@angular/core";
import { EnumHelper } from "../enum/enum-helper";
import { UserResourceType } from "../enum/user-resource-type.enum";
import { DivisionNode } from "../network/model/division-tree.model";
import { Division } from "../network/model/division.model";
import { GarbageStation } from "../network/model/garbage-station.model";
import { CommonNestNode } from "../view-model/common-nest-node.model";



type DivisionTreeSource = Division | GarbageStation | DivisionNode

const DivisionNodeIconType = new Map([
  [UserResourceType.City, 'howell-icon-earth'],
  [UserResourceType.County, 'howell-icon-map5'],
  [UserResourceType.Committees, 'howell-icon-map5'],
  [UserResourceType.Station, 'howell-icon-garbage'],
]);


@Injectable({
  providedIn: 'root'
})
export class DivisionTreeConverter {

  constructor() {

  }
  Convert(source: DivisionTreeSource, ...res: any[]): CommonNestNode {
    // DivisionNode 继承自 Division,要先判断掉
    if (source instanceof DivisionNode) {
      return this._fromDivisionNode(source)
    } else if (source instanceof Division) {
      return this._fromDivision(source);
    } else if (source instanceof GarbageStation) {
      return this._fromGarbageStation(source);
    }

    throw new Error('Method not implemented.');
  }

  iterateToNestTreeNode<T extends Array<DivisionTreeSource>>(data: T): CommonNestNode[] {
    let res: CommonNestNode[] = new Array<CommonNestNode>();
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      const node = this.Convert(item);
      res.push(node);
    }
    return res;
  }
  recurseToNestTreeNode<T extends DivisionTreeSource>(data: T[],
    parentId: string | null = null) {
    let res: CommonNestNode[] = [];
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      if (item instanceof DivisionNode) {
        const node = this.Convert(item);
        node.ParentId = parentId;
        res.push(node);
        if (item.Nodes && item.Nodes.length > 0) {
          let children = this.recurseToNestTreeNode(item.Nodes, node.Id);
          node.childrenChange.value.push(...children);
          node.HasChildren = true;
        }
      }

    }
    return res;
  }
  buildNestNodeTree<T extends DivisionTreeSource>(data: T[]) {
    // 最终根节点树
    let res: CommonNestNode[] = [];

    // 所有树节点
    let m = new Map<string, CommonNestNode>();

    // 暂时没有父节点的节点
    let hanged = new Map<string, CommonNestNode>(); // 暂存区

    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      let node: CommonNestNode | null = null;

      if (m.has(item.Id)) {
        node = m.get(item.Id)!;
      } else {
        node = this.Convert(item);
        m.set(node.Id, node);
      }

      if (node) {
        // 动态用Map,静态用Array
        for (let h of hanged.values()) {
          if (h.ParentId == node.Id) {
            node.ChildrenLoaded = true;
            node.HasChildren = true;
            node.childrenChange.value.push(h);
            hanged.delete(h.Id);
          }
        }

        if (node.ParentId) {
          if (m.has(node.ParentId)) {
            // 当前已经有 parentNode 记录
            let parentNode = m.get(node.ParentId)!;
            parentNode.HasChildren = true;
            parentNode.ChildrenLoaded = true;
            parentNode.childrenChange.value.push(node);
          } else if (hanged.has(node.ParentId)) {
            let parentNode = hanged.get(node.ParentId)!;
            parentNode.HasChildren = true;
            parentNode.ChildrenLoaded = true;
            parentNode.childrenChange.value.push(node);

          } else {
            // parentNode还没有创建
            hanged.set(node.Id, node);
          }
        } else {
          // 跟区划
          res.push(node);
        }
      }
    }


    return res;
  }

  mergeNestedTree(first: CommonNestNode[], second: CommonNestNode[]) {
    for (let i = 0; i < first.length; i++) {
      let first_item = first[i];
      let second_item = second.find((item) => item.Id == first_item.Id);
      if (second_item) {
        this.mergeNestedTree(
          first_item.childrenChange.value,
          second_item.childrenChange.value
        );
      } else {
        second.push(first_item);
      }
    }
    return second;
  }



  private _fromDivision(item: Division) {
    const node = new CommonNestNode();
    node.Id = item.Id;
    node.Name = item.Name;
    node.HasChildren = !item.IsLeaf;
    node.ParentId = item.ParentId ? item.ParentId : null;
    node.ChildrenLoaded = false;
    node.ParentNode = null;
    node.IconClass = DivisionNodeIconType.get(EnumHelper.ConvertDivisionToUserResource(item.DivisionType)) ?? '';
    node.RawData = item;
    return node;
  }
  private _fromGarbageStation(item: GarbageStation) {
    const node = new CommonNestNode();
    node.Id = item.Id;
    node.Name = item.Name;
    node.HasChildren = false;
    node.ParentId = item.DivisionId ? item.DivisionId : null;
    node.ChildrenLoaded = false;
    node.ParentNode = null;
    node.IconClass = DivisionNodeIconType.get(UserResourceType.Station) ?? '';
    node.RawData = item;

    return node;
  }
  private _fromDivisionNode(
    item: any,
    parentId: string | null = null
  ) {
    const node = new CommonNestNode();
    node.Id = item.Id;
    node.Name = item.Name;
    node.HasChildren = item.Nodes.length > 0;
    node.ParentId = parentId;
    node.ChildrenLoaded = true;
    node.ParentNode = null;
    node.IconClass = DivisionNodeIconType.get(EnumHelper.ConvertDivisionToUserResource(item.DivisionType)) ?? '';
    node.RawData = item;
    return node;
  }
}