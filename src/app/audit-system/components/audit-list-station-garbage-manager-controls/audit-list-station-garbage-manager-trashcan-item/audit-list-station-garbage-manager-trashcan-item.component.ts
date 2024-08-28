import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AEChartComponent } from 'src/app/garbage-system/components/charts/echart.abstract';
import { TrashCan } from 'src/app/network/model/garbage-station/trash-can.model';
import { AuditListStationGarbageManagerTrashcanItemBusiness } from './audit-list-station-garbage-manager-trashcan-item.business';
import { AuditListStationGarbageManagerTrashcanItemOption } from './audit-list-station-garbage-manager-trashcan-item.option';

import { GaugeChart } from 'echarts/charts';
import * as echarts from 'echarts/core';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([GaugeChart, UniversalTransition, CanvasRenderer]);

@Component({
  selector: 'audit-list-station-garbage-manager-trashcan-item',
  templateUrl:
    './audit-list-station-garbage-manager-trashcan-item.component.html',
  styleUrls: [
    './audit-list-station-garbage-manager-trashcan-item.component.less',
  ],
  providers: [AuditListStationGarbageManagerTrashcanItemBusiness],
})
export class AuditListStationGarbageManagerTrashcanItemComponent
  extends AEChartComponent
  implements OnInit, AfterViewInit
{
  @Input() model?: TrashCan;
  @Input() load?: EventEmitter<TrashCan>;

  constructor(
    private business: AuditListStationGarbageManagerTrashcanItemBusiness
  ) {
    super();
  }

  @ViewChild('echart')
  element?: ElementRef;
  option = Object.assign({}, AuditListStationGarbageManagerTrashcanItemOption);

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((x) => {
        this.loadData(x);
      });
    }
  }
  ngAfterViewInit(): void {
    if (this.init()) {
      if (this.model) {
        this.loadData(this.model);
      }
    }
  }

  loadData(model: TrashCan) {
    if (this.echart) {
      let data = this.business.convert(model);
      let value = this.business.value(model);
      let serie = (this.option.series as any)[0];
      serie.progress.itemStyle.color = this.business.color(value);
      serie.data = [data];

      console.log(this.option);
      this.echart.setOption(this.option);
    }
  }
}
