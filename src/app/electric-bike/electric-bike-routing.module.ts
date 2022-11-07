import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationService } from 'src/app/network/request/auth/auth-request.service';
import { ElectricBikeRoutingPath } from './electric-bike-routing.path';
import { ElectricBikeIndexComponent } from './index/index.component';
import { ElectricBikeWidescreenIndexComponent } from './widescreen/index/widescreen-index.component';

const routes: Routes = [
  {
    path: '',
    component: ElectricBikeIndexComponent,
    canActivate: [AuthorizationService],
  },
  {
    path: ElectricBikeRoutingPath.widescreen_index,
    component: ElectricBikeWidescreenIndexComponent,
    canActivate: [AuthorizationService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElectricBikeRoutingModule {}
