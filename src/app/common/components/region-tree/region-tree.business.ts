import { Injectable } from "@angular/core";
import { RegionTreeConverter } from "src/app/converter/region-tree.converter";
import { Region, RegionNode } from "src/app/network/model/region";
import { GetRegionsParams } from "src/app/network/request/region/region.params";
import { RegionRequestService } from "src/app/network/request/region/region.service";
import { CommonNestNode } from "src/app/view-model/common-nest-node.model";

@Injectable()
export class RegionTreeBusiness {

  public nestedNodeMap = new Map<string, CommonNestNode<Region>>();

  private _nodes: CommonNestNode[] = [];

  // 保存所有区域,要求condition==''
  private _regions: Region[] = [];

  constructor(private _regionRequest: RegionRequestService, private _converter: RegionTreeConverter) { }

  // 可以在初始化时就指定条件
  async init(condition: string = '') {
    this.nestedNodeMap.clear();

    let params = new GetRegionsParams();
    params.Name = condition;

    // 结果是满足condition的数组,但是可能缺少父节点
    let tmp = await this._listRegion(params);

    // console.log('符合的区域', tmp.Data);

    // 要求condition必须为 "",才可使用该字段
    this._regions = tmp.Data;

    let nodes = this._converter.iterateToNestNode(tmp.Data);
   

    // nodes.unshift(extra)
    // 注册请求到的节点
    this._registerArray(nodes)


    // 给没有父节点的添加父节点
    for (let node of nodes) {
      if (node.ParentId) {
        if (!this.nestedNodeMap.has(node.ParentId)) {
          // console.log('无父节点', node)
          await this._getAncestors(node)
        }
      }
    }

    let allNodes = Array.from(this.nestedNodeMap.values());

    // 用于本地筛选
    this._nodes = allNodes;

    let res = this._converter.buildNestTree(allNodes);
    return res;
  }

  // 第二种实现方式
  async init2(condition: string = '') {
    this.nestedNodeMap.clear();

    // 返回的是所区域
    let tree = await this._loadTree();
    let regionNodes = tree.Nodes ?? [];
    let res = this._converter.recurseToNestNode(regionNodes);

    this._registerRecurs(res);
    // 对结果筛选
    if (condition != '') {
      let commonNodes = Array.from(this.nestedNodeMap.values());
      // 打断原来的父子关系
      commonNodes.forEach(node => node.childrenChange.next([]))
      commonNodes = commonNodes.filter(node => node.Name.includes(condition))
      let tmp = [...commonNodes];
      commonNodes.forEach(n => this._getAncestors2(n, tmp))
      console.log(tmp)
      res = this._converter.buildNestTree(tmp)
    }

    return res;
  }

  // 在线筛选
  searchNode(condition: string) {
    return this.init(condition)
  }
  // 本地筛选
  searchNode2(condition: string) {
    this.nestedNodeMap.clear()
    let nodes: CommonNestNode[] = [];
    if (condition == '') {
      nodes = this._nodes;
    } else {
      let filtered = this._regions.filter(v => v.Name.includes(condition));
      let res: Region[] = [...filtered]
      for (let i = 0; i < filtered.length; i++) {
        let item = filtered[i];
        this._getLocalAncestors(item, res)
      }
      // console.log(res)
      nodes = this._converter.buildNestTree(res)

    }
    this._registerRecurs(nodes)
    return nodes;

  }
  searchNode3(condition: string) {
    return this.init2(condition)
  }


  private _listRegion(params: GetRegionsParams) {
    return this._regionRequest.list(params);
  }

  private _loadTree() {
    return this._regionRequest.trees();
  }



  private _registerArray(nodes: CommonNestNode[]) {
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      // 一定要直接覆盖，保证 node 为最新
      this.nestedNodeMap.set(node.Id, node);
    }
  }

  private _registerRecurs(nodes: CommonNestNode[]) {
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      this.nestedNodeMap.set(node.Id, node);
      if (node.childrenChange.value.length > 0) {
        this._registerRecurs(node.childrenChange.value)
      }
    }

  }

  private async _getAncestors(node: CommonNestNode) {
    if (node.ParentId && !this.nestedNodeMap.has(node.ParentId)) {
      let region = await this._regionRequest.get(node.ParentId);
      let parentNode = this._converter.Convert(region)
      this._registerArray([parentNode]);
      // 一定要await 
      await this._getAncestors(parentNode)
    }
  }
  private _getLocalAncestors(item: Region, res: Region[]) {
    if (item.ParentId) {
      let parent = this._regions.find((v) => v.Id == item.ParentId);
      if (parent) {
        if (!res.includes(parent))
          res.push(parent)
        this._getLocalAncestors(parent, res)
      }
    }
  }

  private _getAncestors2(node: CommonNestNode, res: CommonNestNode[]) {
    if (node.ParentId) {
      let parent = this.nestedNodeMap.get(node.ParentId)
      if (parent) {
        if (!res.includes(parent))
          res.push(parent)
        this._getAncestors2(parent, res)
      }
    }
  }
}