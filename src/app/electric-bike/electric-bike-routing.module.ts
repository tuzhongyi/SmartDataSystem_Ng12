import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationService } from 'src/app/network/request/auth/auth-request.service';
import { ElectricBikeIndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: '',
    component: ElectricBikeIndexComponent,
    canActivate: [AuthorizationService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElectricBikeRoutingModule {}
