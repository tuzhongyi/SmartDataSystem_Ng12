import { EventEmitter, Injectable } from '@angular/core';
import { GarbageFullStationTableArgs } from 'src/app/common/components/tables/garbage-full-station-table/garbage-full-station-table.model';
import { SearchOptions } from 'src/app/view-model/search-options.model';

@Injectable()
export class GarbageFullStationWindowStationBusiness {
  constructor() {}

  load: EventEmitter<GarbageFullStationTableArgs> = new EventEmitter();

  onsearch(text: SearchOptions) {
    let args = new GarbageFullStationTableArgs();
    switch (text.propertyName) {
      case 'Name':
        args.station = text.text;
        break;
      case 'CommunityName':
        args.community = text.text;
        break;
      default:
        break;
    }
    this.load.emit(args);
  }
}
