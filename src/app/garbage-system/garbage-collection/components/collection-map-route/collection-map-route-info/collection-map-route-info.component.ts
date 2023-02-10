import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GarbageVehicleModelConverter } from 'src/app/converter/view-models/collection-division/garbage-vehicle.model.converter';
import { VehicleState } from 'src/app/enum/vehicle-state.enum';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { GarbageVehicleModel } from 'src/app/network/view-model/garbage-vehicle.view-model';

@Component({
  selector: 'collection-map-route-info',
  templateUrl: './collection-map-route-info.component.html',
  styleUrls: ['./collection-map-route-info.component.less'],
})
export class CollectionMapRouteInfoComponent implements OnInit {
  @Input()
  source?: GarbageVehicle;
  @Output()
  close: EventEmitter<void> = new EventEmitter();

  constructor(private converter: GarbageVehicleModelConverter) {}

  VehicleState = VehicleState;
  model?: GarbageVehicleModel;

  ngOnInit(): void {
    if (this.source) {
      this.model = this.converter.Convert(this.source);
    }
  }

  onclose() {
    this.close.emit();
  }
}
