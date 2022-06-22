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
  async init(pageIndex: number = 1, pageSize: number = 9,) {
    let params = new GetPlatformsParams();
    params.PageIndex = Math.max(1, pageIndex);
    params.PageSize = Math.max(1, pageSize);// pageSize不会小于1

    let list = await this.list(params);
    let data = this._converter.iterateToModel(list.Data)

    let res: PagedList<PlatformManageModel> = {
      Page: list.Page,
      Data: data,
    };

    return res;
  }
  async list(params: GetPlatformsParams) {
    return this._platformRequest.list(params);
  }
  async sync(id: string) {
    return await this._platformRequest.sync(id);
  }
  async delete(id: string) {
    return await this._platformRequest.delete(id)
  }

  async search(condition: string = '') {
    let params = new GetPlatformsParams();
    params.Name = condition;

    let records = await this._platformRequest.list(params);
    let models = this._converter.iterateToModel(records.Data)

    let res: PagedList<PlatformManageModel> = {
      Page: records.Page,
      Data: models,
    };

    return res;
  }
}