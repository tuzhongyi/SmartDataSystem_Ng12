import { Injectable } from "@angular/core";
import { PlatformManageConverter } from "src/app/converter/platform-manage.converter";
import { PagedList } from "src/app/network/model/page_list.model";
import { PlatformRequestSerivce } from "src/app/network/request/platform/platform.service";
import { GetPlatformsParams } from "src/app/network/request/platform/platforms.params";
import { PlatformManageModel } from "src/app/view-model/platform-manage.model";

@Injectable()
export class PlatformManageBusiness {
  constructor(private _platformRequest: PlatformRequestSerivce, private _converter: PlatformManageConverter
  ) {

  }
  async init(condition: string, pageIndex: number = 1, pageSize: number = 9,) {
    let params = new GetPlatformsParams();
    params.PageIndex = pageIndex
    params.PageSize = pageSize// pageSize不会小于1
    params.Name = condition;

    let tmp = await this.list(params);
    let data = this._converter.iterateToModel(tmp.Data)

    let res: PagedList<PlatformManageModel> = {
      Page: tmp.Page,
      Data: data,
    };

    return res;
  }
  list(params: GetPlatformsParams) {
    return this._platformRequest.list(params);
  }
  sync(id: string) {
    return this._platformRequest.sync(id);
  }
  delete(id: string) {
    return this._platformRequest.delete(id)
  }

}