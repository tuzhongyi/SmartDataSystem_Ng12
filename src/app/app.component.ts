import { Component } from '@angular/core';
import zh from '@angular/common/locales/zh';
import { registerLocaleData } from '@angular/common';

registerLocaleData(zh, 'zh-CN');

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet> `,
})
export class AppComponent {
  title = 'waste';
  constructor() {
    console.log();
  }
}
