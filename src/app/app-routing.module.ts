import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoutePath } from './app-routing.path';
import { LoginComponent } from './login/login.component';
import { AuthorizationActivate } from './network/request/auth/authorization.activate';

const routes: Routes = [
  {
    path: '',
    redirectTo: RoutePath.login,
    pathMatch: 'full',
  },
  {
    path: RoutePath.login,
    component: LoginComponent,
  },
  {
    path: RoutePath.system_manage,
    loadChildren: () =>
      import('./system-manage/system-manage.module').then(
        (mod) => mod.SystemManageModule
      ),
    canActivate: [AuthorizationActivate],
  },
  {
    path: RoutePath.aiop,
    loadChildren: () =>
      import('./aiop-system/aiop.module').then((mod) => mod.AiopModule),
    canActivate: [AuthorizationActivate],
  },
  {
    path: RoutePath.audit,
    loadChildren: () =>
      import('./audit-system/audit.module').then((mod) => mod.AuditModule),
    canActivate: [AuthorizationActivate],
  },
  {
    path: RoutePath.garbage_system,
    loadChildren: () =>
      import('./garbage-system/garbage.module').then(
        (mod) => mod.GarbageModule
      ),
    canActivate: [AuthorizationActivate],
  },

  {
    path: RoutePath.dapuqiao,
    loadChildren: () =>
      import('./garbage-system/dapuqiao/garbage-dapuqiao.module').then(
        (mod) => mod.GarbageDaPuQiaoModule
      ),
    canActivate: [AuthorizationActivate],
  },
  {
    path: RoutePath.garbage_system_committees,
    loadChildren: () =>
      import('./garbage-system/committees/garbage-committees.module').then(
        (mod) => mod.GarbageCommitteesModule
      ),
    canActivate: [AuthorizationActivate],
  },
  // {
  //   path: RoutePath.password_get_back,
  //   loadChildren: () =>
  //     import('./password-get-back/password-get-back.module').then(
  //       (mod) => mod.PasswordGetBackModule
  //     ),
  // },
  // {
  //   path: RoutePath.password_to_change,
  //   loadChildren: () =>
  //     import('./password-to-change/password-to-change.module').then(
  //       (mod) => mod.PasswordToChangeModule
  //     ),
  //   canActivate: [AuthorizationActivate],
  // },
  {
    path: RoutePath.garbage_vehicle,
    loadChildren: () =>
      import(
        './garbage-system/garbage-collection/garbage-collection.module'
      ).then((mode) => mode.GarbageCollectionModule),
    canActivate: [AuthorizationActivate],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
