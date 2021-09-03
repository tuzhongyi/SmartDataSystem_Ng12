import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AiopRoutingModule } from './aiop-routing.module';
import { IndexComponent } from './index.component';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    AiopRoutingModule
  ]
})
export class AiopModule { }
