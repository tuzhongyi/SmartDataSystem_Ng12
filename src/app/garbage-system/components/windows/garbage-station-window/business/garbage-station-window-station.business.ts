import { EventEmitter, Injectable } from '@angular/core';
import { SearchOptions } from 'src/app/view-model/search-options.model';

@Injectable()
export class GarbageStationWindowStationBusiness {
  constructor() {}

  load: EventEmitter<SearchOptions> = new EventEmitter();

  onsearch(opts: SearchOptions) {
    this.load.emit(opts);
  }
}
