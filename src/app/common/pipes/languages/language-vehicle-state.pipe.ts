import { Pipe, PipeTransform } from '@angular/core';
import { VehicleState } from 'src/app/enum/vehicle-state.enum';
import { Flags } from '../../tools/flags';
import { Language } from '../../tools/language';

@Pipe({
  name: 'language_vehicle_state_pipe',
})
export class LanguageVehicleState implements PipeTransform {
  transform(value?: Flags<VehicleState>, ...args: unknown[]): string {
    return Language.VehicleStateFlags(value);
  }
}
