import { Component, Input } from '@angular/core';
import { GarbageVehicle } from 'src/app/network/model/garbage-station/garbage-vehicle.model';

@Component({
  selector: 'aiop-garbage-vehicle-params',
  templateUrl: './aiop-garbage-vehicle-params.component.html',
  styleUrls: ['./aiop-garbage-vehicle-params.component.less'],
  providers: [],
})
export class AIOPGarbageVehicleParamsComponent {
  @Input()
  model?: GarbageVehicle;
}
