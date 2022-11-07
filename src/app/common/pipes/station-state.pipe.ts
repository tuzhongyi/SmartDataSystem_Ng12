import { Pipe, PipeTransform } from '@angular/core';
import { StationState } from 'src/app/enum/station-state.enum';
import { Flags } from '../tools/flags';
import { Language } from '../tools/language';

@Pipe({
  name: 'station_state_pipe',
})
export class StationStatePipe implements PipeTransform {
  transform(flags: Flags<StationState>) {
    return Language.StationStateFlags(flags);
  }
}
