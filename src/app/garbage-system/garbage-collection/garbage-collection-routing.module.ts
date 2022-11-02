import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GarbageCollectionIndexComponent } from './components/collection-index/collection-index.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full',
  },
  {
    path: 'index',
    component: GarbageCollectionIndexComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GarbageCollectionRoutingModule {}
