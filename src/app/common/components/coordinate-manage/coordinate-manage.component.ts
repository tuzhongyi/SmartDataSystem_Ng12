import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { GisType } from 'src/app/enum/gis-type.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { GisPoint } from 'src/app/network/model/gis-point.model';

@Component({
  selector: 'coordinate-manage',
  templateUrl: './coordinate-manage.component.html',
  styleUrls: ['./coordinate-manage.component.less'],
})
export class CoordinateManageComponent implements OnInit {
  @Input() model?: GarbageStation;

  @Output() ok: EventEmitter<GarbageStation> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  constructor() {}

  GisType = GisType;
  station?: GarbageStation;

  ngOnInit(): void {
    if (this.model) {
      let plain = instanceToPlain(this.model);
      this.station = plainToInstance(GarbageStation, plain);
      if (!this.station.GisPoint) {
        this.station.GisPoint = new GisPoint();
        this.station.GisPoint.GisType = GisType.BD09;
      }
    }
  }

  onok() {
    this.ok.emit(this.station);
  }
  oncancel() {
    this.cancel.emit();
  }
}
