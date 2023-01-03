import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemModeComponent } from './system-mode/system-mode.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full',
  },
  {
    path: 'index',
    component: SystemModeComponent,
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class SystemManageRoutingModule {}
