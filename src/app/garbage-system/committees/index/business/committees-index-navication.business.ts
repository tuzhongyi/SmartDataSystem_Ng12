import { EventEmitter, Injectable } from '@angular/core';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { CommitteesWindowBussiness } from './committees-window.business';

@Injectable()
export class CommitteesIndexNavicationBusiness {
  constructor(private window: CommitteesWindowBussiness) {}
  committees?: Division;
  stations: GarbageStation[] = [];
  selected?: GarbageStation;

  select: EventEmitter<number> = new EventEmitter();

  onStationClicked(station: GarbageStation) {
    this.selected = station;
    let index = this.stations.findIndex((x) => x.Id === this.selected?.Id);
    this.select.emit(index);
  }
  onCommitteesInfoClicked(division: Division) {
    this.committees = division;
    this.window.summary.show = true;
  }
}
