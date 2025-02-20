import { Injectable } from '@angular/core';
import { AccountOperationService } from 'src/app/common/components/account-operation/account-operation.service';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';
import { AuthorizationStore } from 'src/app/network/request/auth/authorization.store';
import { LoginConfigController } from './login-config.controller';

@Injectable()
export class LoginController {
  constructor(
    public config: LoginConfigController,
    public store: AuthorizationStore,
    private session: SessionStorageService,
    private local: LocalStorageService,
    private global: GlobalStorageService,
    private service: AccountOperationService
  ) {}
  init() {
    this.session.clear();
    this.local.clear();
    this.global.destroy();
    this.service.clear();
  }
}
export const LoginControllerProvider = [
  LoginConfigController,
  LoginController,
  AccountOperationService,
];
