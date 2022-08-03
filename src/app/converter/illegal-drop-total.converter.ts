import { Injectable } from "@angular/core";
import { Division } from "../network/model/division.model";
import { DivisionRequestService } from "../network/request/division/division-request.service";
import { IllegalDropTotalModel } from "../view-model/illegal-drop-total.model";
import { CommonModelConverter, CommonModelPromiseConverter } from "./common-model.converter";

type IllegalDropTotalSource = Division;


@Injectable({
  providedIn: "root"
})
export class IllegalDropTotalConverter extends CommonModelConverter<IllegalDropTotalModel> {

  private map: Map<string, IllegalDropTotalModel> = new Map();


  constructor() {
    super();
  }
  Convert(source: IllegalDropTotalSource) {
    if (source instanceof Division) {
      return this._fromDivision(source)
    }
    throw new Error('Error');
  }

  private _fromDivision(division: Division) {
    let model = new IllegalDropTotalModel();
    model.Id = division.Id;
    model.Name = division.Name;
    model.ParentId = division.ParentId ? division.ParentId : null;
    model.ParentName = '-';

    return model;
  }


  private _register(model: IllegalDropTotalModel) {
    if (!this.map.has(model.Id)) {
      this.map.set(model.Id, model)
    }
  }


}