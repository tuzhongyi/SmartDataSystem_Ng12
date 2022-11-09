import { BasicUrl.aiop } from '../../base.url';

export abstract class RegionsResourcesURL {


  static batch(regionId: string) {
    return `${BasicUrl.aiop}/Regions/${regionId}/Resources`;
  }

  static item(regionId: string, resourceId: string) {
    return `${BasicUrl.aiop}/Regions/${regionId}/Resources/${resourceId}`;
  }

}
