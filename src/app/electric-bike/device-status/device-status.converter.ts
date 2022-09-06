import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { Camera } from 'src/app/network/model/camera.model';
import { DivisionNumberStatistic } from 'src/app/network/model/division-number-statistic.model';
import { DeviceStatusModel } from './device-status.model';

export class DeviceStatusConverter
  implements IConverter<DivisionNumberStatistic, DeviceStatusModel>
{
  Convert(source: DivisionNumberStatistic, ...res: any[]): DeviceStatusModel {
    let model = new DeviceStatusModel();
    model.all = source.CameraNumber;
    model.offline = source.OfflineCameraNumber;
    model.online = source.CameraNumber - source.OfflineCameraNumber;
    if (model.all != 0) {
      model.ratio = Math.round((model.online / model.all) * 100);
    }
    return model;
  }
}
