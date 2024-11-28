import { Injectable } from '@angular/core';
import { AuthorizationStore } from 'src/app/network/request/auth/authorization.store';
import { LoginConfigController } from './login-config.controller';

@Injectable()
export class LoginController {
  constructor(
    public config: LoginConfigController,
    public store: AuthorizationStore
  ) {}
}
export const LoginControllerProvider = [LoginConfigController, LoginController];
