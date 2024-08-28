import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { AuditCameraAbnormalTableArgs } from 'src/app/common/components/tables/audit-camera-abnormal-table/audit-camera-abnormal-table.model';
import { CameraAbnormalType } from 'src/app/enum/camera-abnormal-type.enum';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { AuditStatisticDataAbnormalCameraManagerProviders } from './audit-statistic-data-abnormal-camera-manager.provider';
import { AuditStatisticDataAbnormalCameraManagerController } from './controllers/audit-statistic-data-abnormal-camera-manager.controller';
import { AuditStatisticDataAbnormalCameraManagerWindow } from './windows/audit-statistic-data-abnormal-camera-manager.window';

@Component({
  selector: 'audit-statistic-data-abnormal-camera-manager',
  templateUrl: './audit-statistic-data-abnormal-camera-manager.component.html',
  styleUrls: ['./audit-statistic-data-abnormal-camera-manager.component.less'],
  providers: [...AuditStatisticDataAbnormalCameraManagerProviders],
})
export class AuditStatisticDataAbnormalCameraManagerComponent
  implements OnInit
{
  @Input() divisionId?: string;
  @Input() hour?: number;
  @Input() type?: CameraAbnormalType;

  constructor(
    public controller: AuditStatisticDataAbnormalCameraManagerController,
    public window: AuditStatisticDataAbnormalCameraManagerWindow
  ) {}

  args = new AuditCameraAbnormalTableArgs();
  load = new EventEmitter<AuditCameraAbnormalTableArgs>();

  ngOnInit(): void {
    this.args.divisionId = this.divisionId;
    this.args.hour = this.hour;
    this.args.type = this.type;
  }

  onsearch() {
    this.load.emit(this.args);
  }
  onvideo(data: Camera) {
    this.window.video.title = data.Name;
    this.window.video.cameraId = data.Id;
    this.window.video.show = true;
  }
}
