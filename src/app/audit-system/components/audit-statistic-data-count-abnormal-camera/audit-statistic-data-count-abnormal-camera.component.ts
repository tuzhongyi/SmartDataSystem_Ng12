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
import { CameraAbnormalType } from 'src/app/enum/camera-abnormal-type.enum';
import { AEChartComponent } from 'src/app/garbage-system/components/charts/echart.abstract';
import { CameraAbnormalStatistic } from 'src/app/network/model/garbage-station/abnormal/camera-abnormal-statistic.model';
import { AuditStatisticDataCountAbnormalCameraOption } from './audit-statistic-data-count-abnormal-camera.option';

@Component({
  selector: 'audit-statistic-data-count-abnormal-camera',
  templateUrl: './audit-statistic-data-count-abnormal-camera.component.html',
  styleUrls: ['./audit-statistic-data-count-abnormal-camera.component.less'],
})
export class AuditStatisticDataCountAbnormalCameraComponent
  extends AEChartComponent
  implements OnInit, AfterViewInit
{
  @Input() data = new CameraAbnormalStatistic();

  @Output() item = new EventEmitter<CameraAbnormalType>();
  constructor() {
    super();
    this.option = Object.assign(
      {},
      AuditStatisticDataCountAbnormalCameraOption
    );
  }
  get count() {
    return (
      this.data.CameraAbnormalNumber +
      this.data.CameraOfflineNumber +
      this.data.CameraRecordAbnormalNumber
    );
  }
  load?: EventEmitter<any> | undefined;
  @ViewChild('echart') element?: ElementRef;
  option: EChartsOption;
  CameraAbnormalType = CameraAbnormalType;

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
            value: this.data.CameraOfflineNumber,
            name: '摄像机离线',
          },
          {
            value: this.data.CameraAbnormalNumber,
            name: '摄像机故障',
          },
          {
            value: this.data.CameraRecordAbnormalNumber,
            name: '录像故障',
          },
        ];
      }

      this.echart.setOption(this.option);
    }
  }

  onclick(type?: CameraAbnormalType) {
    this.item.emit(type);
  }
}
