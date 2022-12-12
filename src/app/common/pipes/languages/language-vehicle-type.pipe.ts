import { Pipe, PipeTransform } from '@angular/core';
import { VehicleType } from 'src/app/enum/vehicle-type.enum';
import { Language } from '../../tools/language';

@Pipe({
  name: 'language_vehicle_type_pipe',
})
export class LanguageVehicleTypePipe implements PipeTransform {
  transform(value: VehicleType, ...args: unknown[]): string {
    return Language.VehicleType(value);
  }
}
