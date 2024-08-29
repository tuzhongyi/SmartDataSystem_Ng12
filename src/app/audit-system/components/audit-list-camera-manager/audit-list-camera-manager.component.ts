import { Component, EventEmitter, OnInit } from '@angular/core';
import {
  AuditCameraDetailsTableArgs,
  IAuditCameraDetailsTableArgs,
} from 'src/app/common/components/tables/audit-camera-details-table/audit-camera-details-table.model';
import { Language } from 'src/app/common/tools/language';
import { CameraClassification } from 'src/app/enum/camera-classification.enum';
import { CameraEncodeType } from 'src/app/enum/camera-type.enum';
import { CameraUsage } from 'src/app/enum/camera-usage.enum';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { AuditListCameraManagerProviders } from './audit-list-camera-manager.provider';
import { AuditListCameraManagerController } from './controller/audit-list-camera-manager.controller';

@Component({
  selector: 'audit-list-camera-manager',
  templateUrl: './audit-list-camera-manager.component.html',
  styleUrls: ['./audit-list-camera-manager.component.less'],
  providers: [...AuditListCameraManagerProviders],
})
export class AuditListCameraManagerComponent implements OnInit {
  constructor(public controller: AuditListCameraManagerController) {}

  args = new AuditCameraDetailsTableArgs();
  load = new EventEmitter<IAuditCameraDetailsTableArgs>();
  download = new EventEmitter<IAuditCameraDetailsTableArgs>();

  Language = Language;
  CameraUsage = CameraUsage;
  CameraType = CameraEncodeType;
  CameraClassification = CameraClassification;
  OnlineStatus = OnlineStatus;

  ngOnInit(): void {
    this.controller.division.select.subscribe((division) => {
      this.args.divisionId = division?.Id;
    });
  }

  onsearch() {
    this.load.emit(this.args);
  }
  ondownload() {
    this.download.emit(this.args);
  }

  onvideo(camera: Camera) {
    this.controller.window.video.title = camera.Name;
    this.controller.window.video.cameraId = camera.Id;
    this.controller.window.video.show = true;
  }
  onconfig() {
    this.controller.window.config.show = true;
  }
}
