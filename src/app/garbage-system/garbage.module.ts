import { AsyncPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { GarbageComponentsModule } from './components/garbage-components.module';
import { GarbageRoutingModule } from './garbage-routing.module';
import { GarbageComponent } from './garbage.component';

@NgModule({
  declarations: [GarbageComponent],
  exports: [],
  imports: [GarbageRoutingModule, GarbageComponentsModule],
  providers: [AsyncPipe],
})
export class GarbageModule {}
