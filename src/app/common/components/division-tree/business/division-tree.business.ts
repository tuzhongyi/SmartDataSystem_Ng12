import { Injectable } from '@angular/core';
import { EqualTool } from 'src/app/common/tools/equal-tool/equal.tool';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { CommonNestNode } from 'src/app/view-model/common-nest-node.model';
import { DivisionTreeConverter } from '../division-tree.converter';
import {
  DivisionTreeSource,
  IDivisionTreeBusiness,
} from '../division-tree.model';
import { DivisionTreeBusinessFactory } from './division-tree.business.factory';

@Injectable()
export class DivisionTreeBusiness implements IDivisionTreeBusiness {
  constructor(
    private factory: DivisionTreeBusinessFactory,
    private converter: DivisionTreeConverter
  ) {}

  showExtend: boolean = false;
  depthIsEnd: boolean = false;
  nestedNodeMap: Map<string, CommonNestNode<DivisionTreeSource>> = new Map();

  async searchNode(
    name?: string,
    type?: DivisionType,
    depth: number = 0
  ): Promise<CommonNestNode<any>[]> {
    let datas: (Division | GarbageStation)[];
    if (name) {
      datas = await this.search(name, type, depth);
    } else {
      datas = await this.list(type, depth);
    }
    let models = datas.map((x) => this.converter.Convert(x));
    this.nestedNodeMap.clear();
    let tree = this.totree(models);
    return tree;
  }

  private getdepth(parentId: string, depth: number = 0): number {
    let node = this.nestedNodeMap.get(parentId);
    if (node) {
      depth++;
      if (node.ParentId) {
        return this.getdepth(node.ParentId, depth);
      }
    }
    return depth;
  }
  private canload(node: CommonNestNode, depth: number = 0) {
    if (node.ChildrenLoaded) return false;
    if (depth <= 0) {
      return false;
    }
    if (node.ParentId) {
      let _depth = this.getdepth(node.ParentId, 0);
      if (_depth >= depth) {
        return false;
      }
    }
    return true;
  }

  async loadChildren(
    flat: CommonFlatNode<DivisionTreeSource>,
    depth: number = 0
  ): Promise<CommonNestNode<DivisionTreeSource> | undefined> {
    let node = this.nestedNodeMap.get(flat.Id);

    if (node) {
      if (!this.canload(node, depth)) {
        return node;
      }

      let children = await this.children(flat.Id);
      let models = children.map((x) => this.converter.Convert(x));

      let tree = this.totree([node, ...models]);
      tree[0].ChildrenLoaded = true;
      return tree[0];
    }
    return undefined;
  }

  async load(type?: DivisionType, depth: number = 0) {
    this.nestedNodeMap.clear();
    let datas = await this.list(type, depth);
    let models = datas.map((x) => this.converter.Convert(x));
    let tree = this.totree(models);
    return tree;
  }

  private async list(type?: DivisionType, depth: number = 0) {
    return this.factory.create(type).list(depth, this.showExtend);
  }

  async search(name: string, type?: DivisionType, depth = 0) {
    return this.factory.create(type).search(name, depth, this.showExtend);
  }
  children(parentId: string) {
    return this.factory.create().children(parentId);
  }

  private includes(node: CommonNestNode, nodes: CommonNestNode[]) {
    return nodes.some((x) => EqualTool.equal(x, node));
  }

  totree(nodes: CommonNestNode[]): CommonNestNode[] {
    // 将所有节点存入Map中
    nodes.forEach((node) => this.nestedNodeMap.set(node.Id, node));

    const tree: CommonNestNode[] = [];

    nodes.forEach((node) => {
      if (node.ParentId) {
        const parentNode = this.nestedNodeMap.get(node.ParentId);
        if (parentNode && !this.includes(node, parentNode.children)) {
          parentNode.children.push(node);
          parentNode.childrenChange.next([
            ...parentNode.childrenChange.getValue(),
            node,
          ]);
          parentNode.HasChildren = true;
          parentNode.ChildrenLoaded = true;
        } else {
          tree.push(node);
        }
      } else {
        tree.push(node);
      }
    });

    return tree;
  }
}
