import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DivisionTreeComponent } from 'src/app/common/components/division-tree/division-tree.component';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { CollectionDivisionTreeBusiness } from '../../../../common/business/collection-division-tree.business';

@Component({
  selector: 'collection-division-tree',
  templateUrl: './collection-division-tree.component.html',
  styleUrls: ['./collection-division-tree.component.less'],
  providers: [CollectionDivisionTreeBusiness],
})
export class CollectionDivisionTreeComponent implements OnInit {
  @Input() depth = 1;

  @Output()
  selectTreeNode = new EventEmitter();

  @ViewChild(DivisionTreeComponent) tree?: DivisionTreeComponent;

  constructor(public business: CollectionDivisionTreeBusiness) {}

  ngOnInit(): void {}
  onSelectTreeNode(nodes: CommonFlatNode<any>[]) {
    this.selectTreeNode.emit(nodes);
  }

  toggleNodes(ids: string[], clear?: boolean) {
    this.tree?.toggleNodes(ids);
  }
}
