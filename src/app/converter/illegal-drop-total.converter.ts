import { Injectable } from "@angular/core";
import { EnumHelper } from "../enum/enum-helper";
import { UserResourceType } from "../enum/user-resource-type.enum";
import { Division } from "../network/model/division.model";
import { GarbageStation } from "../network/model/garbage-station.model";
import { DivisionRequestService } from "../network/request/division/division-request.service";
import { EventNumberStatisticModel } from "../view-model/illegal-drop-total.model";
import { CommonModelConverter, CommonModelPromiseConverter } from "./common-model.converter";

type IllegalDropTotalSource = Division | GarbageStation;


@Injectable({
  providedIn: "root"
})
export class EventNumberStatisticConverter extends CommonModelConverter<EventNumberStatisticModel, IllegalDropTotalSource> {

  constructor() {
    super();
  }
  Convert(source: IllegalDropTotalSource) {
    if (source instanceof Division) {
      return this._fromDivision(source)
    } else if (source instanceof GarbageStation) {
      return this._fromGarbageStation(source)
    }
    throw new Error('Error');
  }

  private _fromDivision(item: Division) {
    let model = new EventNumberStatisticModel();
    model.Id = item.Id;
    model.Name = item.Name;
    model.ParentId = item.ParentId ? item.ParentId : null;
    model.ParentModel = null;
    model.EventNumber = '-';
    model.Type = EnumHelper.ConvertDivisionToUserResource(item.DivisionType);
    return model;
  }



  private _fromGarbageStation(item: GarbageStation) {
    let model = new EventNumberStatisticModel();
    model.Id = item.Id;
    model.Name = item.Name;
    model.ParentId = item.DivisionId ? item.DivisionId : null;
    model.ParentModel = null;
    model.EventNumber = '-';
    model.Type = UserResourceType.Station;
    return model;
  }




}