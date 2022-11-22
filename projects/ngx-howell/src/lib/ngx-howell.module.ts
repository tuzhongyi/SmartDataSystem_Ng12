import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { HW_COMPONENTS } from './components/component';

export interface NgxHowellConfig {
  [key: string]: any;
}

export const NGX_HOWELL_TOKEN = new InjectionToken('NGX_HOWELL');

@NgModule({
  declarations: [...HW_COMPONENTS],
  imports: [
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  exports: [...HW_COMPONENTS],
})
export class NgxHowellModule {
  static forRoot(
    config: NgxHowellConfig
  ): ModuleWithProviders<NgxHowellModule> {
    return {
      ngModule: NgxHowellModule,
      providers: [
        {
          provide: NGX_HOWELL_TOKEN,
          useValue: config,
        },
      ],
    };
  }
}
