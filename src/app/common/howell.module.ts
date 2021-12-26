/*
 * @Author: pmx
 * @Date: 2021-09-26 14:26:27
 * @Last Modified by: pmx
 * @Last Modified time: 2021-12-26 13:09:36
 */
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { CUSTOM_COMPONENTS } from './components';
import { CUSTOM_PIPES } from './pipes';

import { AngularResizeEventModule } from 'angular-resize-event';

@NgModule({
  declarations: [CUSTOM_COMPONENTS, CUSTOM_PIPES],
  exports: [CUSTOM_COMPONENTS, CUSTOM_PIPES],
  imports: [CommonModule, MaterialModule, AngularResizeEventModule],
  providers: [],
})
export class HowellModule {}
