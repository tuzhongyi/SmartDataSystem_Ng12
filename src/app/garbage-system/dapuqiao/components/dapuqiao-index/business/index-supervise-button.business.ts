import { Injectable } from '@angular/core';
import { IndexWindowBussiness } from './index-window.business';

@Injectable()
export class IndexSuperviseButton {
  constructor(private window: IndexWindowBussiness) {}

  onclick() {
    this.window.supervise.table.show = !this.window.supervise.table.show;
  }
}
