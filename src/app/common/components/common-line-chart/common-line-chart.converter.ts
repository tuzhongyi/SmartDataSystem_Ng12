import { Injectable } from '@angular/core';
import { DefaultLabelFormatterCallbackParams } from 'echarts';
import {
  AbstractCommonModelConverter,
  CommonModelSource,
  modelSource,
} from 'src/app/converter/common-model.converter';
import { EventType } from 'src/app/enum/event-type.enum';
import { EventNumberStatistic } from 'src/app/network/model/event-number-statistic.model';
import { GarbageCollectionEventRecord } from 'src/app/network/model/vehicle-event-record.model';
import { CommonLineChartModel } from './common-line-chart.model';

@Injectable({
  providedIn: 'root',
})
export class CommonLineChartConverter extends AbstractCommonModelConverter<
  CommonLineChartModel<any>
> {
  Convert(source: modelSource, ...res: any): CommonLineChartModel<any> {
    if (Array.isArray(source)) {
      if (this._isGarbageCollectionEventRecord(source)) {
        return this._fromGarbageCollectionEventRecord(source);
      } else if (this._isEventNumberStatistic(source)) {
        return this._fromEventNumberStatistic(source, res);
      }
    } else {
    }

    throw new TypeError();
  }

  private _fromGarbageCollectionEventRecord(
    records: GarbageCollectionEventRecord[]
  ) {
    let model = new CommonLineChartModel();
    model.xAxis = {
      type: 'category',
      data: [
        ...Array.from(
          { length: 25 },
          (v, i) => i.toString().padStart(2, '0') + ':00'
        ),
      ],
    };
    // let data = [150, 230, 224, 218, 290, 135, 260];
    // nKG/1000 = m吨

    let data = records.map((record) =>
      record.Data.Weight ? record.Data.Weight : 0
    );
    if (data.length) data.unshift(0);
    let max = Math.max(...data);
    let step = 4;

    model.series = [
      {
        type: 'line',
        data: data,
        name: '单位(吨)',
        areaStyle: {},
        label: {
          formatter: (params: DefaultLabelFormatterCallbackParams) => {
            if (params.value == max) return params.value.toString();
            if (params.dataIndex % step !== 0) {
              return '';
            }
            return params.value.toString();
          },
        },
      },
    ];
    return model;
  }

  private _fromEventNumberStatistic(
    arr: EventNumberStatistic[],
    args: [EventType, string]
  ) {
    let [type, message] = args;

    let model = new CommonLineChartModel();
    model.xAxis = {
      type: 'category',
      data: [
        ...Array.from(
          { length: 25 },
          (v, i) => i.toString().padStart(2, '0') + ':00'
        ),
      ],
    };
    let data = arr.map((item) => {
      let temp = item.EventNumbers.find((n) => n.EventType == type);
      if (temp) {
        return temp.DeltaNumber || 0;
      }
      return 0;
    });
    if (data.length) data.unshift(0);
    let max = Math.max(...data);
    let step = 4;

    model.series = [
      {
        type: 'line',
        name: '单位(起)',
        data: data,
        areaStyle: {},
        lineStyle: {
          width: 4,
          color: '#7586e0',
        },
        itemStyle: {
          color: '#7586e0',
        },
        label: {
          formatter: (params: DefaultLabelFormatterCallbackParams) => {
            if (params.value == max) return params.value.toString();
            if (params.dataIndex % step !== 0) {
              return '';
            }
            return params.value.toString();
          },
        },
      },
    ];

    return model;
  }

  private _isGarbageCollectionEventRecord(
    data: CommonModelSource[]
  ): data is GarbageCollectionEventRecord[] {
    return data.length == 0 || data[0] instanceof GarbageCollectionEventRecord;
  }
  private _isEventNumberStatistic(
    data: CommonModelSource[]
  ): data is EventNumberStatistic[] {
    return data.length == 0 || data[0] instanceof EventNumberStatistic;
  }
}
