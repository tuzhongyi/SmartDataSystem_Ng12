import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DivisionTreeSource } from 'src/app/common/components/division-tree/division-tree.model';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { CommonNestNode } from 'src/app/view-model/common-nest-node.model';
import { GarbageCollectionPointTreeDivisionBusiness } from './business/garbage-collection-point-tree-division.business';
import { GarbageCollectionPointTreeSourceBusiness } from './business/garbage-collection-point-tree-point.business';

import { GarbageCollectionPointTreeBusiness } from './business/garbage-vehicle-camera-tree.business';

@Component({
  selector: 'garbage-collection-point-tree',
  templateUrl: './garbage-collection-point-tree.component.html',
  styleUrls: ['./garbage-collection-point-tree.component.less'],
  providers: [
    GarbageCollectionPointTreeBusiness,
    GarbageCollectionPointTreeDivisionBusiness,
    GarbageCollectionPointTreeSourceBusiness,
  ],
})
export class GarbageCollectionPointTreeComponent implements OnInit {
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
  constructor(public business: GarbageCollectionPointTreeBusiness) {
    this.business.loaded.subscribe(this.loaded);
  }

  ngOnInit(): void {}

  onSelectTreeNode(nodes: CommonFlatNode<DivisionTreeSource>[]) {
    this.selectTreeNode.emit(nodes);
  }
}
