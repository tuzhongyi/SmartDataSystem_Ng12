import { NgModule } from '@angular/core';
import { GarbageRemoveComponentsModule } from './components/garbage-remove-components.module';
import { GarbageRemoveIndexComponent } from './components/garbage-remove-index/garbage-remove-index.component';
import { GarbageRemoveRoutingModule } from './garbage-remove-routing.module';

@NgModule({
  declarations: [],
  imports: [GarbageRemoveRoutingModule, GarbageRemoveComponentsModule],
})
export class GarbageRemoveModule {}
