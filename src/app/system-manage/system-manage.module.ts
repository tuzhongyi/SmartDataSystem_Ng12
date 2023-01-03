import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemManageRoutingModule } from './system-manage-routing.module';
import { SystemModeComponent } from './system-mode/system-mode.component';
import { MaterialModule } from '../material.module';
import { HowellModule } from '../common/howell.module';

@NgModule({
  declarations: [SystemModeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    HowellModule,
    SystemManageRoutingModule,
  ],
})
export class SystemManageModule {}
