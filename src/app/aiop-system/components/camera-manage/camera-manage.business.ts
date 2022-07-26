import { Injectable } from "@angular/core";
import { param } from "jquery";
import { LocaleCompare } from "src/app/common/tools/locale-compare";
import { AICameraManageConverter } from "src/app/converter/ai-camera-manage.converter";
import { PagedList } from "src/app/network/model/page_list.model";
import { GetCamerasParams } from "src/app/network/request/ai-camera/ai-camera.params";
import { AICameraRequestService } from "src/app/network/request/ai-camera/ai-camera.service";
import { EncodeDeviceRequestService } from "src/app/network/request/encode-device/encode-device.service";
import { AICameraManageModel, AICameraManageSearchInfo } from "src/app/view-model/ai-camera-manage.model";

@Injectable()
export class CameraManageBusiness {


  constructor(private _AICameraRequest: AICameraRequestService, private _encodeDeviceRequest: EncodeDeviceRequestService, private _converter: AICameraManageConverter) { }

  async init(regionId: string, searchInfo: AICameraManageSearchInfo, pageIndex: number = 1, pageSize: number = 9) {

    let params = new GetCamerasParams();
    params.PageIndex = pageIndex;
    params.PageSize = pageSize;

    if (regionId == 'null') {
      params.RegionIdNullable = true;
    } else {
      params.RegionIds = [regionId]
    }
    if (!searchInfo.Filter) {
      params.Name = searchInfo.Condition;
    } else {
      params.Name = searchInfo.CameraName;
      if (searchInfo.CameraType)
        params.CameraTypes = [+searchInfo.CameraType];
      if (searchInfo.DeviceId)
        params.EncodeDeviceIds = [searchInfo.DeviceId];
      params.AndLabelIds = searchInfo.LabelIds;
    }



    let tmp = await this._listAiopCameras(params);

    let data = this._converter.iterateToModel(tmp.Data);

    data = data.sort((a, b) => {
      return LocaleCompare.compare(a.Name ?? "", b.Name ?? "")
    })

    let res: PagedList<AICameraManageModel> = {
      Page: tmp.Page,
      Data: data,
    };

    return res;

  }
  listEncodeDevice() {
    return this._encodeDeviceRequest.list()
  }
  deleteAICamera(id: string) {
    return this._AICameraRequest.delete(id)
  }
  private _listAiopCameras(params: GetCamerasParams) {
    return this._AICameraRequest.list(params)
  }


}