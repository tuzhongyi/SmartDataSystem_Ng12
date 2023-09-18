import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MapControlButtonList } from './map-control-buttons.model';

@Component({
  selector: 'map-control-buttons',
  templateUrl: './map-control-buttons.component.html',
  styleUrls: ['./map-control-buttons.component.less'],
})
export class MapControlButtonsComponent implements OnInit {
  @Output() patrol: EventEmitter<void> = new EventEmitter();
  @Output() construction: EventEmitter<boolean> = new EventEmitter();
  @Output() stationnormal: EventEmitter<boolean> = new EventEmitter();
  @Output() stationfull: EventEmitter<boolean> = new EventEmitter();
  @Output() stationdrop: EventEmitter<boolean> = new EventEmitter();
  @Output() stationerror: EventEmitter<boolean> = new EventEmitter();
  @Output() station30in: EventEmitter<boolean> = new EventEmitter();
  @Output() station30out: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  model = new MapControlButtonList();

  ngOnInit(): void {
    this.regist();
  }

  regist() {
    this.model.construction.select.subscribe(this.construction);
    this.model.stationnormal.select.subscribe(this.stationnormal);
    this.model.stationfull.select.subscribe(this.stationfull);
    this.model.stationdrop.select.subscribe(this.stationdrop);
    this.model.stationerror.select.subscribe(this.stationerror);
    this.model.station30in.select.subscribe(this.station30in);
    this.model.station30out.select.subscribe(this.station30out);
  }

  onpatrol() {
    this.patrol.emit();
  }
  onfilter() {
    this.model.filter.selected = !this.model.filter.selected;
    this.model.construction.display = this.model.filter.selected;
    this.model.stationnormal.display = this.model.filter.selected;
    this.model.stationfull.display = this.model.filter.selected;
    this.model.stationdrop.display = this.model.filter.selected;
    this.model.stationerror.display = this.model.filter.selected;
    this.model.station30in.display = this.model.filter.selected;
    this.model.station30out.display = this.model.filter.selected;
    if (this.model.filter.selected === false) {
      this.model.stationnormal.selected = true;
      this.model.stationfull.selected = true;
      this.model.stationdrop.selected = true;
      this.model.stationerror.selected = true;
      this.model.station30in.selected = false;
      this.model.station30out.selected = false;
    }
  }
  onconstruction() {
    this.model.construction.selected = !this.model.construction.selected;
  }
  onstationnormal() {
    this.model.stationnormal.selected = !this.model.stationnormal.selected;
  }
  onstationfull() {
    this.model.stationfull.selected = !this.model.stationfull.selected;
  }
  onstationdrop() {
    this.model.stationdrop.selected = !this.model.stationdrop.selected;
    this.model.station30in.display = this.model.stationdrop.selected;
    this.model.station30out.display = this.model.stationdrop.selected;
    if (this.model.stationdrop.selected === false) {
      this.model.station30in.selected = false;
      this.model.station30out.selected = false;
    }
  }
  onstationerror() {
    this.model.stationerror.selected = !this.model.stationerror.selected;
  }
  onstation30in() {
    this.model.station30in.selected = !this.model.station30in.selected;
  }
  onstation30out() {
    this.model.station30out.selected = !this.model.station30out.selected;
  }
}
