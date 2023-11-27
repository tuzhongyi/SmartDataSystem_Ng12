import { Component } from '@angular/core';

@Component({
  selector: 'audit-statistic-card',
  template: ` <div class="audit-statistic-card">
    <div class="audit-statistic-card-inner">
      <ng-content></ng-content>
    </div>
  </div>`,
  styleUrls: ['../audit.less'],
})
export class AuditStatisticCardComponent {}
