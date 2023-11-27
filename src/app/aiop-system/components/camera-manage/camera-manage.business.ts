import { Injectable } from '@angular/core';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { AICameraManageConverter } from 'src/app/converter/ai-camera-manage.converter';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetResourceCamerasParams } from 'src/app/network/request/resources/camera/resource-camera.params';
import { ResourceRequestService } from 'src/app/network/request/resources/resource.service';
import {
  AICameraManageModel,
  AICameraManageSearchInfo,
} from 'src/app/view-model/ai-camera-manage.model';

@Injectable()
export class CameraManageBusiness {
  constructor(
    private service: ResourceRequestService,
    private _converter: AICameraManageConverter
  ) {}

  async init(
    regionId: string,
    searchInfo: AICameraManageSearchInfo,
    pageIndex: number = 1,
    pageSize: number = 9
  ) {
    let params = new GetResourceCamerasParams();
    params.PageIndex = pageIndex;
    params.PageSize = pageSize;

    if (regionId == 'null') {
      params.RegionIdNullable = true;
    } else {
      params.RegionIds = [regionId];
    }
    if (!searchInfo.Filter) {
      params.Name = searchInfo.Condition;
    } else {
      params.Name = searchInfo.CameraName;
      if (searchInfo.CameraType) params.CameraTypes = [+searchInfo.CameraType];
      if (searchInfo.DeviceId) params.EncodeDeviceIds = [searchInfo.DeviceId];
      params.AndLabelIds = searchInfo.LabelIds;
    }

    let { Data, Page } = await this._listAiopCameras(params);

    let data = await this._converter.iterateToModel(Data);

    data = data.sort((a, b) => {
      return LocaleCompare.compare(a.Name ?? '', b.Name ?? '');
    });

    let res: PagedList<AICameraManageModel> = {
      Page,
      Data: data,
    };

    return res;
  }
  listEncodeDevice() {
    return this.service.encodeDevice.list();
  }
  deleteAICamera(id: string) {
    return this.service.camera.delete(id);
  }
  private _listAiopCameras(params: GetResourceCamerasParams) {
    return this.service.camera.list(params);
  }
}
