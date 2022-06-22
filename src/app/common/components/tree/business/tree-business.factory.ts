import { Inject, Injectable } from "@angular/core";
import { IBusinessFactory } from "src/app/common/interfaces/business-factory.interface";
import { TreeBusinessEnum } from "src/app/enum/tree-business.enum";
import { TreeBusinessInterface } from "../interface/tree-business.interface";
import { TreeBusinessToken } from "../tokens/tree-business.token";

@Injectable()
export class TreeBusinessFactory {
  constructor(@Inject(TreeBusinessToken) private _business: TreeBusinessInterface[]) {

  }
  createBusiness(name: TreeBusinessEnum): TreeBusinessInterface {
    return this._business.find(item => item.getName() == name)!
  }
}