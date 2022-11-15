import { Pipe, PipeTransform } from '@angular/core';
import { VehicleType } from 'src/app/enum/vehicle-type.enum';
import { Language } from '../tools/language';

@Pipe({
  name: 'vehicleType',
})
export class VehicleTypePipe implements PipeTransform {
  transform(value: VehicleType, ...args: unknown[]): string {
    return Language.VehicleType(value);
  }
}
