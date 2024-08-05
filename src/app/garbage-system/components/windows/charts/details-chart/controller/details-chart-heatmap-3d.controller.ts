import { EventEmitter, Injectable } from '@angular/core';

import { DateTimeTool } from 'src/app/common/tools/date-time-tool/datetime.tool';
import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { DetailsChartHeatmapArgs } from '../../details-chart-heatmap/details-chart-heatmap.model';

@Injectable()
export class DetailsChartHeatmap3DController {
  args = new DetailsChartHeatmapArgs();
  event = {
    load: new EventEmitter<DetailsChartHeatmapArgs>(),
  };

  init(type: EventType, date: Date) {
    this.ondate(date);
    this.args.type = type;
  }

  ondate(date: Date, unit = TimeUnit.Month) {
    switch (unit) {
      case TimeUnit.Month:
        this.args.duration = DateTimeTool.allMonth(date);
        break;
      case TimeUnit.Year:
        this.args.duration = DateTimeTool.allYear(date);
        break;
    }
    this.args.unit = unit;
  }
  ondivision(divisionId?: string) {
    this.args.divisonId = divisionId;
  }
  onstation(stationId?: string) {
    this.args.stationId = stationId;
  }

  load() {
    this.event.load.emit(this.args);
  }
}
