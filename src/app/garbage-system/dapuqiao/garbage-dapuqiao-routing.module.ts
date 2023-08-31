import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationService } from 'src/app/network/request/auth/auth-request.service';
import { DaPuQiaoIndexComponent } from './components/dapuqiao-index/dapuqiao-index.component';

const routes: Routes = [
  {
    path: '',
    component: DaPuQiaoIndexComponent,
    canActivate: [AuthorizationService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GarbageDaPuQiaoRoutingModule {}
