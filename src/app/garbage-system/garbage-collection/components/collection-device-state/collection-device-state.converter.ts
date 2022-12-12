import {
  CollectionDeviceStateCountType,
  CollectionDeviceStateRatioType,
} from 'src/app/enum/collection-device-state.enum';
import { VehicleState } from 'src/app/enum/vehicle-state.enum';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { CollectionDeviceStateModel } from './collection-device-state.model';
import { Language } from 'src/app/common/tools/language';
import { AbstractCommonModelConverter } from 'src/app/converter/common-model.converter';
import { Injectable } from '@angular/core';
import { CommonGaugeChartConverter } from 'src/app/common/components/common-gauge-chart/common-gauge-chart.converter';
import ColorPalette from 'src/assets/json/color-palette.json';

@Injectable()
export class CollectionDeviceStateConverter extends AbstractCommonModelConverter<CollectionDeviceStateModel> {
  constructor(private _commonGaugeChartConverter: CommonGaugeChartConverter) {
    super();
  }
  Convert(source: GarbageVehicle[]): CollectionDeviceStateModel {
    type DeviceStateRatioType =
      keyof typeof ColorPalette.CollectionDeviceStateRatioType;

    type DeviceStateCountType =
      keyof typeof ColorPalette.CollectionDeviceStateCountType;

    let model = new CollectionDeviceStateModel();

    let totalNum = source.length;
    let offLineNum = 0;
    let onLineNum = 0;

    source.forEach((item) => {
      if (Reflect.has(item, 'State')) {
        item.State?.contains(VehicleState.Offline) ? offLineNum++ : onLineNum++;
      }
    });

    model.onLineRatio =
      totalNum == 0 ? 100 : ((onLineNum / totalNum) * 100) >> 0;

    // model.onLineRatio = 30;
    if (model.onLineRatio < 80) {
      model.state = CollectionDeviceStateRatioType.Bad;
    } else if (model.onLineRatio >= 80 && model.onLineRatio < 90) {
      model.state = CollectionDeviceStateRatioType.Mild;
    } else {
      model.state = CollectionDeviceStateRatioType.Good;
    }

    model.stateColor =
      ColorPalette.CollectionDeviceStateRatioType[
        CollectionDeviceStateRatioType[model.state] as DeviceStateRatioType
      ];
    model.Data = [
      {
        label: Language.CollectionDeviceStateCountType(
          CollectionDeviceStateCountType.All
        ),
        count: totalNum,
        type: CollectionDeviceStateCountType.All,
        tagCls:
          CollectionDeviceStateCountType[CollectionDeviceStateCountType.All],
        tagColor:
          ColorPalette.CollectionDeviceStateCountType[
            CollectionDeviceStateCountType[
              CollectionDeviceStateCountType.All
            ] as DeviceStateCountType
          ],
      },
      {
        label: Language.CollectionDeviceStateCountType(
          CollectionDeviceStateCountType.Online
        ),
        count: onLineNum,
        type: CollectionDeviceStateCountType.Online,
        tagCls:
          CollectionDeviceStateCountType[CollectionDeviceStateCountType.Online],
        tagColor:
          ColorPalette.CollectionDeviceStateCountType[
            CollectionDeviceStateCountType[
              CollectionDeviceStateCountType.Online
            ] as DeviceStateCountType
          ],
      },
      {
        label: Language.CollectionDeviceStateCountType(
          CollectionDeviceStateCountType.Offline
        ),
        count: offLineNum,
        type: CollectionDeviceStateCountType.Offline,
        tagCls:
          CollectionDeviceStateCountType[
            CollectionDeviceStateCountType.Offline
          ],
        tagColor:
          ColorPalette.CollectionDeviceStateCountType[
            CollectionDeviceStateCountType[
              CollectionDeviceStateCountType.Offline
            ] as DeviceStateCountType
          ],
      },
    ];

    model.GaugeChartModel = this._commonGaugeChartConverter.Convert(source);
    return model;
  }
}
