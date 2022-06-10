import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationService } from '../network/request/auth/auth-request.service';
import { PasswordIndexComponent } from './index/password-index.component';

const routes: Routes = [
  {
    path: '',
    component: PasswordIndexComponent,
    canActivate: [AuthorizationService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasswordToChangeRoutingModule {}
