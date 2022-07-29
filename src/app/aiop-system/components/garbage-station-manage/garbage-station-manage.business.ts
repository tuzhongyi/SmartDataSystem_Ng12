import { Injectable } from "@angular/core";
import { param } from "jquery";
import { LocaleCompare } from "src/app/common/tools/locale-compare";
import { GarbageStationManageConverter } from "src/app/converter/garbage-station-manage.converter";
import { GarbageStation } from "src/app/network/model/garbage-station.model";
import { PagedList } from "src/app/network/model/page_list.model";
import { GarbageStationTypesService } from "src/app/network/request/garbage-station-types/garbage-station-types.service";
import { GetGarbageStationsParams } from "src/app/network/request/garbage-station/garbage-station-request.params";
import { GarbageStationRequestService } from "src/app/network/request/garbage-station/garbage-station-request.service";
import { GarbageStationManageModel } from "src/app/view-model/garbage-station-manage.model";

@Injectable()
export class GarbageStationManageBusiness {
  constructor(private _garbageStationRequest: GarbageStationRequestService, private _converter: GarbageStationManageConverter) { }

  async listStations(divisionId: string = '', condition: string = '', pageIndex: number = 1, pageSize: number = 9) {
    let params = new GetGarbageStationsParams();
    params.PageIndex = pageIndex;
    params.PageSize = pageSize;
    params.Name = condition;
    params.DivisionId = divisionId;
    let { Data, Page } = await this._list(params);
    // console.log(tmp)
    let data = this._converter.iterateToModel(Data);
    data = data.sort((a, b) => {
      return LocaleCompare.compare(a.Name ?? "", b.Name ?? "")
    });

    let res: PagedList<GarbageStationManageModel> = {
      Page: Page,
      Data: data,
    };

    return res;
  }

  private _list(params: GetGarbageStationsParams) {
    return this._garbageStationRequest.list(params)

  }

  delete(id: string) {
    return this._garbageStationRequest.delete(id);
  }

}