import { Injectable } from "@angular/core";
import { LocaleCompare } from "src/app/common/tools/locale-compare";
import { AICameraManageConverter } from "src/app/converter/ai-camera-manage.converter";
import { PagedList } from "src/app/network/model/page_list.model";
import { GetCamerasParams } from "src/app/network/request/ai-camera/ai-camera.params";
import { AICameraRequestService } from "src/app/network/request/ai-camera/ai-camera.service";
import { AICameraManageModel, AICameraManageSearchInfo } from "src/app/view-model/ai-camera-manage.model";

@Injectable()
export class CameraManageBusiness {


  constructor(private _aiCameraRequest: AICameraRequestService, private _converter: AICameraManageConverter) { }

  async init(searchInfo: AICameraManageSearchInfo, pageIndex: number = 1, pageSize: number = 9) {

    let params = new GetCamerasParams();
    params.PageIndex = pageIndex;
    params.PageSize = pageSize;

    if (!searchInfo.filter) {
      params.Name = searchInfo.condition;
    } else {
      // params.Name = searchInfo.deviceName;
      // params.IPAddress = searchInfo.ip;
      // params.OnlineStatus = searchInfo.online ? +searchInfo.online : void 0;
      // params.AndLabelIds = searchInfo.labelIds;
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

  private _listAiopCameras(params: GetCamerasParams) {
    return this._aiCameraRequest.list(params)
  }

}