import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  public get filting(): boolean {
    return this.model.filter.selected;
  }
  @Input()
  public set filting(v: boolean | undefined) {
    if (v === undefined) return;
    this.model.filter.selected = v;
  }

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
    this.model.filter.select.subscribe((x) => {
      this.model.construction.display = x;
      this.model.stationnormal.display = x;
      this.model.stationfull.display = x;
      this.model.stationdrop.display = x;
      this.model.stationerror.display = x;
      this.model.station30in.display = x;
      this.model.station30out.display = x;
      if (x === false) {
        this.model.stationnormal.selected = true;
        this.model.stationfull.selected = true;
        this.model.stationdrop.selected = true;
        this.model.stationerror.selected = true;
        this.model.station30in.selected = false;
        this.model.station30out.selected = false;
      }
    });
  }

  onpatrol() {
    this.patrol.emit();
  }
  onfilter() {
    this.model.filter.selected = !this.model.filter.selected;
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
