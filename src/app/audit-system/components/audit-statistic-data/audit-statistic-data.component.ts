import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';
import { AuditStatisticDataCountDeviceDetailsArgs } from '../audit-statistic-data-count-device/audit-statistic-data-count-device.model';
import { AuditStatisticDataCountStationDetailsArgs } from '../audit-statistic-data-count-station/audit-statistic-data-count-station.model';
import { AuditStatisticPlusTool as AuditStatisticDataPlusTool } from './audit-statistic-data-plus.tool';
import {
  AuditStatisticDataWindow,
  AuditStatisticDataWindows,
} from './audit-statistic-data-windows/audit-statistic-data.window';
import { AuditStatisticBusiness as AuditStatisticDataBusiness } from './audit-statistic-data.business';
import { AuditStatisticDataSelection } from './audit-statistic-data.selection';
import { AuditStatisticDataService } from './audit-statistic-data.service';

@Component({
  selector: 'audit-statistic-data',
  templateUrl: './audit-statistic-data.component.html',
  styleUrls: ['../audit.less', './audit-statistic-data.component.less'],
  providers: [
    AuditStatisticDataPlusTool,
    AuditStatisticDataService,
    AuditStatisticDataBusiness,
    ...AuditStatisticDataWindows,
  ],
})
export class AuditStatisticDataComponent implements OnInit, OnDestroy {
  load = new EventEmitter();
  key = 'audit-statistic-data';
  constructor(
    private business: AuditStatisticDataBusiness,
    private global: GlobalStorageService,
    public window: AuditStatisticDataWindow
  ) {}

  selection = new AuditStatisticDataSelection();
  data?: DivisionNumberStatistic;

  ngOnDestroy(): void {
    this.global.interval.unsubscribe(this.key);
  }

  ngOnInit(): void {
    this.global.interval.subscribe(this.key, () => {
      this.loadData().then((x) => {
        this.load.emit(this.data);
      });
    });
    this.global.interval.run();

    this.selection.select.subscribe((x) => {
      let divisionId = x?.Id;
      this.loadData(divisionId).then((x) => {
        this.load.emit(this.data);
      });
    });
  }

  async loadData(divisionId?: string) {
    this.data = await this.business.load(divisionId);
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
}
