/*
 * @Author: pmx
 * @Date: 2021-09-15 14:27:53
 * @Last Modified by: pmx
 * @Last Modified time: 2021-12-21 16:11:26
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HowellModule } from 'src/app/common/howell.module';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { SystemModeComponent } from './system-mode/system-mode.component';
import { AiopManageComponent } from './aiop-manage/aiop-manage.component';
import { MonitorPlatformComponent } from './monitor-platform/index/monitor-platform.component';
import { DivisionManageComponent } from './monitor-platform/division-manage/division-manage.component';
import { IllegalDropComponent } from './garbage-events/illegal-drop/illegal-drop.component';
import { GarbageEventsComponent } from './garbage-events/index/garbage-events.component';
@NgModule({
  declarations: [
    SystemModeComponent,
    AiopManageComponent,
    MonitorPlatformComponent,
    DivisionManageComponent,
    GarbageEventsComponent,
    IllegalDropComponent,
  ],
  imports: [CommonModule, HowellModule, MaterialModule, RouterModule],
})
export class AiopComponentsModule {}
