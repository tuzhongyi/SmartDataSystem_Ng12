import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationActivate } from 'src/app/network/request/auth/authorization.activate';
import { CommitteesIndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: '',
    component: CommitteesIndexComponent,
    canActivate: [AuthorizationActivate],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GarbageCommitteesRoutingModule {}
