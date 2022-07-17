import { Injectable } from "@angular/core";
import { ResourceLabel } from "../../model/resource-label.model";
import { Resource } from "../../model/resource.model";
import { ResourcesURL } from "../../url/aiop/resources/resources.url";
import { BaseRequestService, BaseTypeRequestService } from "../base-request.service";
import { HowellAuthHttpService } from "../howell-auth-http.service";
import { GetResourcesParams } from "./resources-params";

@Injectable({
  providedIn: "root",
})
export class ResourceRequestService {

  private basic: BaseRequestService;
  private type: BaseTypeRequestService<Resource>;


  constructor(_http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(_http);
    this.type = this.basic.type(Resource);
  }
  create(item: Resource) {

    return this.type.post(ResourcesURL.create(), item)
  }

  get(id: string) {
    return this.type.get(ResourcesURL.item(id));
  }

  update(item: Resource) {
    return this.type.put(ResourcesURL.item(item.Id), item)
  }
  del(id: string) {
    return this.type.delete(ResourcesURL.item(id));
  }

  list(params: GetResourcesParams) {

    return this.type.paged(ResourcesURL.list(), params);
  }
  listLabels(id: string) {
    return this.type.getArray(ResourcesURL.labels(id))
  }
  getLabel(resourceId: string, labelId: string) {
    return this.type.get(ResourcesURL.singleLabel(resourceId, labelId))
  }
  createLabel(resourceId: string, labelId: string) {
    return this.type.post(ResourcesURL.singleLabel(resourceId, labelId))
  }
  deleteLabel(resourceId: string, labelId: string) {
    return this.type.delete(ResourcesURL.singleLabel(resourceId, labelId))
  }
}
