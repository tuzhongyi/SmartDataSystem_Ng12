import { Injectable } from "@angular/core";
import { LabelRequestService } from "src/app/network/request/label/label.service";

@Injectable()
export class LabelListBusiness {
  constructor(private _labelRequest: LabelRequestService) {

  }
  init() {
    return this._labelRequest.list()
  }


}