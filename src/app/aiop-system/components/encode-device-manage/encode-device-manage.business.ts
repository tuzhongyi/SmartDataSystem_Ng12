import { Injectable } from '@angular/core';
import { EncodeDeviceManageConverter } from 'src/app/aiop-system/components/encode-device-manage/encode-device-manage.converter';
import {
  EncodeDeviceManageModel,
  EncodeDeviceManageSearchInfo,
} from 'src/app/aiop-system/components/encode-device-manage/encode-device-manage.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetResourceEncodeDevicesParams } from 'src/app/network/request/resources/encode-device/resource-encode-device.params';
import { ResourceRequestService } from 'src/app/network/request/resources/resource.service';

@Injectable()
export class EncodeDeviceManageBusiness {
  constructor(
    private service: ResourceRequestService,
    private _converter: EncodeDeviceManageConverter
  ) {}

  async init(
    searchInfo: EncodeDeviceManageSearchInfo,
    pageIndex: number = 1,
    pageSize: number = 9
  ) {
    let params = new GetResourceEncodeDevicesParams();
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
    let { Data, Page } = await this.listEncodeDevice(params);
    let data = this._converter.iterateToModel(Data);

    let res: PagedList<EncodeDeviceManageModel> = {
      Page,
      Data: data,
    };
    return res;
  }

  listEncodeDevice(params: GetResourceEncodeDevicesParams) {
    return this.service.encodeDevice.list(params);
  }
  deleteEncodeDevice(id: string) {
    return this.service.encodeDevice.delete(id);
  }
}
