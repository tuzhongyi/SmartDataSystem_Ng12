import { Injectable } from '@angular/core';
import {
  NBPowerOnParams,
  ResetRelayParams,
} from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.params';
import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';

@Injectable()
export class AIOPGarbageVehicleCommandBusiness {
  constructor(private service: GarbageVehicleRequestService) {}

  command(id: string, params: ResetRelayParams | NBPowerOnParams) {
    let promise: Promise<string | boolean>;
    if (params instanceof ResetRelayParams) {
      promise = this.service.relay.reset(id, params);
    } else if (params instanceof NBPowerOnParams) {
      promise = this.service.nb.power(id, params);
    } else {
      throw new Error();
    }
    return promise.then((x) => {
      return this.service.cache.get(id);
    });
  }
}
