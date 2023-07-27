import { EventEmitter, Injectable } from '@angular/core';
import { SearchOptions } from 'src/app/view-model/search-options.model';

@Injectable()
export class GarbageFullStationWindowStationBusiness {
  constructor() {}

  load: EventEmitter<SearchOptions> = new EventEmitter();

  onsearch(text: SearchOptions) {
    this.load.emit(text);
  }
}
