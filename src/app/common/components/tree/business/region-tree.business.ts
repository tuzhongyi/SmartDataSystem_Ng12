import { Injectable } from '@angular/core';
import { TreeConverter } from 'src/app/converter/tree.converter';
import { DistrictTreeEnum } from 'src/app/enum/district-tree.enum';
import { TreeBusinessEnum } from 'src/app/enum/tree-business.enum';
import { Region } from 'src/app/network/model/garbage-station/region';
import { RegionRequestService } from 'src/app/network/request/region/region.service';
import { NestTreeNode } from 'src/app/view-model/nest-tree-node.model';
import { TreeBusinessInterface } from '../interface/tree-business.interface';

@Injectable()
export class RegionTreeBusiness implements TreeBusinessInterface {
  private _model = DistrictTreeEnum.Division;

  public nestedNodeMap = new Map<string, NestTreeNode>();
  public depthIsEnd = false;

  public set model(val: DistrictTreeEnum) {
    this._model = val;
  }
  get model() {
    return this._model;
  }

  private _nodes: NestTreeNode[] = [];
  private _data: Region[] = [];

  getName(): TreeBusinessEnum {
    return TreeBusinessEnum.Region;
  }

  constructor(
    private _regionRequest: RegionRequestService,
    private _converter: TreeConverter
  ) {}
  // 设置区划等级和子区划深度
  async initialize() {
    let nodes: NestTreeNode[] = [];
    this.nestedNodeMap.clear();

    let data = await this._loadData();
    nodes = this._converter.buildNestNodeTree(data);

    this._data = data;
    this._nodes = nodes;

    this._updateNestedMap(nodes);
    return nodes;
  }

  async loadChildren(node: NestTreeNode) {
    let children: NestTreeNode[] = [];

    return children;
  }
  async searchNode(condition: string) {
    this.nestedNodeMap.clear();
    let nodes: NestTreeNode[] = [];
    if (condition == '') {
      nodes = this._nodes;
    } else {
      let filtered = this._data.filter((v) => v.Name.includes(condition));
      let res: Region[] = [...filtered];
      for (let i = 0; i < filtered.length; i++) {
        let item = filtered[i];
        this._getAncestors(item, res);
      }
      console.log(res);
      nodes = this._converter.buildNestNodeTree(res);
    }
    this._updateNestedMap(nodes);
    return nodes;
  }

  /************************* Private *************************/

  private async _loadData() {
    let res = await this._regionRequest.list();
    return res.Data;
  }

  private async _loadTree() {
    let res = await this._regionRequest.trees();
    return res.Nodes ?? [];
  }

  private _updateNestedMap(nodes: NestTreeNode[]) {
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      this.nestedNodeMap.set(node.id, node);
      if (node.childrenChange.value.length > 0) {
        this._updateNestedMap(node.childrenChange.value);
      }
    }
  }

  private _getAncestors(item: Region, res: Region[]) {
    if (item.ParentId) {
      let parent = this._data.find((v) => v.Id == item.ParentId);
      if (parent) {
        if (!res.includes(parent)) res.push(parent);
        this._getAncestors(parent, res);
      }
    }
  }
}
