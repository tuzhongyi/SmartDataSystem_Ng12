import { Component, Input, OnInit } from '@angular/core';
import { AuditStatisticDataNumberColor } from './audit-statistic-data-number.model';

@Component({
  selector: 'audit-statistic-data-number',
  templateUrl: './audit-statistic-data-number.component.html',
  styleUrls: ['./less/audit-statistic-data-number.component.less'],
})
export class AuditStatisticDataNumberComponent implements OnInit {
  @Input() title = '';
  @Input() value = 0;
  @Input() color?: AuditStatisticDataNumberColor;

  constructor() {}

  ngOnInit(): void {}
}
