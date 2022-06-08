import { Injectable } from '@angular/core';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { CommitteesIndexPatrolControlBusiness } from './committees-index-patrol-control.business';

@Injectable()
export class CommitteesIndexNavicationBusiness {
  constructor() {}
  committees?: Division;
  stations: GarbageStation[] = [];
  selected?: GarbageStation;

  onStationClicked(station: GarbageStation) {
    this.selected = station;
  }
  onCommitteesInfoClicked(division: Division) {}
}
