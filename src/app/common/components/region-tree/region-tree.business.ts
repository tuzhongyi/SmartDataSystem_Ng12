import { Injectable } from "@angular/core";
import { RegionTreeConverter } from "src/app/converter/region-tree.converter";
import { Region } from "src/app/network/model/region";
import { RegionRequestService } from "src/app/network/request/region/region.service";
import { CommonNestNode } from "src/app/view-model/common-nest-node.model";

@Injectable()
export class RegionTreeBusiness {

  public nestedNodeMap = new Map<string, CommonNestNode<Region>>();

  private _nodes: CommonNestNode[] = [];
  private _data: Region[] = []

  constructor(private _regionRequest: RegionRequestService, private _converter: RegionTreeConverter) { }

  async init() {
    this.nestedNodeMap.clear()
    let nodes: CommonNestNode[] = [];

    let data = await this._loadData();
    nodes = this._converter.buildNestNodeTree(data);

    this._data = data;
    this._nodes = nodes;

    this._updateNestedMap(nodes);


    // let tree = await this._loadTree();
    // let res = this._converter.recurseToNestTreeNode(tree);
    // console.log(res)

    return nodes;
  }


  async searchNode(condition: string) {
    this.nestedNodeMap.clear()
    let nodes: CommonNestNode[] = [];
    if (condition == '') {
      nodes = this._nodes;
    } else {
      let filtered = this._data.filter(v => v.Name.includes(condition));
      let res: Region[] = [...filtered]
      for (let i = 0; i < filtered.length; i++) {
        let item = filtered[i];
        this._getAncestors(item, res)
      }
      // console.log(res)
      nodes = this._converter.buildNestNodeTree(res)

    }
    this._updateNestedMap(nodes)
    return nodes;

  }


  private async _loadData() {
    let res = await this._regionRequest.list()
    return res.Data
  }

  private async _loadTree() {
    let res = await this._regionRequest.trees()
    return res.Nodes ?? [];
  }

  private _register(nodes: CommonNestNode[]) {
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      // 一定要直接覆盖，保证 node 为最新
      this.nestedNodeMap.set(node.Id, node);
    }
  }
  private _updateNestedMap(nodes: CommonNestNode[]) {
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      this.nestedNodeMap.set(node.Id, node);
      if (node.childrenChange.value.length > 0) {
        this._updateNestedMap(node.childrenChange.value)
      }
    }

  }

  private _getAncestors(item: Region, res: Region[]) {
    if (item.ParentId) {
      let parent = this._data.find((v) => v.Id == item.ParentId);
      if (parent) {
        if (!res.includes(parent))
          res.push(parent)
        this._getAncestors(parent, res)
      }
    }
  }

}