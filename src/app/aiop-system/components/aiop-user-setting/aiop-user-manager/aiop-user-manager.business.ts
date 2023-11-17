import { Injectable } from '@angular/core';
import { UserRequestService } from 'src/app/network/request/user/user-request.service';

@Injectable()
export class AIOPUserManagerBusiness {
  constructor(private service: UserRequestService) {}
  delete(ids: string[]) {
    let all = ids.map((x) => {
      return this.service.delete(x);
    });
    return Promise.all(all);
  }
}
