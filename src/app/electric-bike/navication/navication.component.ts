import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommitteesNavicationModel } from './navication.component.model';

@Component({
  selector: 'howell-electric-bike-navication',
  templateUrl: './navication.component.html',
  styleUrls: ['./navication.component.css'],
})
export class ElectricBikeNavicationComponent implements OnInit, OnChanges {
  @Input()
  root?: CommitteesNavicationModel;
  @Input()
  children?: CommitteesNavicationModel[];
  @Input()
  selected?: CommitteesNavicationModel;

  @Output()
  onrootclick: EventEmitter<CommitteesNavicationModel> = new EventEmitter();
  @Output()
  onchildclick: EventEmitter<CommitteesNavicationModel> = new EventEmitter();

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.Stations) {
      if (this.children && this.children.length > 0) {
        if (!this.selected) {
          this.StationClicked(this.children[0]);
        }
      }
    }
  }

  ngOnInit() {}

  CommitteesClicked() {
    this.selected = undefined;
    this.onrootclick.emit(this.root);
  }

  StationClicked(model: CommitteesNavicationModel) {
    this.selected = model;
    this.onchildclick.emit(model);
  }
}
