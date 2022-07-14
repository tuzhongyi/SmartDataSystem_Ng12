import { Injectable } from "@angular/core";
import { LabelTreeConverter } from "src/app/converter/label-tree.converter";
import { ResourceLabel } from "src/app/network/model/resource-label.model";
import { GetResourceLabelsParams } from "src/app/network/request/label/label.params";
import { LabelRequestService } from "src/app/network/request/label/label.service";
import { CommonNestNode } from "src/app/view-model/common-nest-node.model";

@Injectable()
export class LabelListBusiness {

  public nestedNodeMap = new Map<string, CommonNestNode<ResourceLabel>>();


  constructor(private _labelRequest: LabelRequestService, private _converter: LabelTreeConverter) {

  }
  async init(condition: string = '') {
    this.nestedNodeMap.clear();


    let params = new GetResourceLabelsParams();
    params.LabelName = condition;

    let tmp = await this._listLabels(params)

    let res = this._converter.buildNestTree(tmp.Data);
    return res;
  }
  searchNode(condition: string) {
    return this.init(condition)
  }

  private _listLabels(params: GetResourceLabelsParams) {
    return this._labelRequest.list(params)
  }

}