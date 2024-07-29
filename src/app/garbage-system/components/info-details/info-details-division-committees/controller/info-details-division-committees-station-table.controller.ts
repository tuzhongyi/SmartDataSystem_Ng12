import { EventEmitter, Injectable } from '@angular/core';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { InfoDetailsStationTableArgs } from '../../info-details-tables/info-details-station-table/info-details-station-table.model';
import { InfoDetailsDivisionCommitteesBusiness } from '../business/info-details-division-committees.business';

@Injectable()
export class InfoDetailsDivisionCommitteesStationTableController {
  event = {
    load: new EventEmitter<InfoDetailsStationTableArgs>(),
    download: new EventEmitter<Division>(),
  };

  constructor(business: InfoDetailsDivisionCommitteesBusiness) {}

  private args = new InfoDetailsStationTableArgs();

  load(divisionId: string) {
    if (divisionId) {
      this.args.divisionId = divisionId;
    }
    this.event.load.emit(this.args);
  }

  download(division: Division) {
    this.event.download.emit(division);
  }
}
