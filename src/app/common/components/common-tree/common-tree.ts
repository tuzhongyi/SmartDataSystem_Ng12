import { SelectionChange } from '@angular/cdk/collections';
import { EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { CommonNestNode } from 'src/app/view-model/common-nest-node.model';
import { CommonTreeComponent } from './common-tree.component';
import { ICommonTree } from './common-tree.model';

export abstract class CommonTree implements ICommonTree {
  protected nodes = new Map<string, CommonNestNode>();
  public dataSubject = new BehaviorSubject<CommonNestNode[]>([]);
  public tree?: CommonTreeComponent;

  abstract selectTreeNode: EventEmitter<CommonFlatNode[]>;

  selectTreeNodeHandler(change: SelectionChange<CommonFlatNode>) {
    let nodes = change.source.selected;
    this.selectTreeNode.emit(nodes);
  }

  addNode(node: CommonNestNode) {
    if (node.ParentId) {
      let parentNode = this.nodes.get(node.ParentId);
      if (parentNode) {
        parentNode.HasChildren = true;
        parentNode.childrenChange.value.push(node);
      }
    } else {
      this.dataSubject.value.push(node);
    }
    this.nodes.set(node.Id, node);
    this.dataSubject.next(this.dataSubject.value);
  }

  /**原节点有各种状态,使用原节点 */
  editNode(node: CommonNestNode) {
    let currentNode = this.nodes.get(node.Id);
    if (currentNode) {
      currentNode.Name = node.Name;
      currentNode.RawData = node.RawData;
    }
    this.dataSubject.next(this.dataSubject.value);
  }

  deleteNode(flat: CommonFlatNode) {
    const node = flat;
    // 当前要删除的节点
    let currentNode = this.nodes.get(node.Id);
    if (currentNode) {
      // 该节点有没有父节点
      if (currentNode.ParentId) {
        let parentNode = this.nodes.get(currentNode.ParentId)!;
        let index = parentNode.childrenChange.value.indexOf(currentNode);
        if (index != -1) {
          parentNode.childrenChange.value.splice(index, 1);
          parentNode.HasChildren = parentNode.childrenChange.value.length > 0;
        }
      } else {
        let index = this.dataSubject.value.indexOf(currentNode);
        if (index != -1) {
          this.dataSubject.value.splice(index, 1);
        }
      }
      this.nodes.delete(currentNode.Id);
    }
    this.dataSubject.next(this.dataSubject.value);
    this.tree?.deleteNode(flat);
  }

  toggleNodes(ids: string[], clear?: boolean) {
    this.tree?.toggleSelect(ids, clear);
  }
}
