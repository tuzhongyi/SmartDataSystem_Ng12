import { GarbageStationType } from 'src/app/network/model/garbage-station/garbage-station.model';
import { GarbageStationUrl } from 'src/app/network/url/garbage/garbage-station.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../base-request-howell.service';

export class GarbageStationTypeRequestService {
  constructor(private basic: HowellBaseRequestService) {
    this.basicType = basic.type(GarbageStationType);
  }
  private basicType: HowellBaseTypeRequestService<GarbageStationType>;
  list(): Promise<GarbageStationType[]> {
    let url = GarbageStationUrl.type.basic();
    return this.basicType.getArray(url);
  }
  create(type: GarbageStationType): Promise<GarbageStationType> {
    let url = GarbageStationUrl.type.basic();
    return this.basicType.post(url, type);
  }
  get(type: number): Promise<GarbageStationType> {
    let url = GarbageStationUrl.type.item(type);
    return this.basicType.get(url);
  }
  update(type: GarbageStationType): Promise<GarbageStationType> {
    let url = GarbageStationUrl.type.item(type.Type);
    return this.basicType.put(url, type);
  }
  delete(type: number): Promise<GarbageStationType> {
    let url = GarbageStationUrl.type.item(type);
    return this.basicType.delete(url);
  }
}
