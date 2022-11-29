import { IConverter } from '../common/interfaces/converter.interface';
import { VehiclePositionNo } from '../enum/position-no.enum';
import { AICamera } from '../network/model/ai-camera.model';
import { VehicleCamera } from '../network/model/vehicle-camera.model';

export class GarbageVehicleCameraConverter
  implements IConverter<AICamera, VehicleCamera>
{
  Convert(source: AICamera, vehicleId: string): VehicleCamera {
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
    // camera.PositionNo;
    camera.GarbageVehicleId = vehicleId;
    return camera;
  }
}
