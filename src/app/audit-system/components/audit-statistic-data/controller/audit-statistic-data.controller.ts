import { Injectable } from '@angular/core';
import { AuditStatisticDataFilterController } from './filter/audit-statistic-data-filter.controller';
import {
  AuditStatisticDataNumberController,
  AuditStatisticDataNumberControllers,
} from './number/audit-statistic-data-number.controller';
import {
  AuditStatisticDataStatisticController,
  AuditStatisticDataStatisticControllers,
} from './statistic/audit-statistic-data-statistic.controller';

@Injectable()
export class AuditStatisticDataController {
  constructor(
    public number: AuditStatisticDataNumberController,
    public statistic: AuditStatisticDataStatisticController
  ) {}

  filter = new AuditStatisticDataFilterController();

  load() {
    this.number.load(this.filter.selection.selected?.Id, this.filter.hour);
    this.statistic.load(this.filter.selection.selected?.Id, 0);
  }
}

export const AuditStatisticDataControllers = [
  AuditStatisticDataController,
  ...AuditStatisticDataNumberControllers,
  ...AuditStatisticDataStatisticControllers,
];
