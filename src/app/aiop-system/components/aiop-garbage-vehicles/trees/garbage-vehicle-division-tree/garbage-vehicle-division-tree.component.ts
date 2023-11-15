import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DivisionTreeSource } from 'src/app/common/components/division-tree/division-tree.model';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { GarbageVehicleDivisionTreeBusiness } from './garbage-vehicle-division-tree.business';

@Component({
  selector: 'garbage-vehicle-division-tree',
  templateUrl: './garbage-vehicle-division-tree.component.html',
  styleUrls: ['./garbage-vehicle-division-tree.component.less'],
  providers: [GarbageVehicleDivisionTreeBusiness],
})
export class GarbageVehicleDivisionTreeComponent implements OnInit {
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
  constructor(public business: GarbageVehicleDivisionTreeBusiness) {}

  ngOnInit(): void {}

  onSelectTreeNode(nodes: CommonFlatNode<DivisionTreeSource>[]) {
    this.selectTreeNode.emit(nodes);
  }
}
