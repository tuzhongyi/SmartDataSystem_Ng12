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
import { GarbageStationAbnormalType } from 'src/app/enum/garbage-station-abnormal-type.enum';
import { AEChartComponent } from 'src/app/garbage-system/components/charts/echart.abstract';
import { GarbageStationAbnormalStatistic } from 'src/app/network/model/garbage-station/abnormal/garbage-station-abnormal-statistic.model';
import { AuditStatisticDataCountAbnormalStationOption } from './audit-statistic-data-count-abnormal-station.option';

@Component({
  selector: 'audit-statistic-data-count-abnormal-station',
  templateUrl: './audit-statistic-data-count-abnormal-station.component.html',
  styleUrls: ['./audit-statistic-data-count-abnormal-station.component.less'],
})
export class AuditStatisticDataCountAbnormalStationComponent
  extends AEChartComponent
  implements OnInit, AfterViewInit
{
  @Input() data = new GarbageStationAbnormalStatistic();

  @Output() item = new EventEmitter<GarbageStationAbnormalType>();
  constructor() {
    super();
    this.option = Object.assign(
      {},
      AuditStatisticDataCountAbnormalStationOption
    );
  }

  get count() {
    return (
      this.data.DoorOfflineNumber +
      this.data.GCHAOfflineNumber +
      this.data.NBOfflineNumber
    );
  }

  load?: EventEmitter<any> | undefined;
  @ViewChild('echart') element?: ElementRef;
  option: EChartsOption;
  GarbageStationAbnormalType = GarbageStationAbnormalType;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.init()) {
      this.loadData();
    }
  }

  loadData() {
    if (this.echart) {
      let series = this.option.series as any;

      for (let i = 0; i < series.length; i++) {
        series[i].data = [
          {
            value: this.data.DoorOfflineNumber,
            name: '智能设备',
          },
          {
            value: this.data.GCHAOfflineNumber,
            name: 'GCHA设备',
          },
          {
            value: this.data.NBOfflineNumber,
            name: 'NB电源箱',
          },
        ];
      }

      this.echart.setOption(this.option);
    }
  }

  onclick(type?: GarbageStationAbnormalType) {
    this.item.emit(type);
  }
}
