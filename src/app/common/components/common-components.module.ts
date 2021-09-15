/*
 * @Author: pmx
 * @Date: 2021-09-15 15:07:42
 * @Last Modified by: pmx
 * @Last Modified time: 2021-09-15 15:53:02
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [CommonModule],
  exports: [ToolbarComponent],
})
export class CommonComponentsModule {}
