import { NgModule } from '@angular/core';
import { GarbageRoutingModule } from './garbage-routing.module';
import { GarbageComponent } from './garbage.component';
import { GarbageComponentsModule } from './components/garbage-components.module';
import { AsyncPipe } from '@angular/common';

@NgModule({
  declarations: [GarbageComponent],
  exports: [],
  imports: [GarbageRoutingModule, GarbageComponentsModule],
  providers: [
    AsyncPipe
  ]
})
export class GarbageModule { }
