import { Injectable } from "@angular/core";
import { LocaleCompare } from "src/app/common/tools/locale-compare";
import { AICameraManageConverter } from "src/app/converter/ai-camera-manage.converter";
import { PagedList } from "src/app/network/model/page_list.model";
import { GetCamerasParams } from "src/app/network/request/ai-camera/ai-camera.params";
import { AICameraRequestService } from "src/app/network/request/ai-camera/ai-camera.service";
import { AICameraManageModel } from "src/app/view-model/ai-camera-manage.model";

@Injectable()
export class CameraManageBusiness {


  constructor(private _aiCameraRequest: AICameraRequestService, private _converter: AICameraManageConverter) { }

  async init(condition: string = '', pageIndex: number = 1, pageSize: number = 9) {

    let params = new GetCamerasParams();
    params.PageIndex = pageIndex;
    params.PageSize = pageSize;
    params.Name = condition;

    let tmp = await this._listAiopCameras(params);

    let data = this._converter.iterateToModel(tmp.Data);

    data = data.sort((a, b) => {
      return LocaleCompare.compare(a.CameraName ?? "", b.CameraName ?? "")
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