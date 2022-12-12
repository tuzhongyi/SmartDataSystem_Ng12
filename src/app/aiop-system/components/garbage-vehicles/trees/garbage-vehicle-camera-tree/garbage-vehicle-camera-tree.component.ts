import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DivisionTreeSource } from 'src/app/common/components/division-tree/division-tree.model';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { Division } from 'src/app/network/model/division.model';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { VehicleCamera } from 'src/app/network/model/vehicle-camera.model';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { GarbageVehicleCameraTreeCameraBusiness } from './business/garbage-vehicle-camera-tree-camera.business';
import { GarbageVehicleCameraTreeDivisionBusiness } from './business/garbage-vehicle-camera-tree-division.business';
import { GarbageVehicleCameraTreeVehicleBusiness } from './business/garbage-vehicle-camera-tree-vehicle.business';
import { GarbageVehicleCameraTreeBusiness } from './business/garbage-vehicle-camera-tree.business';

@Component({
  selector: 'garbage-vehicle-camera-tree',
  templateUrl: './garbage-vehicle-camera-tree.component.html',
  styleUrls: ['./garbage-vehicle-camera-tree.component.less'],
  providers: [
    GarbageVehicleCameraTreeBusiness,
    GarbageVehicleCameraTreeCameraBusiness,
    GarbageVehicleCameraTreeVehicleBusiness,
    GarbageVehicleCameraTreeDivisionBusiness,
  ],
})
export class GarbageVehicleCameraTreeComponent implements OnInit {
  @Input()
  defaultIds: string[] = [];
  @Input()
  holdStatus: boolean = false;
  @Input()
  selectStrategy: SelectStrategy = SelectStrategy.Single;

  @Input()
  load?: EventEmitter<void>;

  @Input()
  display = [Division, GarbageVehicle, VehicleCamera];

  @Output()
  loaded: EventEmitter<DivisionTreeSource[]> = new EventEmitter();

  @Output()
  selectTreeNode: EventEmitter<CommonFlatNode<DivisionTreeSource>[]> =
    new EventEmitter();
  @Output()
  holdStatusChange = new EventEmitter();
  constructor(public business: GarbageVehicleCameraTreeBusiness) {
    this.business.loaded.subscribe(this.loaded);
  }

  ngOnInit(): void {}

  onSelectTreeNode(nodes: CommonFlatNode<DivisionTreeSource>[]) {
    this.selectTreeNode.emit(nodes);
  }
}
