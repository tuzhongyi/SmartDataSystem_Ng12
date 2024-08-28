import { Member } from 'src/app/network/model/garbage-station/member.model';
import { GarbageStationUrl } from 'src/app/network/url/garbage/garbage-station.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../base-request-howell.service';

export class GarbageStationMumberRequestService {
  constructor(private basic: HowellBaseRequestService) {
    this.basicType = basic.type(Member);
  }
  private basicType: HowellBaseTypeRequestService<Member>;
  all(stationId: string): Promise<Member[]> {
    let url = GarbageStationUrl.member(stationId).basic();
    return this.basicType.getArray(url);
  }
  get(stationId: string, memberId: string): Promise<Member> {
    let url = GarbageStationUrl.member(stationId).item(memberId);
    return this.basicType.get(url);
  }
  create(stationId: string, member: Member): Promise<Member> {
    let url = GarbageStationUrl.member(stationId).item(member.Id);
    return this.basicType.post(url, member);
  }
  delete(stationId: string, memberId: string): Promise<Member> {
    let url = GarbageStationUrl.member(stationId).item(memberId);
    return this.basicType.delete(url);
  }
}
