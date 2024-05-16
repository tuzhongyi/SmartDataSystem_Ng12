import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { GisType } from 'src/app/enum/gis-type.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { GisPoint } from 'src/app/network/model/garbage-station/gis-point.model';
import { CoordinateTransform } from '../../tools/coordinateTransform';

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

  gis: GisPoint = this.create();

  ngOnInit(): void {
    if (this.model) {
      let plain = instanceToPlain(this.model);
      this.station = plainToInstance(GarbageStation, plain);
    }
  }

  private create() {
    let gis = new GisPoint();
    gis.GisType = GisType.BD09;
    return gis;
  }

  onok() {
    if (this.station) {
      if (!this.station.GisPoint) {
        this.station.GisPoint = new GisPoint();
        this.station.GisPoint.GisType = GisType.GCJ02;
      }
      let location;
      switch (this.gis.GisType) {
        case GisType.BD09:
          location = CoordinateTransform.bd09togcj02(
            this.gis.Longitude,
            this.gis.Latitude
          );
          this.station.GisPoint.Longitude = location[0];
          this.station.GisPoint.Latitude = location[1];
          break;
        case GisType.WGS84:
          location = CoordinateTransform.wgs84togcj02(
            this.gis.Longitude,
            this.gis.Latitude
          );
          this.station.GisPoint.Longitude = location[0];
          this.station.GisPoint.Latitude = location[1];
          break;
        default:
          this.station.GisPoint.Longitude = this.gis.Longitude;
          this.station.GisPoint.Latitude = this.gis.Latitude;
          break;
      }

      this.ok.emit(this.station);
    }
  }
  oncancel() {
    this.cancel.emit();
  }
}
