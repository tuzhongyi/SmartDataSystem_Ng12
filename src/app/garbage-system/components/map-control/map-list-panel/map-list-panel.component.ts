import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { ListItem } from './map-list-item';

@Component({
  selector: 'app-map-list-panel',
  templateUrl: './map-list-panel.component.html',
  styleUrls: ['./map-list-panel.component.css'],
})
export class MapListPanelComponent implements OnInit {
  visibility: boolean = false;

  @Input()
  dataSource: Array<ListItem<Division | GarbageStation>> = [];

  standBySearching: Array<ListItem<Division | GarbageStation>> = [];

  @Output()
  OnItemClicked: EventEmitter<ListItem<Division | GarbageStation>> =
    new EventEmitter();

  @Output()
  OnItemDoubleClicked: EventEmitter<ListItem<Division | GarbageStation>> =
    new EventEmitter();

  @Output()
  OnItemHover: EventEmitter<ListItem<Division | GarbageStation>> =
    new EventEmitter();

  @Output()
  OnSearching: EventEmitter<string> = new EventEmitter();

  @Input()
  VisibilityChange = (val: boolean) => {
    this.visibility = val;
  };

  constructor() {}

  ngOnInit() {}

  ButtonClick() {
    this.visibility = !this.visibility;
  }

  itemClick(item: ListItem<Division | GarbageStation>) {
    if (this.OnItemClicked) {
      this.OnItemClicked.emit(item);
    }
  }

  itemDoubleClick(item: ListItem<Division | GarbageStation>) {
    if (this.OnItemDoubleClicked) {
      this.OnItemDoubleClicked.emit(item);
    }
  }

  itemHover(item: ListItem<Division | GarbageStation>) {
    if (this.OnItemHover) {
      this.OnItemHover.emit(item);
    }
  }

  searched = false;
  beforSearchKey = '';
  search(text: string) {
    if (this.beforSearchKey === text) {
      return;
    }

    if (text && this.searched === false) {
      this.searched = true;

      this.standBySearching = this.dataSource;
    } else if (this.standBySearching) {
      this.dataSource = this.standBySearching;
      this.searched = false;
    } else {
    }

    this.beforSearchKey = text;
    if (this.OnSearching) {
      this.OnSearching.emit(text);
    }
  }
}
