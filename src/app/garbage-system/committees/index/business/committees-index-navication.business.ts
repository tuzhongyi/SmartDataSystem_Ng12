import { Injectable } from '@angular/core';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { CommitteesWindowBussiness } from './committees-window.business';

@Injectable()
export class CommitteesIndexNavicationBusiness {
  constructor(private window: CommitteesWindowBussiness) {}
  committees?: Division;
  stations: GarbageStation[] = [];
  selected?: GarbageStation;

  onStationClicked(station: GarbageStation) {
    this.selected = station;
  }
  onCommitteesInfoClicked(division: Division) {
    this.committees = division;
    this.window.summary.show = true;
  }
}
