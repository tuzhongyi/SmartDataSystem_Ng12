import { EventEmitter, Injectable } from '@angular/core';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { InfoDetailsDivisionTableArgs } from '../../info-details-tables/info-details-division-table/info-details-division-table.model';

@Injectable()
export class InfoDetailsDivisionCountyChildrenTableController {
  event = {
    load: new EventEmitter<InfoDetailsDivisionTableArgs>(),
    download: new EventEmitter<Division>(),
  };

  constructor() {}

  private args = new InfoDetailsDivisionTableArgs();

  load(divisionId: string) {
    this.args.divisionId = divisionId;
    this.event.load.emit(this.args);
  }

  download(division: Division) {
    this.event.download.emit(division);
  }
}
