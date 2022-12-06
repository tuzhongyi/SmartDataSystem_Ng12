import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DivisionTreeSource } from 'src/app/common/components/division-tree/division-tree.model';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { GarbageVehicleCameraTreeBusiness } from './garbage-vehicle-camera-tree.business';

@Component({
  selector: 'garbage-vehicle-camera-tree',
  templateUrl: './garbage-vehicle-camera-tree.component.html',
  styleUrls: ['./garbage-vehicle-camera-tree.component.less'],
  providers: [GarbageVehicleCameraTreeBusiness],
})
export class GarbageVehicleCameraTreeComponent implements OnInit {
  @Input()
  defaultIds: string[] = [];
  @Input()
  holdStatus: boolean = false;
  @Input()
  selectStrategy: SelectStrategy = SelectStrategy.Single;

  @Output()
  selectTreeNode: EventEmitter<CommonFlatNode<DivisionTreeSource>[]> =
    new EventEmitter();
  @Output()
  holdStatusChange = new EventEmitter();
  constructor(public business: GarbageVehicleCameraTreeBusiness) {}

  ngOnInit(): void {}

  onSelectTreeNode(nodes: CommonFlatNode<DivisionTreeSource>[]) {
    this.selectTreeNode.emit(nodes);
  }
}
