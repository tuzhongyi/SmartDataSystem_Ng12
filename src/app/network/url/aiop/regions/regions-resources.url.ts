import { BaseUrl } from '../../base.url';

export abstract class RegionsResourcesURL {
  static batch(regionId: string) {
    return `${BaseUrl.aiop_service}/Regions/${regionId}/Resources`;
  }

  static item(regionId: string, resourceId: string) {
    return `${BaseUrl.aiop_service}/Regions/${regionId}/Resources/${resourceId}`;
  }
}
