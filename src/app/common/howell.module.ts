/*
 * @Author: pmx
 * @Date: 2021-09-26 14:26:27
 * @Last Modified by: pmx
 * @Last Modified time: 2021-09-28 14:38:44
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { CUSTOM_COMPONENTS } from './components';
import { CUSTOM_PIPES } from './pipes';

import { AngularResizeEventModule } from 'angular-resize-event';

@NgModule({
  declarations: [CUSTOM_COMPONENTS, CUSTOM_PIPES],
  imports: [CommonModule, MaterialModule, AngularResizeEventModule],
  exports: [CUSTOM_COMPONENTS, CUSTOM_PIPES],
  providers: [],
})
export class HowellModule {}
