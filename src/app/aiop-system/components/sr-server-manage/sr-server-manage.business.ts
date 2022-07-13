import { Injectable } from "@angular/core";
import { LocaleCompare } from "src/app/common/tools/locale-compare";
import { SRServerManageConverter } from "src/app/converter/sr-server-manage.converter";
import { SRServerRequestService } from "src/app/network/request/ai-sr-server/sr-server.service";

@Injectable()
export class SRServerManageBusiness {
  constructor(private _SRServerRequest: SRServerRequestService, private _converter: SRServerManageConverter) {

  }
  async listServers(condition: string) {
    let data = await this._SRServerRequest.list();
    let tmp = data.filter(d => d.Name.includes(condition))
    let res = this._converter.iterateToModel(tmp);
    data = data.sort((a, b) => {
      return LocaleCompare.compare(a.Name ?? "", b.Name ?? "")
    });
    return res;
  }
  async sync(id: string) {
    return await this._SRServerRequest.sync(id)
  }
  async delete(id: string) {
    return await this._SRServerRequest.delete(id)
  }
}