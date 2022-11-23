import { Injectable } from '@angular/core';
import { CallbackDataParams } from 'echarts/types/dist/shared';
import { StatisticLineEChartsConverter } from 'src/app/converter/statistic-line-eCharts.converter';
import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { Time } from 'src/app/common/tools/time';
import { EventNumberStatistic } from 'src/app/network/model/event-number-statistic.model';
import { EventNumber } from 'src/app/network/model/event-number.model';
import { GetDivisionEventNumbersParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { EChartsLineModel } from 'src/app/view-model/echarts-line.model';

@Injectable()
export class IllegalStatisticBusiness implements StatisticLineEChartsConverter {
  constructor(
    private divisionRequest: DivisionRequestService,
    private stationRequest: GarbageStationRequestService
  ) {}

  async getCurrentDivision(id: string) {
    let data = await this.divisionRequest.cache.get(id);
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
    let lineChartData = [];
    let res: number[] = [];
    let max = -1;
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      if (item instanceof EventNumberStatistic) {
        let temp = item.EventNumbers.find((n) => n.EventType == type);
        if (temp) {
          let num = temp.DeltaNumber || 0;
          res.push(num);
          if (num > max) {
            max = num;
          }
        }
      }
    }

    // console.log('max', max);
    let echartsModel = new EChartsLineModel();
    echartsModel.seriesLabel = [0, 3, 6, 9, 12, 15, 18, 21];
    echartsModel.series = [
      {
        type: 'line',
        name: '单位(起)',
        data: res,
        areaStyle: {},
        lineStyle: {
          width: 4,
          color: '#7586e0',
        },
        itemStyle: {
          color: '#7586e0',
        },
        label: {
          show: true,
          // 显示 seriesLabel中的 index 和最大数值的 index
          formatter: function (params: CallbackDataParams) {
            if (params.value == max) {
              return params.value.toString();
            }
            return echartsModel.seriesLabel.includes(params.dataIndex)
              ? params.value.toString()
              : '';
          },
          color: '#fff',
          fontSize: 16,
        },
      },
    ];
    lineChartData.push(echartsModel);
    return lineChartData;
  }
}
