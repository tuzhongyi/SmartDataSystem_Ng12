import { Pipe, PipeTransform } from '@angular/core';
import { EventType } from 'src/app/enum/event-type.enum';
import { VehicleType } from 'src/app/enum/vehicle-type.enum';
import { Language } from '../tools/language';

@Pipe({
  name: 'eventType',
})
export class EventTypePipe implements PipeTransform {
  transform(value: EventType, ...args: unknown[]): string {
    return Language.EventType(value);
  }
}
