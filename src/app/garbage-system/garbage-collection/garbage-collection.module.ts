import { NgModule } from '@angular/core';
import { GarbageCollectionComponentsModule } from './components/garbage-vehicles-components.module';
import { GarbageCollectionIndexComponent } from './components/collection-index/collection-index.component';
import { GarbageCollectionRoutingModule } from './garbage-collection-routing.module';

@NgModule({
  declarations: [],
  imports: [GarbageCollectionRoutingModule, GarbageCollectionComponentsModule],
})
export class GarbageCollectionModule {}
