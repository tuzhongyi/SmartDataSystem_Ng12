import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from '../../model/member.model';
import { PagedList } from '../../model/page_list.model';
import { MemberUrl } from '../../url/garbage/member.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../base-request-howell.service';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import { GetMembersParams } from './member-request.params';
@Injectable({
  providedIn: 'root',
})
export class MemberRequsetService {
  private basic: HowellBaseRequestService;
  private type: HowellBaseTypeRequestService<Member>;
  constructor(http: HowellAuthHttpService, router: Router) {
    this.basic = new HowellBaseRequestService(http, router);
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
    if (!this._relation) {
      this._relation = new RelationsService(this.basic);
    }
    return this._relation;
  }
}

class RelationsService {
  constructor(private basic: HowellBaseRequestService) {}
  async sync(): Promise<string> {
    let url = MemberUrl.relation.sync();
    let response = await this.basic.http.howellPost(url).toPromise();
    return response.Data;
  }
}
