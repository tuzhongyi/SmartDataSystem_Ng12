import { Injectable } from "@angular/core";
import { EncodeDeviceManageConverter } from "src/app/converter/encode-device-manage.converter";
import { PagedList } from "src/app/network/model/page_list.model";
import { EncodeDeviceRequestService } from "src/app/network/request/encode-device/encode-device.service";
import { GetEncodeDevicesParams } from "src/app/network/request/encode-device/encode-devices-params";
import { EncodeDeviceManageModel, EncodeDeviceManageSearchInfo } from "src/app/view-model/encode-device-manage.model";

@Injectable()
export class EncodeDeviceManageBusiness {
  constructor(private _encodeDeviceRequest: EncodeDeviceRequestService, private _converter: EncodeDeviceManageConverter) { }

  async init(searchInfo: EncodeDeviceManageSearchInfo, pageIndex: number = 1, pageSize: number = 9) {
    let params = new GetEncodeDevicesParams();
    params.PageIndex = pageIndex;
    params.PageSize = pageSize;
    if (!searchInfo.filter) {
      params.Name = searchInfo.condition;
    } else {
      params.Name = searchInfo.deviceName;
      params.IPAddress = searchInfo.ip;
      params.OnlineStatus = searchInfo.online ? +searchInfo.online : void 0;
      params.AndLabelIds = searchInfo.labelIds;
    }

    let tmp = await this.listEncodeDevice(params);
    let data = this._converter.iterateToModel(tmp.Data)


    let res: PagedList<EncodeDeviceManageModel> = {
      Page: tmp.Page,
      Data: data,
    };
    return res;

  }

  listEncodeDevice(params: GetEncodeDevicesParams) {
    return this._encodeDeviceRequest.list(params)
  }
  deleteEncodeDevice(id: string) {
    return this._encodeDeviceRequest.del(id)
  }
}