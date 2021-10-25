import { Injectable } from '@angular/core';
import { IEChartsConverter } from 'src/app/converter/IEChartsConverter.interface';
import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { Time } from 'src/app/global/tool/time';
import { EventNumberStatistic } from 'src/app/network/model/event-number-statistic.model';
import { EventNumber } from 'src/app/network/model/event-number.model';
import { GetDivisionEventNumbersParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { StationRequestService } from 'src/app/network/request/station/garbage-station-request.service';
import { EChartsLineModel } from 'src/app/view-model/echarts.model';

@Injectable()
export class IllegalStatisticBusiness implements IEChartsConverter {
  constructor(
    private divisionRequest: DivisionRequestService,
    private stationRequest: StationRequestService
  ) {}

  async getCurrentDivision(id: string) {
    let data = await this.divisionRequest.get(id);
    return data;
  }
  async statistic(
    divisionId: string,
    timeUnit: TimeUnit,
    time: Date
  ): Promise<EventNumberStatistic[]> {
    let beginTime = Time.beginTime(time);
    let endTime = Time.endTime(time);
    const params = new GetDivisionEventNumbersParams();
    params.TimeUnit = timeUnit;
    params.BeginTime = beginTime;
    params.EndTime = endTime;
    params.PageIndex = 1;
    params.PageSize = 9999;

    let res = await this.divisionRequest.eventNumber.history.list(
      divisionId,
      params
    );
    return res.Data;
  }
  toECharts<T>(data: T[], type: EventType) {
    let res: number[] = [];

    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      if (item instanceof EventNumberStatistic) {
        let temp = item.EventNumbers.find((n) => n.EventType == type);
        if (temp) res.push(temp.DeltaNumber || 0);
      }
    }
    let echartsModel = new EChartsLineModel();
    echartsModel.seriesData = res;

    for (let i = 0; i < 24; i++) {
      let time = i.toString().padStart(2, '0') + ':00';
      echartsModel.xAxisData.push(time);
    }
    echartsModel.xAxisData.push('23:59');
    return echartsModel;
  }
}
