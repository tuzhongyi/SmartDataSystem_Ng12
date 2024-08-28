import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColorTool } from 'src/app/common/tools/color-tool/color.tool';
import { Language } from 'src/app/common/tools/language';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { AuditListStationGarbageManagerTabCameraConverter } from './audit-list-station-garbage-manager-tab-camera.converter';
import { AuditListStationGarbageManagerTabCameraItem } from './audit-list-station-garbage-manager-tab-camera.model';

@Component({
  selector: 'audit-list-station-garbage-manager-tab-camera',
  templateUrl: './audit-list-station-garbage-manager-tab-camera.component.html',
  styleUrls: ['./audit-list-station-garbage-manager-tab-camera.component.less'],
})
export class AuditListStationGarbageManagerTabCameraComponent
  implements OnInit
{
  @Input() model?: GarbageStation;
  @Output() video: EventEmitter<Camera> = new EventEmitter();
  constructor() {}

  datas: AuditListStationGarbageManagerTabCameraItem[] = [];
  converter = new AuditListStationGarbageManagerTabCameraConverter();
  selected?: AuditListStationGarbageManagerTabCameraItem;
  Language = Language;
  Color = ColorTool;

  ngOnInit(): void {
    if (this.model && this.model.Cameras) {
      this.datas = this.model.Cameras.map((x) => {
        return this.converter.convert(x);
      });
      if (this.datas && this.datas.length > 0) {
        this.selected = this.datas[0];
      }
    }
  }
  onvideo() {
    this.video.emit(this.selected);
  }
}
