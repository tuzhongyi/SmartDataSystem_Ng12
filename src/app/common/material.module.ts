/*
 * @Author: pmx
 * @Date: 2021-09-26 14:26:32
 * @Last Modified by: pmx
 * @Last Modified time: 2021-09-26 14:27:38
 *
 *  Angular官方组件库 Angular Material
 *  转发组件Module即可使用
 */
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  exports: [MatIconModule],
})
export class MaterialModule {}
