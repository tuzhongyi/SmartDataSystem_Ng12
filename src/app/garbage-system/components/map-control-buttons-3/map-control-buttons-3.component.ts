import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Language } from 'src/app/common/tools/language';
import { StationType } from 'src/app/enum/station-type.enum';
import {
  MapControlButtonFilterType as FilterType,
  MapControlButton3List,
  MapControlButtonFilter,
} from './map-control-buttons-3.model';

@Component({
  selector: 'map-control-buttons-3',
  templateUrl: './map-control-buttons-3.component.html',
  styleUrls: ['./map-control-buttons-3.component.less'],
})
export class MapControlButtons3Component implements OnInit {
  @Output() panel: EventEmitter<void> = new EventEmitter();
  @Output() patrol: EventEmitter<void> = new EventEmitter();

  @Output() fullscreen: EventEmitter<void> = new EventEmitter();

  @Output() filter = new MapControlButtonFilter();
  @Output() filterChange = new EventEmitter<MapControlButtonFilter>();

  public get filting(): boolean {
    return this.model.filter.selected;
  }
  @Input() public set filting(v: boolean | undefined) {
    if (v === undefined) return;
    this.model.filter.selected = v;
  }

  constructor(private global: GlobalStorageService) {}

  model = new MapControlButton3List();
  Language = Language;
  StationType = StationType;
  FilterType = FilterType;
  get justmap() {
    return this.global.JustMap;
  }

  ngOnInit(): void {
    this.regist();
  }

  regist() {
    this.model.filter.select.subscribe((x) => {
      if (!x) {
        this.onfilter();
      }
    });
    this.model.filter.type.station.select.subscribe((x) => {
      let type = FilterType.station;
      let index = this.filter.types.indexOf(type);
      if (index < 0) {
        this.filter.types.push(type);
      } else {
        this.filter.types.splice(index, 1);
      }
    });
    this.model.filter.type.rfid.select.subscribe((x) => {
      let type = FilterType.rfid;
      let index = this.filter.types.indexOf(type);
      if (index < 0) {
        this.filter.types.push(type);
      } else {
        this.filter.types.splice(index, 1);
      }
    });
    this.model.filter.type.construction.select.subscribe((x) => {
      let type = FilterType.construction;
      let index = this.filter.types.indexOf(type);
      if (index < 0) {
        this.filter.types.push(type);
      } else {
        this.filter.types.splice(index, 1);
      }
    });
    this.model.filter.state.normal.select.subscribe((x) => {
      this.filter.normal = x;
    });
    this.model.filter.state.full.select.subscribe((x) => {
      this.filter.full = x;
    });
    this.model.filter.state.drop.select.subscribe((x) => {
      this.filter.drop = x;
    });
    this.model.filter.state.error.select.subscribe((x) => {
      this.filter.error = x;
    });
    this.model.filter.state.drop.in30.select.subscribe((x) => {
      this.filter.drop30in = x;
    });
    this.model.filter.state.drop.out30.select.subscribe((x) => {
      this.filter.drop30out = x;
    });
  }

  onpanel() {
    this.panel.emit();
    this.model.filter.selected = false;
  }
  onpatrol() {
    this.patrol.emit();
    this.model.filter.selected = false;
  }

  onfullscreen() {
    this.fullscreen.emit();
  }

  onfilter() {
    this.filterChange.emit(this.filter);
  }
}
