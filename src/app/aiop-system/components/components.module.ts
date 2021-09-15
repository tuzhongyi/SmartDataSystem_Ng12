/*
 * @Author: pmx
 * @Date: 2021-09-15 14:27:53
 * @Last Modified by: pmx
 * @Last Modified time: 2021-09-15 14:46:12
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelloComponent } from './hello/hello.component';
@NgModule({
  declarations: [HelloComponent],
  imports: [CommonModule],
  exports: [HelloComponent],
})
export class AiopComponentsModule {}
