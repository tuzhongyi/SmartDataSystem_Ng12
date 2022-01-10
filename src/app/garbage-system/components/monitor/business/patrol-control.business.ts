import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window/window.model';

@Injectable()
export class PatrolControlBusiness extends WindowViewModel {
  onclose() {
    this.show = false;
  }
}
