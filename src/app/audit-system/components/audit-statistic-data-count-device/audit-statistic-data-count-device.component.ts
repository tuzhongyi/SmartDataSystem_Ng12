import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { EChartsOption } from 'echarts';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { AEChartComponent } from 'src/app/garbage-system/components/charts/echart.abstract';
import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';
import { AuditStatisticDataCountDeviceBusiness } from './audit-statistic-data-count-device.business';
import {
  AuditStatisticDataCountDeviceData,
  AuditStatisticDataCountDeviceDetailsArgs,
} from './audit-statistic-data-count-device.model';
import { ChartPieOption } from './audit-statistic-data-count-device.option';

@Component({
  selector: 'audit-statistic-data-count-device',
  templateUrl: './audit-statistic-data-count-device.component.html',
  styleUrls: ['./audit-statistic-data-count-device.component.less'],
  providers: [AuditStatisticDataCountDeviceBusiness],
})
export class AuditStatisticDataCountDeviceComponent
  extends AEChartComponent
  implements OnInit, AfterViewInit
{
  @Input() data?: DivisionNumberStatistic;
  @Input() load?: EventEmitter<DivisionNumberStatistic>;
  @Output() details: EventEmitter<AuditStatisticDataCountDeviceDetailsArgs> =
    new EventEmitter();
  constructor(private business: AuditStatisticDataCountDeviceBusiness) {
    super();
    this.option = Object.assign({}, ChartPieOption);
  }
  option: EChartsOption;
  @ViewChild('echart')
  element?: ElementRef;
  model?: AuditStatisticDataCountDeviceData;
  OnlineStatus = OnlineStatus;

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((x) => {
        this.data = x;
        this.loadData();
      });
    }
  }
  ngAfterViewInit(): void {
    if (this.init()) {
      this.loadData();
    }
  }

  loadData() {
    this.business.load(this.data).then((x) => {
      this.model = x;

      if (this.echart) {
        for (let i = 0; i < (this.option.series as any).length; i++) {
          (this.option.series as any)[i].data = [
            {
              value: x.online,
              name: '在线设备',
            },
            {
              value: x.offline,
              name: '离线设备',
            },
          ];
        }
        this.echart.setOption(this.option);
      }
    });
  }

  onclick(status?: OnlineStatus) {
    this.details.emit({ status: status });
  }
}
