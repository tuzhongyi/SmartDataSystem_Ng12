import { Injectable } from '@angular/core';
import { AuditStatisticEventDropWindow } from './audit-statistic-event-drop.window';
import { AuditStatisticEventImageArrayWindow } from './audit-statistic-event-image-array.window';
import { AuditStatisticEventImagePageWindow } from './audit-statistic-event-image-page.window';
import { AuditStatisticEventImageWindow } from './audit-statistic-event-image.window';
import { AuditStatisticEventRecordWindow } from './audit-statistic-event-record.window';
import { AuditStatisticEventTaskWindow } from './audit-statistic-event-task.window';
import { AuditStatisticEventVideoWindow } from './audit-statistic-event-video.window';

@Injectable()
export class AuditStatisticEventWindow {
  constructor(
    public task: AuditStatisticEventTaskWindow,
    public record: AuditStatisticEventRecordWindow,
    public drop: AuditStatisticEventDropWindow,
    public image: AuditStatisticEventImageWindow,
    public video: AuditStatisticEventVideoWindow
  ) {}

  clear() {
    this.task.clear();
    this.record.clear();
    this.drop.clear();
  }
}

export const AuditStatisticEventWindows = [
  AuditStatisticEventWindow,
  AuditStatisticEventTaskWindow,
  AuditStatisticEventRecordWindow,
  AuditStatisticEventDropWindow,
  AuditStatisticEventImageArrayWindow,
  AuditStatisticEventImagePageWindow,
  AuditStatisticEventImageWindow,
  AuditStatisticEventVideoWindow,
];
