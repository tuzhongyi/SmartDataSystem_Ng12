import { CollectionPointClassification } from 'src/app/enum/collection-point-classification.enum';
import { VehicleType } from 'src/app/enum/vehicle-type.enum';
import { CollectionPoint } from 'src/app/network/model/collection-point.model';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { Guid } from './guid';

export class Creater {
  static GarbageVehicle() {
    let model = new GarbageVehicle();
    model.Id = Guid.NewGuid().ToString('N');
    model.CreateTime = new Date();
    model.UpdateTime = new Date();
    model.VehicleType = VehicleType.Tricycle;
    model.No = '10000';
    model.HeartbeatInterval = 5;
    model.ShutdownSeconds = 600;
    model.Cameras = [];
    return model;
  }

  static CollectionPoint() {
    let model = new CollectionPoint();
    model.Id = Guid.NewGuid().ToString('N');
    model.CreateTime = new Date();
    model.UpdateTime = new Date();
    model.Classification = CollectionPointClassification.Other;
    return model;
  }
}
