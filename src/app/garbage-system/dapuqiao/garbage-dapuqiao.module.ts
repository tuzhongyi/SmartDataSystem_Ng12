import { AsyncPipe, CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GarbageComponentsModule } from '../components/garbage-components.module';
import { DapuqiaoGarbageDropStationWindowCountComponent } from './components/dapuqiao-garbage-drop-station-window-count/dapuqiao-garbage-drop-station-window-count.component';
import { GarbageDaPuQiaoRoutingModule } from './garbage-dapuqiao-routing.module';

@NgModule({
  declarations: [],
  exports: [DapuqiaoGarbageDropStationWindowCountComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GarbageDaPuQiaoRoutingModule,
    GarbageComponentsModule,
  ],
  providers: [AsyncPipe],
})
export class GarbageDaPuQiaoModule {}
