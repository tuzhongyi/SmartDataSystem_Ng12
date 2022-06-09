/*
 * @Author: pmx
 * @Date: 2021-12-23 16:17:25
 * @Last Modified by: pmx
 * @Last Modified time: 2022-06-09 14:47:57
 *
 *
 *
 *　 ┏┓   　   ┏┓
 *　┏┛┻━━━━━━━━┛┻┓
 *　┃　　　　　　 ┃
 *　┃　　　━　　　┃ ++ + + +
 *  |  ████━████ ┃
 *　┃　　　　　　 ┃ +
 *　┃　　　┻　　　┃
 *　┃　　　　　　 ┃ + +
 *　┗━┓　　　  ┏━┛
 *　　　┃　　　┃
 *　　　┃　　　┃ + + + +
 *　　　┃　　　┃
 *　　　┃　　　┃ +  神兽保佑
 *　　　┃　　　┃    代码无bug
 *　　　┃　　　┃　　+
 *　　　┃　 　　┗━━━┓ + +
 *　　　┃ 　　　　　 ┣┓
 *　　　┃ 　　　　　┏┛
 *　　　┗┓┓┏━━━┳┓┏┛ + + + +
 *　　　　┃┫┫　┃┫┫
 *　　　　┗┻┛　┗┻┛+ + + +
 *
 */
import { Injectable } from '@angular/core';
import { IConverter } from '../common/interfaces/converter.interface';
import { EnumHelper } from '../enum/enum-helper';
import { UserResourceType } from '../enum/user-resource-type.enum';
import { DivisionNode } from '../network/model/division-tree.model';
import { Division } from '../network/model/division.model';
import { GarbageStation } from '../network/model/garbage-station.model';
import { DivisionManageModel } from '../view-model/division-manange.model';
import { NestTreeNode } from '../view-model/nest-tree-node.model';

type TreeSourceModel =
  | DivisionNode
  | Division
  | DivisionManageModel
  | GarbageStation;

@Injectable({
  providedIn: 'root',
})
export class TreeConverter
  implements IConverter<TreeSourceModel, NestTreeNode>
{
  Convert(source: TreeSourceModel, ...res: any[]): NestTreeNode {
    if (source instanceof DivisionNode) {
      return this._fromDivisionNode(source);
    } else if (source instanceof Division) {
      return this._fromDivision(source);
    } else if (source instanceof DivisionManageModel) {
      return this._fromDivisionManage(source);
    } else if (source instanceof GarbageStation) {
      return this._fromGarbageStation(source);
    }
    throw new Error('Method not implemented.');
  }

  iterateToNestTreeNode<T extends Array<TreeSourceModel>>(data: T): NestTreeNode[] {
    let res: NestTreeNode[] = new Array<NestTreeNode>();
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      const node = this.Convert(item);
      res.push(node);
    }
    return res;
  }
  recurseToNestTreeNode<T extends TreeSourceModel>(
    data: T[],
    parentId: string | null = null
  ) {
    let res: NestTreeNode[] = [];
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      if (item instanceof DivisionNode) {
        const node = this.Convert(item);
        node.parentId = parentId;
        res.push(node);
        if (item.Nodes && item.Nodes.length > 0) {
          let children = this.recurseToNestTreeNode(item.Nodes, node.id);
          node.childrenChange.value.push(...children);
          node.hasChildren = true;
        }
      }
    }

    return res;
  }
  buildNestNodeTree<T extends TreeSourceModel>(data: T[]) {
    // 最终根节点树
    let res: NestTreeNode[] = [];

    // 所有树节点
    let m = new Map<string, NestTreeNode>();

    // 暂时没有父节点的节点
    let hanged = new Map<string, NestTreeNode>(); // 暂存区

    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      let node: NestTreeNode | null = null;

      if (m.has(item.Id)) {
        node = m.get(item.Id)!;
      } else {
        node = this.Convert(item);
        m.set(node.id, node);
      }

      if (node) {
        // 动态用Map,静态用Array
        for (let h of hanged.values()) {
          if (h.parentId == node.id) {
            node.childrenChange.value.push(h);
            hanged.delete(h.id);
          }
        }

        if (node.parentId) {
          if (m.has(node.parentId)) {
            // 当前已经有 parentNode 记录
            let parentNode = m.get(node.parentId)!;
            parentNode.hasChildren = true;
            parentNode.childrenChange.value.push(node);
          } else if (hanged.has(node.parentId)) {
            let parentNode = hanged.get(node.parentId)!;
            parentNode.hasChildren = true;
            parentNode.childrenChange.value.push(node);
          } else {
            // parentNode还没有创建
            hanged.set(node.id, node);
          }
        } else {
          // 跟区划
          res.push(node);
        }
      }
    }

    return res;
  }

  mergeNestedTree(first: NestTreeNode[], second: NestTreeNode[]) {
    for (let i = 0; i < first.length; i++) {
      let first_item = first[i];
      let second_item = second.find((item) => item.id == first_item.id);
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

  /******************* private *****************************/
  private _fromDivisionNode(
    item: DivisionNode,
    parentId: string | null = null
  ) {
    const node = new NestTreeNode(
      item.Id,
      item.Name,
      item.Description,
      EnumHelper.ConvertDivisionToUserResource(item.DivisionType),
      item.Nodes.length > 0,
      parentId,
      true,
    );
    node.rawData = item;
    return node;
  }

  private _fromDivision(item: Division) {
    const node = new NestTreeNode(
      item.Id,
      item.Name,
      item.Description,
      EnumHelper.ConvertDivisionToUserResource(item.DivisionType),
      !item.IsLeaf,
      item.ParentId,
    );
    node.rawData = item;
    return node;
  }
  private _fromDivisionManage(item: DivisionManageModel) {
    const node = new NestTreeNode(item.Id, item.Name, item.Description);
    node.rawData = item;
    return node;
  }
  private _fromGarbageStation(item: GarbageStation) {
    const node = new NestTreeNode(
      item.Id,
      item.Name,
      item.Description,
      UserResourceType.Station,
      false,
      item.DivisionId,
    );
    node.rawData = item;
    return node;
  }
}
