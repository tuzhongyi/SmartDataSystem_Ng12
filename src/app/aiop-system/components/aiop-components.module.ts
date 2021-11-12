/*
 * @Author: pmx
 * @Date: 2021-09-15 14:27:53
 * @Last Modified by: pmx
 * @Last Modified time: 2021-11-09 09:34:05
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelloComponent } from './hello/hello.component';
import { HowellModule } from 'src/app/common/howell.module';
import { MaterialModule } from 'src/app/material.module';
import { SystemManageComponent } from './system-manage/system-manage.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [HelloComponent, SystemManageComponent],
  imports: [CommonModule, HowellModule, MaterialModule, RouterModule],
})
export class AiopComponentsModule {}
