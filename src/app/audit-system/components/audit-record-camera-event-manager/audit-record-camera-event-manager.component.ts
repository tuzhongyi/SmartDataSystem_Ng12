import { Component, EventEmitter, OnInit } from '@angular/core';
import { AIOPRecordCameraEventTableArgs } from 'src/app/common/components/tables/aiop-record-camera-event-table/aiop-record-camera-event-table.model';
import { PlayMode } from 'src/app/common/components/video-player/video.model';
import { Language } from 'src/app/common/tools/language';
import { Medium } from 'src/app/common/tools/medium';
import { EventType } from 'src/app/enum/event-type.enum';
import { CameraAIEventRecord } from 'src/app/network/model/garbage-station/camera-ai-event-record.model';
import { CameraAIModel } from 'src/app/network/model/garbage-station/camera-ai.model';
import { AuditRecordCameraEventManagerBusiness } from './audit-record-camera-event-manager.business';
import { AuditRecordCameraEventManagerWindow } from './audit-record-camera-event-manager.window';

@Component({
  selector: 'audit-record-camera-event-manager',
  templateUrl: './audit-record-camera-event-manager.component.html',
  styleUrls: [
    '../audit.less',
    './audit-record-camera-event-manager.component.less',
  ],
  providers: [AuditRecordCameraEventManagerBusiness],
})
export class AuditRecordCameraEventManagerComponent implements OnInit {
  args = new AIOPRecordCameraEventTableArgs();
  load = new EventEmitter<AIOPRecordCameraEventTableArgs>();
  EventType = EventType;
  PlayMode = PlayMode;
  Language = Language;
  ai_models: CameraAIModel[] = [];
  window = new AuditRecordCameraEventManagerWindow();
  constructor(private business: AuditRecordCameraEventManagerBusiness) {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.business.models().then((x) => {
      this.ai_models = x;
    });
  }

  onvideo(item: CameraAIEventRecord) {
    this.window.video.time = item.EventTime;
    this.window.video.cameraId = item.ResourceId;
    this.window.video.title = item.ResourceName;
    this.window.video.show = true;
  }

  onimage(item: CameraAIEventRecord) {
    this.window.image.title = item.ResourceName;
    this.window.image.url = Medium.img(item.ImageUrl);
    this.window.image.show = true;
  }

  onsearch() {
    this.args.tofirst = true;
    this.load.emit(this.args);
  }
}
