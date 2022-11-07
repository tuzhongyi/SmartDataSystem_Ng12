import { Pipe, PipeTransform } from '@angular/core';
import { EventType } from 'src/app/enum/event-type.enum';
import { Language } from '../tools/language';

@Pipe({
  name: 'event_type_pipe',
})
export class EventTypePipe implements PipeTransform {
  transform(type: EventType) {
    return Language.EventType(type);
  }
}
