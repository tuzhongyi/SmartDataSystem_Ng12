import { Injectable } from "@angular/core";
import { LocaleCompare } from "src/app/common/tools/locale-compare";
import { AIModelManageConverter } from "src/app/converter/ai-model-manage.converter";
import { PagedList } from "src/app/network/model/page_list.model";
import { GetAIModelsParams } from "src/app/network/request/camera-ai-model/camera-ai-model.params";
import { CameraAIModelRequestService } from "src/app/network/request/camera-ai-model/camera-ai-model.service";
import { AIModelManageModel } from "src/app/view-model/ai-model-manage.model";

@Injectable()
export class AIModelManageBusiness {

  constructor(private _service: CameraAIModelRequestService, private _converter: AIModelManageConverter) {

  }
  async init(pageIndex: number = 1, pageSize: number = 9) {

    let params: GetAIModelsParams = new GetAIModelsParams();
    params.PageIndex = pageIndex;
    params.PageSize = pageSize;

    let list = await this.list(params);
    console.log(list)

    let data = this._converter.iterateToModel(list.Data);
    data = data.sort((a, b) => {
      return LocaleCompare.compare(a.ModelName ?? "", b.ModelName ?? "")
    })

    let res: PagedList<AIModelManageModel> = {
      Page: list.Page,
      Data: data,
    };

    return res;
  }
  private list(params: GetAIModelsParams) {
    return this._service.list(params)
  }


  async search(condition: string = '') {
    let params = new GetAIModelsParams();
    params.ModelName = condition;

    let records = await this._service.list(params);
    let models = this._converter.iterateToModel(records.Data)

    let res: PagedList<AIModelManageModel> = {
      Page: records.Page,
      Data: models,
    };

    return res;
  }
}