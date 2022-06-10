import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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
    path: RoutePath.passwordGetBack,
    loadChildren: () =>
      import('./password-get-back/password-get-back.module').then(
        (mod) => mod.PasswordGetBackModule
      ),
  },
  {
    path: RoutePath.passwordToChange,
    loadChildren: () =>
      import('./password-to-change/password-to-change.module').then(
        (mod) => mod.PasswordToChangeModule
      ),
  },
  // {
  //   path: '**',
  //   redirectTo: 'login',
  // },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
