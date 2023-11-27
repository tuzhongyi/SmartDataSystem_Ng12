import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';

@Injectable()
export class AuditStatisticEventTaskWindow extends WindowViewModel {
  clear() {
    this.divisionId = undefined;
  }
  style = { width: '80%', height: '732px' };
  divisionId?: string;
}
