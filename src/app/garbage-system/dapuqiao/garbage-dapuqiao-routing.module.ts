import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationActivate } from 'src/app/network/request/auth/authorization.activate';
import { DaPuQiaoIndexComponent } from './components/dapuqiao-index/dapuqiao-index.component';

const routes: Routes = [
  {
    path: '',
    component: DaPuQiaoIndexComponent,
    canActivate: [AuthorizationActivate],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GarbageDaPuQiaoRoutingModule {}
