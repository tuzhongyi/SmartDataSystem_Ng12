import { Pipe, PipeTransform } from '@angular/core';
import { VehiclePositionNo } from 'src/app/enum/position-no.enum';
import { Language } from '../tools/language';

@Pipe({
  name: 'language_position_no_pipe',
})
export class LanguagePositionNo implements PipeTransform {
  transform(value: VehiclePositionNo, ...args: unknown[]): string {
    return Language.VehiclePositionNo(value);
  }
}
