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
import { StationState } from 'src/app/enum/station-state.enum';
import { AEChartComponent } from 'src/app/garbage-system/components/charts/echart.abstract';
import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';
import { AuditStatisticDataCountStationBusiness } from './audit-statistic-data-count-station.business';
import {
  AuditStatisticDataCountStationData,
  AuditStatisticDataCountStationDetailsArgs,
} from './audit-statistic-data-count-station.model';
import { ChartPieOption } from './audit-statistic-data-count-station.option';

@Component({
  selector: 'audit-statistic-data-count-station',
  templateUrl: './audit-statistic-data-count-station.component.html',
  styleUrls: ['./audit-statistic-data-count-station.component.less'],
  providers: [AuditStatisticDataCountStationBusiness],
})
export class AuditStatisticDataCountStationComponent
  extends AEChartComponent
  implements OnInit, AfterViewInit
{
  @Input() data?: DivisionNumberStatistic;
  @Input() load?: EventEmitter<DivisionNumberStatistic>;
  @Output() details: EventEmitter<AuditStatisticDataCountStationDetailsArgs> =
    new EventEmitter();
  constructor(private business: AuditStatisticDataCountStationBusiness) {
    super();
    this.option = Object.assign({}, ChartPieOption);
  }
  option: EChartsOption;
  @ViewChild('echart')
  element?: ElementRef;
  model?: AuditStatisticDataCountStationData;
  StationState = StationState;

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
              value: x.normal,
              name: '正常投放点',
            },
            {
              value: x.drop,
              name: '垃圾滞留投放点',
            },
            {
              value: x.dryFull,
              name: '垃圾满溢投放点',
            },
          ];
        }

        this.echart.setOption(this.option);
      }
    });
  }

  onclick(state?: StationState, drop?: boolean) {
    let args = {
      state: state,
      drop: drop,
    };
    this.details.emit(args);
  }
}
