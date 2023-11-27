import { Injectable } from '@angular/core';
import { AuditStatisticEventImageArrayWindow } from './audit-statistic-event-image-array.window';
import { AuditStatisticEventImagePageWindow } from './audit-statistic-event-image-page.window';

@Injectable()
export class AuditStatisticEventImageWindow {
  constructor(
    public array: AuditStatisticEventImageArrayWindow,
    public page: AuditStatisticEventImagePageWindow
  ) {}
}
