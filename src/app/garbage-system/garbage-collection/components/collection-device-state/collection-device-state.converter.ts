import {
  CollectionDeviceStateCountType,
  CollectionDeviceStateRatioType,
} from 'src/app/enum/collection-device-state.enum';
import { VehicleState } from 'src/app/enum/vehicle-state.enum';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { CollectionDeviceStateModel } from './collection-device-state.model';
import { Language } from 'src/app/common/tools/language';

export class CollectionVehicleConverter {
  Convert(source: GarbageVehicle[]): CollectionDeviceStateModel {
    let model = new CollectionDeviceStateModel();

    let totalNum = source.length;
    let offLineNum = 0;
    let onLineNum = 0;

    source.forEach((item) => {
      item.State == VehicleState.Online ? onLineNum++ : offLineNum++;
    });

    model.onLineRatio =
      totalNum == 0 ? 100 : ((onLineNum / totalNum) * 100) >> 0;

    // model.onLineRatio = 100;
    if (model.onLineRatio < 80) {
      model.state = CollectionDeviceStateRatioType.Bad;
    } else if (model.onLineRatio >= 80 && model.onLineRatio < 90) {
      model.state = CollectionDeviceStateRatioType.Mild;
    } else {
      model.state = CollectionDeviceStateRatioType.Good;
    }

    model.stateColor = Language.CollectionDeviceStateRatioTypeColor(
      model.state
    );
    model.stateDes = Language.CollectionDeviceStateRatioType(model.state);

    model.deviceStateArr = [
      {
        label: Language.CollectionDeviceStateCountType(
          CollectionDeviceStateCountType.All
        ),
        count: totalNum,
        type: CollectionDeviceStateCountType.All,
        tagCls:
          CollectionDeviceStateCountType[CollectionDeviceStateCountType.All],
      },
      {
        label: Language.CollectionDeviceStateCountType(
          CollectionDeviceStateCountType.Online
        ),
        count: onLineNum,
        type: CollectionDeviceStateCountType.Online,
        tagCls:
          CollectionDeviceStateCountType[CollectionDeviceStateCountType.Online],
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
      },
    ];

    return model;
  }
}
