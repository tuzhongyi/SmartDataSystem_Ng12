import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DivisionTreeSource } from 'src/app/common/components/division-tree/division-tree.model';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { GarbageVehicleTreeDivisionBusiness } from './business/garbage-vehicle-tree-division.business';
import { GarbageVehicleTreeVehicleBusiness } from './business/garbage-vehicle-tree-vehicle.business';
import { GarbageVehicleTreeBusiness } from './business/garbage-vehicle-tree.business';

@Component({
  selector: 'garbage-vehicle-tree',
  templateUrl: './garbage-vehicle-tree.component.html',
  styleUrls: ['./garbage-vehicle-tree.component.less'],
  providers: [
    GarbageVehicleTreeBusiness,
    GarbageVehicleTreeVehicleBusiness,
    GarbageVehicleTreeDivisionBusiness,
  ],
})
export class GarbageVehicleTreeComponent implements OnInit {
  @Input()
  defaultIds: string[] = [];
  @Input()
  holdStatus: boolean = false;
  @Input()
  selectStrategy: SelectStrategy = SelectStrategy.Single;

  @Input()
  load?: EventEmitter<void>;
  @Output()
  loaded: EventEmitter<DivisionTreeSource[]> = new EventEmitter();

  @Output()
  selectTreeNode: EventEmitter<CommonFlatNode<DivisionTreeSource>[]> =
    new EventEmitter();
  @Output()
  holdStatusChange = new EventEmitter();
  constructor(public business: GarbageVehicleTreeBusiness) {
    this.business.loaded.subscribe(this.loaded);
  }

  ngOnInit(): void {}

  onSelectTreeNode(nodes: CommonFlatNode<DivisionTreeSource>[]) {
    this.selectTreeNode.emit(nodes);
  }
}
