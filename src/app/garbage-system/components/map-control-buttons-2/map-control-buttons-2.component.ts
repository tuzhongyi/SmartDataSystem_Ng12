import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import { StationType } from 'src/app/enum/station-type.enum';
import { MapControlButton2List } from './map-control-buttons-2.model';

@Component({
  selector: 'map-control-buttons-2',
  templateUrl: './map-control-buttons-2.component.html',
  styleUrls: ['./map-control-buttons-2.component.less'],
})
export class MapControlButtons2Component implements OnInit {
  @Output() patrol: EventEmitter<void> = new EventEmitter();

  @Output() stationnormal: EventEmitter<boolean> = new EventEmitter();
  @Output() stationfull: EventEmitter<boolean> = new EventEmitter();
  @Output() stationdrop: EventEmitter<boolean> = new EventEmitter();
  @Output() stationerror: EventEmitter<boolean> = new EventEmitter();
  @Output() stationdrop30in: EventEmitter<boolean> = new EventEmitter();
  @Output() stationdrop30out: EventEmitter<boolean> = new EventEmitter();

  @Output() rfidnormal: EventEmitter<boolean> = new EventEmitter();
  @Output() rfidfull: EventEmitter<boolean> = new EventEmitter();
  @Output() rfiddrop: EventEmitter<boolean> = new EventEmitter();
  @Output() rfiderror: EventEmitter<boolean> = new EventEmitter();
  @Output() rfiddrop30in: EventEmitter<boolean> = new EventEmitter();
  @Output() rfiddrop30out: EventEmitter<boolean> = new EventEmitter();

  @Output() constructionnormal: EventEmitter<boolean> = new EventEmitter();
  @Output() constructionfull: EventEmitter<boolean> = new EventEmitter();
  @Output() constructiondrop: EventEmitter<boolean> = new EventEmitter();
  @Output() constructionerror: EventEmitter<boolean> = new EventEmitter();

  public get filting(): boolean {
    return this.model.filter.selected;
  }
  @Input()
  public set filting(v: boolean | undefined) {
    if (v === undefined) return;
    this.model.filter.selected = v;
  }

  constructor() {}

  model = new MapControlButton2List();
  Language = Language;
  StationType = StationType;

  ngOnInit(): void {
    this.regist();
  }

  regist() {
    this.model.filter.select.subscribe((x) => {
      this.model.construction.display = x;
      this.model.station.display = x;
      this.model.rfid.display = x;
      if (!x) {
        this.model.station.selected = false;
        this.model.construction.selected = false;
        this.model.rfid.selected = false;
      }
    });
    this.registstation();
    this.registrfid();
    this.registconstruction();
  }

  registstation() {
    this.model.station.select.subscribe((x) => {
      if (x) {
        this.model.rfid.selected = !x;
        this.model.construction.selected = !x;
      }
    });
    this.model.station.normal.select.subscribe(this.stationnormal);
    this.model.station.full.select.subscribe(this.stationfull);
    this.model.station.drop.select.subscribe(this.stationdrop);
    this.model.station.error.select.subscribe(this.stationerror);
    this.model.station.drop30in.select.subscribe(this.stationdrop30in);
    this.model.station.drop30out.select.subscribe(this.stationdrop30out);
  }
  registrfid() {
    this.model.rfid.select.subscribe((x) => {
      if (x) {
        this.model.station.selected = !x;
        this.model.construction.selected = !x;
      }
    });
    this.model.rfid.normal.select.subscribe(this.rfidnormal);
    this.model.rfid.full.select.subscribe(this.rfidfull);
    this.model.rfid.drop.select.subscribe(this.rfiddrop);
    this.model.rfid.error.select.subscribe(this.rfiderror);
    this.model.rfid.drop30in.select.subscribe(this.rfiddrop30in);
    this.model.rfid.drop30out.select.subscribe(this.rfiddrop30out);
  }
  registconstruction() {
    this.model.construction.select.subscribe((x) => {
      if (x) {
        this.model.rfid.selected = !x;
        this.model.station.selected = !x;
      }
    });
    this.model.construction.normal.select.subscribe(this.constructionnormal);
    this.model.construction.full.select.subscribe(this.constructionfull);
    this.model.construction.drop.select.subscribe(this.constructiondrop);
    this.model.construction.error.select.subscribe(this.constructionerror);
  }

  onpatrol() {
    this.patrol.emit();
  }
  onfilter() {
    this.model.filter.selected = !this.model.filter.selected;
  }

  onstation() {
    this.model.station.selected = !this.model.station.selected;
  }
  onstationall() {
    this.model.station.all.selected = !this.model.station.all.selected;
  }
  tostationall() {
    if (
      this.model.station.normal.selected !== this.model.station.all.selected &&
      this.model.station.full.selected !== this.model.station.all.selected &&
      this.model.station.drop.selected !== this.model.station.all.selected &&
      this.model.station.error.selected !== this.model.station.all.selected
    ) {
      this.model.station.all.selected = this.model.station.error.selected;
    }
  }
  onstationnormal() {
    this.model.station.normal.selected = !this.model.station.normal.selected;
    this.tostationall();
  }
  onstationfull() {
    this.model.station.full.selected = !this.model.station.full.selected;
    this.tostationall();
  }
  onstationdrop() {
    this.model.station.drop.selected = !this.model.station.drop.selected;
    this.tostationall();
  }
  onstationdrop30in() {
    this.model.station.drop30in.selected =
      !this.model.station.drop30in.selected;
  }
  onstationdrop30out() {
    this.model.station.drop30out.selected =
      !this.model.station.drop30out.selected;
  }
  onstationerror() {
    this.model.station.error.selected = !this.model.station.error.selected;
    this.tostationall();
  }
  onrfid() {
    this.model.rfid.selected = !this.model.rfid.selected;
  }
  onrfidall() {
    this.model.rfid.all.selected = !this.model.rfid.all.selected;
  }
  torfidall() {
    if (
      this.model.rfid.normal.selected !== this.model.rfid.all.selected &&
      this.model.rfid.full.selected !== this.model.rfid.all.selected &&
      this.model.rfid.drop.selected !== this.model.rfid.all.selected &&
      this.model.rfid.error.selected !== this.model.rfid.all.selected
    ) {
      this.model.rfid.all.selected = this.model.rfid.error.selected;
    }
  }
  onrfidnormal() {
    this.model.rfid.normal.selected = !this.model.rfid.normal.selected;
    this.torfidall();
  }
  onrfidfull() {
    this.model.rfid.full.selected = !this.model.rfid.full.selected;
    this.torfidall();
  }
  onrfiddrop() {
    this.model.rfid.drop.selected = !this.model.rfid.drop.selected;
    this.torfidall();
  }

  onrfiddrop30in() {
    this.model.rfid.drop30in.selected = !this.model.rfid.drop30in.selected;
  }
  onrfiddrop30out() {
    this.model.rfid.drop30out.selected = !this.model.rfid.drop30out.selected;
  }
  onrfiderror() {
    this.model.rfid.error.selected = !this.model.rfid.error.selected;
    this.torfidall();
  }
  onconstruction() {
    this.model.construction.selected = !this.model.construction.selected;
  }
  onconstructionall() {
    this.model.construction.all.selected =
      !this.model.construction.all.selected;
  }
  toconstructionall() {
    if (
      this.model.construction.normal.selected !==
        this.model.construction.all.selected &&
      this.model.construction.full.selected !==
        this.model.construction.all.selected &&
      this.model.construction.drop.selected !==
        this.model.construction.all.selected &&
      this.model.construction.error.selected !==
        this.model.construction.all.selected
    ) {
      this.model.construction.all.selected =
        this.model.construction.error.selected;
    }
  }
  onconstructionnormal() {
    this.model.construction.normal.selected =
      !this.model.construction.normal.selected;
    this.toconstructionall();
  }
  onconstructionfull() {
    this.model.construction.full.selected =
      !this.model.construction.full.selected;
    this.toconstructionall();
  }
  onconstructiondrop() {
    this.model.construction.drop.selected =
      !this.model.construction.drop.selected;
    this.toconstructionall();
  }
  onconstructionerror() {
    this.model.construction.error.selected =
      !this.model.construction.error.selected;
    this.toconstructionall();
  }
}
