import { Injectable } from '@angular/core';
import { RoleRequestService } from 'src/app/network/request/role/role-request.service';
import { UserRequestService } from 'src/app/network/request/user/user-request.service';

@Injectable()
export class AIOPUserDetailsService {
  constructor(
    public user: UserRequestService,
    public role: RoleRequestService
  ) {}
}
