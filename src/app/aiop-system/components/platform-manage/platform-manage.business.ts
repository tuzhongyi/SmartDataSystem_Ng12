import { Injectable } from "@angular/core";
import { PlatformManageConverter } from "src/app/converter/platform-manage.converter";
import { PagedList } from "src/app/network/model/page_list.model";
import { PlatformRequestSerivce } from "src/app/network/request/platform/platform.service";
import { GetPlatformsParams } from "src/app/network/request/platform/platforms-params";
import { PlatformManageModel } from "src/app/view-model/platform-manage.model";

@Injectable()
export class PlatformManageBusiness {
  constructor(private _platformRequest: PlatformRequestSerivce, private _converter: PlatformManageConverter
  ) {

  }
  async loadData(pageIndex: number, pageSize: number = 9) {
    let params = new GetPlatformsParams();
    params.PageIndex = Math.max(1, pageIndex);
    params.PageSize = Math.max(1, pageSize);// pageSize不会小于1

    let records = await this._platformRequest.list(params);
    let models = this._converter.iterateToModel(records.Data)

    let res: PagedList<PlatformManageModel> = {
      Page: records.Page,
      Data: models,
    };

    return res;
  }

}