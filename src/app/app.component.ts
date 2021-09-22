import { Component, Injector, LOCALE_ID } from '@angular/core';
import { getCurrencySymbol, getLocaleCurrencyCode } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet> `,
})
export class AppComponent {
  title = 'waste';
  constructor(private injector: Injector) {
    console.log(injector.get(LOCALE_ID));
  }
}
