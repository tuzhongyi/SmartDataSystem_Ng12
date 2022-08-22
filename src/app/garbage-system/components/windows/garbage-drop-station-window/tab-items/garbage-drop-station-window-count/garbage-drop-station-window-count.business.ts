import { Injectable } from "@angular/core";
import { DivisionType } from "src/app/enum/division-type.enum";
import { GetDivisionsParams } from "src/app/network/request/division/division-request.params";
import { DivisionRequestService } from "src/app/network/request/division/division-request.service";

@Injectable()
export class GarbageDropStationWindowCountBusiness {

  constructor(private _divisionRequest: DivisionRequestService) {

  }
  getCommittees(divisionId: string) {
    let params = new GetDivisionsParams()
    params.AncestorId = divisionId;
    params.DivisionType = DivisionType.County;
    return this._divisionRequest.list(params)
  }
}