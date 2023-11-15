import { Component, Input, OnInit } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import { GarbageVehicle } from 'src/app/network/model/garbage-station/garbage-vehicle.model';
import { VehicleCamera } from 'src/app/network/model/garbage-station/vehicle-camera.model';

@Component({
  selector: 'aiop-garbage-vehicle-cameras',
  templateUrl: './aiop-garbage-vehicle-cameras.component.html',
  styleUrls: ['./aiop-garbage-vehicle-cameras.component.less'],
  providers: [],
})
export class AIOPGarbageVehicleCamerasComponent implements OnInit {
  @Input()
  model?: GarbageVehicle;

  selected?: VehicleCamera;
  Language = Language;

  ngOnInit(): void {
    if (this.model) {
      if (this.model.Cameras && this.model.Cameras.length > 0) {
        this.selected = this.model.Cameras[0];
      }
    }
  }
}
