import { Injectable } from '@angular/core';
import {
  AbstractCommonModelConverter,
  CommonModelSource,
  modelSource,
} from 'src/app/converter/common-model.converter';
import { CollectionDeviceStateRatioType } from 'src/app/enum/collection-device-state.enum';
import { VehicleState } from 'src/app/enum/vehicle-state.enum';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { Language } from '../../tools/language';
import { CommonGaugeChartModel } from './common-gauge-chart.model';
import ColorPalette from 'src/assets/json/color-palette.json';

@Injectable({
  providedIn: 'root',
})
export class CommonGaugeChartConverter extends AbstractCommonModelConverter<
  CommonGaugeChartModel<any>
> {
  Convert(source: modelSource, ...res: any[]): CommonGaugeChartModel<any> {
    if (Array.isArray(source)) {
      if (this._isGarbageVehicle(source)) {
        return this._fromGarbageVehicle(source);
      }
    } else {
    }

    throw new TypeError();
  }

  private _fromGarbageVehicle(source: GarbageVehicle[]) {
    type DeviceStateRatioType =
      keyof typeof ColorPalette.CollectionDeviceStateRatioType;

    let model = new CommonGaugeChartModel();

    let totalNum = source.length;
    let offLineNum = 0;
    let onLineNum = 0;

    source.forEach((item) => {
      item.State == VehicleState.Offline ? offLineNum++ : onLineNum++;
    });

    // 在线比
    let onLineRatio = totalNum == 0 ? 100 : ((onLineNum / totalNum) * 100) >> 0;

    let state = CollectionDeviceStateRatioType.Good;
    // onLineRatio = 90;
    if (onLineRatio < 80) {
      state = CollectionDeviceStateRatioType.Bad;
    } else if (onLineRatio >= 80 && onLineRatio < 90) {
      state = CollectionDeviceStateRatioType.Mild;
    } else {
      state = CollectionDeviceStateRatioType.Good;
    }

    let stateColor =
      ColorPalette.CollectionDeviceStateRatioType[
        CollectionDeviceStateRatioType[state] as DeviceStateRatioType
      ];
    let stateName = Language.CollectionDeviceStateRatioType(state);

    model.Merge = {
      series: [
        {
          type: 'gauge',
          data: [
            {
              name: stateName,
              value: onLineRatio,
              title: {
                color: stateColor,
              },
              itemStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 100 / onLineRatio,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#EF6464', // color at 0%
                    },
                    {
                      offset: 0.5,
                      color: '#FAC858', // color at 100%
                    },
                    {
                      offset: 1,
                      color: '#21E452', // color at 100%
                    },
                  ],
                },
              },
            },
          ],
        },
      ],
    };
    model.RawData = source;
    return model;
  }

  /**********************************************************/
  private _isGarbageVehicle(
    data: CommonModelSource[]
  ): data is GarbageVehicle[] {
    return data.length == 0 || data[0] instanceof GarbageVehicle;
  }
}
