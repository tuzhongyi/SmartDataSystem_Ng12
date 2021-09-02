import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'waste',
    loadChildren: () =>
      import('./waste-system/waste.module').then((mod) => mod.WasteModule),
  },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [RouterModule.forRoot(routes), FormsModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
