import { Injectable } from "@angular/core";
import { TreeConverter } from "src/app/converter/tree.converter";
import { RegionRequestService } from "src/app/network/request/region/region.service";
import { NestTreeNode } from "src/app/view-model/nest-tree-node.model";

@Injectable()
export class RegionTreeBusiness {
  public nestedNodeMap = new Map<string, NestTreeNode>();


  constructor(private _regionRequest: RegionRequestService, private _converter: TreeConverter) {

  }
  async initialize() {
    this.nestedNodeMap.clear();

    let res = await this._regionRequest.list();
    console.log(res);
    let nodes = this._converter.iterateToNestTreeNode(res.Data);
    return nodes;

  }
  async loadChildren(node: NestTreeNode) {

  }
  private _register(nodes: NestTreeNode[]) {
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      // 一定要直接覆盖，保证 node 为最新
      this.nestedNodeMap.set(node.id, node);
    }
  }
}