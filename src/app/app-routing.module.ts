import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthorizationService } from './network/request/auth/auth-request.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'garbage-system',
    loadChildren: () =>
      import('./garbage-system/garbage.module').then(
        (mod) => mod.GarbageModule
      ),
    canActivate: [AuthorizationService],
  },
  {
    path: 'aiop',
    loadChildren: () =>
      import('./aiop-system/aiop.module').then((mod) => mod.AiopModule),
    canActivate: [AuthorizationService],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
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
