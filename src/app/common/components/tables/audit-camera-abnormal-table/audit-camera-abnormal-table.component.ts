import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { IAuditGarbageStationDetailsTableArgs } from '../audit-garbage-station-details-table/audit-garbage-station-details-table.model';
import { AuditCameraAbnormalTableArgs } from './audit-camera-abnormal-table.model';
import { AuditCameraAbnormalTableProviders } from './audit-camera-abnormal-table.provider';
import { AuditCameraAbnormalTableBusiness } from './business/audit-camera-abnormal-table.business';

@Component({
  selector: 'audit-camera-abnormal-table',
  templateUrl: './audit-camera-abnormal-table.component.html',
  styleUrls: ['./audit-camera-abnormal-table.component.less'],
  providers: [...AuditCameraAbnormalTableProviders],
})
export class AuditCameraAbnormalTableComponent implements OnInit {
  @Input() args: IAuditGarbageStationDetailsTableArgs =
    new AuditCameraAbnormalTableArgs();
  @Input() load?: EventEmitter<IAuditGarbageStationDetailsTableArgs>;
  @Output() video = new EventEmitter<Camera>();
  constructor(public business: AuditCameraAbnormalTableBusiness) {}

  ngOnInit(): void {}
  onvideo(data: Camera) {
    this.video.emit(data);
  }
}
