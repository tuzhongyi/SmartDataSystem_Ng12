import { BaseAiopUrl } from '../../base.url';

export abstract class RegionsResourcesURL {


  static batch(regionId: string) {
    return `${BaseAiopUrl}/Regions/${regionId}/Resources`;
  }

  static item(regionId: string, resourceId: string) {
    return `${BaseAiopUrl}/Regions/${regionId}/Resources/${resourceId}`;
  }

}
