import { Component, OnDestroy, OnInit } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { CameraAbnormalType } from 'src/app/enum/camera-abnormal-type.enum';
import { GarbageStationAbnormalType } from 'src/app/enum/garbage-station-abnormal-type.enum';
import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';
import { AuditStatisticDataCountDeviceDetailsArgs } from '../audit-statistic-data-count-device/audit-statistic-data-count-device.model';
import { AuditStatisticDataCountStationDetailsArgs } from '../audit-statistic-data-count-station/audit-statistic-data-count-station.model';
import { AuditStatisticDataProviders } from './audit-statistic-data.provider';
import { AuditStatisticDataController } from './controller/audit-statistic-data.controller';
import { AuditStatisticDataWindow } from './windows/audit-statistic-data.window';

@Component({
  selector: 'audit-statistic-data',
  templateUrl: './audit-statistic-data.component.html',
  styleUrls: ['../audit.less', './audit-statistic-data.component.less'],
  providers: [...AuditStatisticDataProviders],
})
export class AuditStatisticDataComponent implements OnInit, OnDestroy {
  key = 'audit-statistic-data';
  constructor(
    private global: GlobalStorageService,
    public window: AuditStatisticDataWindow,
    public controller: AuditStatisticDataController
  ) {}

  data?: DivisionNumberStatistic;
  GarbageStationAbnormalType = GarbageStationAbnormalType;
  CameraAbnormalType = CameraAbnormalType;

  ngOnDestroy(): void {
    this.global.interval.unsubscribe(this.key);
  }

  ngOnInit(): void {
    this.global.interval.subscribe(this.key, () => {
      this.controller.load();
    });
    this.global.interval.run();

    this.controller.filter.selection.select.subscribe((x) => {
      let divisionId = x?.Id;
      this.window.station.divisionId = divisionId;
      this.window.device.divisionId = divisionId;
      this.controller.load();
    });
    this.controller.load();
  }

  onstation(args: AuditStatisticDataCountStationDetailsArgs) {
    this.window.station.state = args.state;
    this.window.station.drop = args.drop;

    this.window.station.show = true;
  }
  ondevice(args: AuditStatisticDataCountDeviceDetailsArgs) {
    this.window.device.status = args.status;
    this.window.device.show = true;
  }
  onhour() {
    this.controller.load();
  }
  onabnormalstation(type?: GarbageStationAbnormalType, hour?: number) {
    this.window.abnormal.station.divisionId =
      this.controller.filter.selection.selected?.Id;
    this.window.abnormal.station.hour = hour ?? this.controller.filter.hour;
    this.window.abnormal.station.type = type;
    this.window.abnormal.station.show = true;
  }
  onabnormalcamera(type?: CameraAbnormalType, hour?: number) {
    this.window.abnormal.camera.divisionId =
      this.controller.filter.selection.selected?.Id;
    this.window.abnormal.camera.hour = hour ?? this.controller.filter.hour;
    this.window.abnormal.camera.type = type;
    this.window.abnormal.camera.show = true;
  }
}
