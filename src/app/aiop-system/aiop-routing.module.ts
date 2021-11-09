/*
 * @Author: pmx
 * @Date: 2021-09-15 16:02:26
 * @Last Modified by: pmx
 * @Last Modified time: 2021-11-09 09:35:08
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelloComponent } from './components/hello/hello.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'hello',
  },
  {
    path: 'hello',
    component: HelloComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AiopRoutingModule {}
