import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthorizationService } from './network/request/auth/auth-request.service';
import { RoutePath } from './app-routing.path';

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
    path: RoutePath.aiop,
    loadChildren: () =>
      import('./aiop-system/aiop.module').then((mod) => mod.AiopModule),
    canActivate: [AuthorizationService],
  },
  {
    path: RoutePath.garbage_system,
    loadChildren: () =>
      import('./garbage-system/garbage.module').then(
        (mod) => mod.GarbageModule
      ),
    canActivate: [AuthorizationService],
  },
  {
    path: RoutePath.garbage_system_committees,
    loadChildren: () =>
      import('./garbage-system/committees/garbage-committees.module').then(
        (mod) => mod.GarbageCommitteesModule
      ),
    canActivate: [AuthorizationService],
  },
  {
    path: RoutePath.password_get_back,
    loadChildren: () =>
      import('./password-get-back/password-get-back.module').then(
        (mod) => mod.PasswordGetBackModule
      ),
  },
  {
    path: RoutePath.password_to_change,
    loadChildren: () =>
      import('./password-to-change/password-to-change.module').then(
        (mod) => mod.PasswordToChangeModule
      ),
    canActivate: [AuthorizationService],
  },
  {
    path: RoutePath.garbage_remove,
    loadChildren: () =>
      import('./garbage-system/garbage-remove/garbage-remove.module').then(
        (mode) => mode.GarbageRemoveModule
      ),
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
