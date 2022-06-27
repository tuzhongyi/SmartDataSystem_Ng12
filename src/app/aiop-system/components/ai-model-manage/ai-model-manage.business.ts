import { Injectable } from "@angular/core";
import { LocaleCompare } from "src/app/common/tools/locale-compare";
import { AIModelManageConverter } from "src/app/converter/ai-model-manage.converter";
import { PagedList } from "src/app/network/model/page_list.model";
import { GetAIModelsParams } from "src/app/network/request/camera-ai-model/camera-ai-model.params";
import { CameraAIModelRequestService } from "src/app/network/request/camera-ai-model/camera-ai-model.service";
import { AIModelManageModel } from "src/app/view-model/ai-model-manage.model";

@Injectable()
export class AIModelManageBusiness {

  constructor(private _cameraAIModelRequest: CameraAIModelRequestService, private _converter: AIModelManageConverter) {

  }
  async init(condition: string = '', pageIndex: number = 1, pageSize: number = 9) {

    let params: GetAIModelsParams = new GetAIModelsParams();
    params.PageIndex = pageIndex;
    params.PageSize = pageSize;
    params.ModelName = condition;

    let tmp = await this.list(params);

    // console.log(tmp)

    let data = this._converter.iterateToModel(tmp.Data);
    data = data.sort((a, b) => {
      return LocaleCompare.compare(a.ModelName ?? "", b.ModelName ?? "")
    })

    let res: PagedList<AIModelManageModel> = {
      Page: tmp.Page,
      Data: data,
    };

    return res;
  }

  delete(id: string) {
    return this._cameraAIModelRequest.delete(id);
  }
  private list(params: GetAIModelsParams) {
    return this._cameraAIModelRequest.list(params)
  }



}