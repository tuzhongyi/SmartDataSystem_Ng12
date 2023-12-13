import { EventEmitter } from '@angular/core';
import { DivisionTreeSource } from 'src/app/common/components/division-tree/division-tree.model';
import { StatisticType } from 'src/app/enum/statistic-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';

export class StationSelection {
  selecteds: CommonFlatNode<DivisionTreeSource>[] = [];
  select: EventEmitter<GarbageStation[]> = new EventEmitter();
  default: string[] = [];

  onselect(nodes: CommonFlatNode<DivisionTreeSource>[]) {
    this.selecteds = nodes;
    this.select.emit(this.selecteds as any);
  }
}

export class GarbageStationDetailsChartOptions {
  stationIds: string[] = [];
  date = new Date();
  unit: TimeUnit = TimeUnit.Week;
  type: StatisticType = StatisticType.garde;
}
