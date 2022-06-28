/*
 * @Author: pmx
 * @Date: 2021-09-26 14:26:27
 * @Last Modified by: pmx
 * @Last Modified time: 2022-06-28 15:14:56
 */
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { CUSTOM_COMPONENTS } from './components';
import { CUSTOM_PIPES } from './pipes';

import { AngularResizeEventModule } from 'angular-resize-event';
import { CUSTOM_DIRECTIVES } from './directives';
import { FormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';

import Adsame from 'src/assets/echart-theme/adsame.json';

//内置主题
import 'echarts/theme/shine.js';
import 'echarts/theme/vintage.js';
import { RouterModule } from '@angular/router';
import { TouchSpinDirective } from './directives/touch-spin.directive';

echarts.registerTheme('adsame', Adsame);

@NgModule({
  declarations: [...CUSTOM_COMPONENTS, ...CUSTOM_PIPES, ...CUSTOM_DIRECTIVES],
  exports: [...CUSTOM_COMPONENTS, ...CUSTOM_PIPES, ...CUSTOM_DIRECTIVES],
  imports: [
    CommonModule,
    MaterialModule,
    AngularResizeEventModule,
    FormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  providers: [],
})
export class HowellModule { }
