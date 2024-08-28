import { Component, EventEmitter, OnInit } from '@angular/core';
import {
  AuditGarbageStationDetailsTableArgs,
  IAuditGarbageStationDetailsTableArgs,
} from 'src/app/common/components/tables/audit-garbage-station-details-table/audit-garbage-station-details-table.model';
import { Language } from 'src/app/common/tools/language';
import { isEmpty } from 'src/app/common/tools/tool';
import { StationState } from 'src/app/enum/station-state.enum';
import { StationType } from 'src/app/enum/station-type.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { AuditListStationGarbageManagerProviders } from './audit-list-station-garbage-manager.provider';
import { AuditListStationGarbageManagerWindow } from './controller/audit-list-station-garbage-manager-window.controller';
import { AuditListStationGarbageManagerController } from './controller/audit-list-station-garbage-manager.controller';

@Component({
  selector: 'audit-list-station-garbage-manager',
  templateUrl: './audit-list-station-garbage-manager.component.html',
  styleUrls: ['./audit-list-station-garbage-manager.component.less'],
  providers: [...AuditListStationGarbageManagerProviders],
})
export class AuditListStationGarbageManagerComponent implements OnInit {
  constructor(
    public controller: AuditListStationGarbageManagerController,
    public window: AuditListStationGarbageManagerWindow
  ) {}

  args = new AuditGarbageStationDetailsTableArgs();
  load = new EventEmitter<IAuditGarbageStationDetailsTableArgs>();
  StationState = StationState;
  StationType = StationType;
  Language = Language;

  ngOnInit(): void {}

  onsearch() {
    this.load.emit(this.args);
  }
  ondropwindows(data: GarbageStation) {
    if (data.DropWindows && data.DropWindows.length > 0) {
      this.window.dropwindow.model = data;
      this.window.dropwindow.show = true;
    }
  }
  oncameras(data: GarbageStation) {
    if (data.Cameras && data.Cameras.length > 0) {
      this.window.camera.model = data;
      this.window.camera.show = true;
    }
  }
  ontrashcans(data: GarbageStation) {
    if (data.TrashCans && data.TrashCans.length > 0) {
      this.window.trashcan.model = data;
      this.window.trashcan.show = true;
    }
  }
  onmembers(data: GarbageStation) {
    if (data.Members && data.Members.length > 0) {
      this.window.member.model = data;
      this.window.member.show = true;
    }
  }
  oneventdisabled(data: GarbageStation) {
    if (data.DisableEventTypes && data.DisableEventTypes.length > 0) {
      this.window.eventdisabled.model = data;
      this.window.eventdisabled.show = true;
    }
  }
  onschedule(data: GarbageStation) {
    if (data.GarbageDeviceData) {
      this.window.schedule.model = data;
      this.window.schedule.show = true;
    }
  }
  onconstruction(data: GarbageStation) {
    if (data.ConstructionData) {
      this.window.construction.model = data;
      this.window.construction.show = true;
    }
  }
  onstatus(data: GarbageStation) {
    if (
      !isEmpty(data.GarbageDeviceData) ||
      !isEmpty(data.ConstructionData) ||
      !isEmpty(data.NBState)
    ) {
      this.window.status.model = data;
      this.window.status.show = true;
    }
  }
  oncommand(data: GarbageStation) {
    if (!isEmpty(data.GarbageDeviceData) || !isEmpty(data.NBState)) {
      this.window.command.model = data;
      this.window.command.show = true;
    }
  }
  onconfig() {
    this.window.config.show = true;
  }
  onvideomultiple(data: GarbageStation) {
    this.window.video.multiple.open(data);
  }
  ongcha(data: GarbageStation) {
    this.window.gcha.model = data;
    this.window.gcha.show = true;
  }
  onnbbox(data: GarbageStation) {
    this.window.nb.model = data;
    this.window.nb.show = true;
  }
  ondevice(data: GarbageStation) {
    this.window.device.model = data;
    this.window.device.show = true;
  }
}
