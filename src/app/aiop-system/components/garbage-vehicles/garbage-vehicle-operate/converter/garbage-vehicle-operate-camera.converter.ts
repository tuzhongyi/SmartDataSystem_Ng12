import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { VehicleCamera } from 'src/app/network/model/garbage-station/vehicle-camera.model';
import { AICameraModel } from 'src/app/view-model/ai-camera.model';

export class GarbageVehicleOperateCameraConverter
  implements IConverter<AICameraModel, VehicleCamera>
{
  Convert(source: AICameraModel, vehicleId: string): VehicleCamera {
    let camera = new VehicleCamera();

    camera.CreateTime = new Date();

    camera.GisPoint = source.GisPoint;
    camera.Id = source.Id;
    camera.ImageTime = source.ImageTime;
    camera.ImageUrl = source.ImageUrl;
    camera.Name = source.Name;
    camera.OnlineStatus = source.OnlineStatus;

    camera.UpdateTime = new Date();
    camera.CameraUsage = 0;
    // camera.PositionNo
    camera.GarbageVehicleId = vehicleId;
    return camera;
  }
}
