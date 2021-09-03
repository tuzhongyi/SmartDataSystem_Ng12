import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WasteComponent } from './waste.component';

const routes: Routes = [
  {
    path: '',
    component: WasteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WasteRoutingModule {}
