import { IBusiness } from 'src/app/business/Ibusiness';
import { Member } from '../../model/member.model';
import { PagedList } from '../../model/page-list.model';
import { MemberUrl } from '../../url/garbage/member.url';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../base-request.service';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import { IParams } from '../IParams.interface';
import { GetMembersParams } from './member-request.params';

export class MemberRequsetService implements IBusiness<Member> {
  private basic: BaseRequestService;
  private type: BaseTypeRequestService<Member>;
  constructor(private _http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(_http);
    this.type = this.basic.type(Member);
  }

  get(id: string): Promise<Member> {
    let url = MemberUrl.basic();
    return this.type.get(url);
  }
  update(data: Member): Promise<Member> {
    let url = MemberUrl.item(data.Id);
    return this.type.put(url, data);
  }
  create(data: Member): Promise<Member> {
    let url = MemberUrl.basic();
    return this.type.post(url, data);
  }
  delete(id: string): Promise<Member> {
    let url = MemberUrl.item(id);
    return this.type.delete(url);
  }
  list(
    params: GetMembersParams = new GetMembersParams()
  ): Promise<PagedList<Member>> {
    let url = MemberUrl.list();
    return this.type.paged(url, params);
  }

  private _relation?: RelationsService;
  public get relation(): RelationsService {
    if(!this._relation){
      this._relation = new RelationsService(this.basic);
    }
    return this._relation;
  }
}

class RelationsService {
  constructor(private basic: BaseRequestService) {}
  async sync(): Promise<string> {
    let url = MemberUrl.relation.sync();
    let response = await this.basic.http.post(url).toPromise();
    return response.Data;
  }
}
