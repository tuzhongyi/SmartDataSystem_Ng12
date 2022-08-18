import { Injectable } from "@angular/core";
import { param } from "jquery";
import { TimeUnit } from "src/app/enum/time-unit.enum";
import { GetDivisionEventNumbersParams } from "src/app/network/request/division/division-request.params";
import { DivisionRequestService } from "src/app/network/request/division/division-request.service";
import { GetGarbageStationVolumesParams } from "src/app/network/request/garbage-station/garbage-station-request.params";
import { GarbageStationRequestService } from "src/app/network/request/garbage-station/garbage-station-request.service";
import { Time } from "../../tools/time";

@Injectable()
export class EventNumberChartBusiness {

  constructor(private _divisionRequest: DivisionRequestService, private _garbageStationRequest: GarbageStationRequestService) {

  }
  init() {
    this.getByStation();
  }
  private async _getData() {
    let beginTime = Time.beginTime(new Date());
    let endTime = Time.endTime(new Date());
    let uint = TimeUnit.Hour;

    let params = new GetDivisionEventNumbersParams();
    params.BeginTime = beginTime;
    params.EndTime = endTime;
    params.TimeUnit = uint;

    let res = await this._divisionRequest.eventNumber.history.list('310109000000', params)
    console.log(res)
  }
  async getByStation() {
    let beginTime = Time.beginTime(new Date());
    let endTime = Time.endTime(new Date());
    let uint = TimeUnit.Hour;
    let params = new GetGarbageStationVolumesParams();
    params.BeginTime = beginTime;
    params.EndTime = endTime;
    params.TimeUnit = uint;

    let res = await this._garbageStationRequest.eventNumber.history.list('310109009002001000', params)
    console.log(res)
  }
  //310109000000
}