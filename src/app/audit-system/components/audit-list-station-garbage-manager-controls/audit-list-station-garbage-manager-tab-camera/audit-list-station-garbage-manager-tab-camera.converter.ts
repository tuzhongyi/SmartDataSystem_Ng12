import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Flags } from 'src/app/common/tools/flags';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { AuditListStationGarbageManagerTabCameraItem } from './audit-list-station-garbage-manager-tab-camera.model';

export class AuditListStationGarbageManagerTabCameraConverter {
  convert(data: Camera) {
    let plain = instanceToPlain(data);
    let item = plainToInstance(
      AuditListStationGarbageManagerTabCameraItem,
      plain
    );
    let flags = new Flags(item.CameraUsage);
    item.Usages = flags.getValues();
    return item;
  }
}
