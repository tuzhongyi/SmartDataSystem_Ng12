import { Pipe, PipeTransform } from '@angular/core';
import { VehicleState } from 'src/app/enum/vehicle-state.enum';
import { Flags } from '../../tools/flags';

@Pipe({
  name: 'classname_vehicle_state_pipe',
})
export class ClassnameVehicleState implements PipeTransform {
  transform(value?: Flags<VehicleState>, ...args: unknown[]): string {
    if (value) {
      if (value.contains(VehicleState.Offline)) {
        return 'powder-red-text';
      }
      return 'green-text';
    }
    return 'powder-red-text';
  }
}
