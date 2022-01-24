import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { EventType } from 'src/app/enum/event-type.enum';

@Injectable()
export class RecordWindowBusiness extends WindowViewModel {
  style = {
    height: '83.5%',
    transform: 'translate(-50%, -44.5%)',
  };

  type: EventType = EventType.IllegalDrop;

  count = 0;

  divisionId?: string;
  stationId?: string;

  constructor() {
    super();
  }
}
