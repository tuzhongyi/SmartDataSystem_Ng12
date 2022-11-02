import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GarbageRemoveIndexComponent } from './components/garbage-remove-index/garbage-remove-index.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full',
  },
  {
    path: 'index',
    component: GarbageRemoveIndexComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GarbageRemoveRoutingModule {}
