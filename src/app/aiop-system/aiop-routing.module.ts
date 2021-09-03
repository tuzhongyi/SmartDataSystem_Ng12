import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AiopComponent } from './aiop.component';

const routes: Routes = [
  {
    path: '',
    component: AiopComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AiopRoutingModule {}
