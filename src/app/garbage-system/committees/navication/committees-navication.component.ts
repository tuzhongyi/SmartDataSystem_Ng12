import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';

@Component({
  selector: 'app-committees-navication',
  templateUrl: './committees-navication.component.html',
  styleUrls: ['./committees-navication.component.css'],
})
export class CommitteesNavicationComponent implements OnInit, OnChanges {
  @Input()
  Committees?: Division;
  @Input()
  Stations?: GarbageStation[];
  @Input()
  StationSelected?: GarbageStation;

  @Output()
  OnCommitteesClicked: EventEmitter<Division> = new EventEmitter();
  @Output()
  OnStationClicked: EventEmitter<GarbageStation> = new EventEmitter();

  @Output()
  OnCommitteesInfoClicked: EventEmitter<Division> = new EventEmitter();

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.Stations) {
      if (this.Stations && this.Stations.length > 0) {
        if (!this.StationSelected) {
          this.StationClicked(this.Stations[0]);
        }
      }
    }
  }

  ngOnInit() {}

  CommitteesClicked() {
    this.StationSelected = undefined;
    this.OnCommitteesClicked.emit(this.Committees);
  }

  StationClicked(station: GarbageStation) {
    this.StationSelected = station;
    this.OnStationClicked.emit(station);
  }

  divisionInfoClick(event: Event) {
    this.OnCommitteesInfoClicked.emit(this.Committees);
    event.stopPropagation();
  }
}
