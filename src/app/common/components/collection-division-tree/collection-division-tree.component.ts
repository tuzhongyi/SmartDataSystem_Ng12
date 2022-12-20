import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { CollectionDivisionTreeBusiness } from './collection-division-tree.business';

@Component({
  selector: 'collection-division-tree',
  templateUrl: './collection-division-tree.component.html',
  styleUrls: ['./collection-division-tree.component.less'],
  providers: [CollectionDivisionTreeBusiness],
})
export class CollectionDivisionTreeComponent implements OnInit {
  @Input()
  selectStrategy: SelectStrategy = SelectStrategy.Single;

  @Output()
  selectTreeNode = new EventEmitter();

  constructor(public business: CollectionDivisionTreeBusiness) {}

  ngOnInit(): void {}
  onSelectTreeNode(nodes: CommonFlatNode<any>[]) {
    this.selectTreeNode.emit(nodes);
  }
}
