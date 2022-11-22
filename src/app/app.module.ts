import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptorServiceService } from './network/request/app-interceptor-service.service';

import { ToastrModule } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

import zh from '@angular/common/locales/zh';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';

import 'src/assets/echart-theme/adsame.js';
// echarts.registerTheme('adsame', Adsame);

registerLocaleData(zh, 'zh-CN');

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 1500,
      extendedTimeOut: 1500,
      closeButton: false,
      progressBar: true,
      progressAnimation: 'increasing',
      tapToDismiss: true,
    }),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptorServiceService,
      multi: true,
    },
    CookieService,
    DatePipe,
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
