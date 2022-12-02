import { CollectionPointClassification } from 'src/app/enum/collection-point-classification.enum';
import { CollectionMemberType } from 'src/app/enum/member-type.enum';
import { TrashCanType } from 'src/app/enum/trashcan-type.enum';
import { VehicleType } from 'src/app/enum/vehicle-type.enum';
import { CollectionPoint } from 'src/app/network/model/collection-point.model';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { CollectionMember } from 'src/app/network/model/member.model';
import { CollectionTrashCan } from 'src/app/network/model/trash-can.model';
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

  static CollectionMember() {
    let model = new CollectionMember();
    model.Id = Guid.NewGuid().ToString('N');
    model.CreateTime = new Date();
    model.UpdateTime = new Date();
    model.MemberType = CollectionMemberType.other;
    model.No = '10000';
    return model;
  }

  static CollectionTrashCan() {
    let model = new CollectionTrashCan();
    model.Id = Guid.NewGuid().ToString('N');
    model.CreateTime = new Date();
    model.UpdateTime = new Date();
    model.MaxVolume = 240;
    return model;
  }
}
