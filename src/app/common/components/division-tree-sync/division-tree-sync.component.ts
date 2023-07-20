import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ClassConstructor } from 'class-transformer';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { CommonNestNode } from 'src/app/view-model/common-nest-node.model';
import { CommonTree } from '../common-tree/common-tree';
import { CommonTreeComponent } from '../common-tree/common-tree.component';
import { DivisionTreeComponent } from '../division-tree/division-tree.component';
import { DivisionTreeSource } from '../division-tree/division-tree.model';

import { DivisionTreeSyncBusiness } from './division-tree-sync.business';
import { DivisionTreeSyncArgs } from './division-tree-sync.model';

@Component({
  selector: 'howell-division-tree-sync',
  templateUrl: './division-tree-sync.component.html',
  styleUrls: ['./division-tree-sync.component.less'],
  providers: [DivisionTreeSyncBusiness],
})
export class DivisionTreeSyncComponent
  extends CommonTree
  implements OnInit, OnChanges
{
  @Input() depth = 1;
  @Input() depthIsEnd = false;
  @Input() showDepth: number = -1;
  @Input() holdStatus = false;
  @Input() selectStrategy = SelectStrategy.Single;
  @Input() showStation = false;
  @Input() showSearchBar = true;
  @Input() showButtonIcon = false;
  @Input() resourceType: DivisionType = DivisionType.City;
  @Input() filterTypes: ClassConstructor<any>[] = [];
  @Input() load: EventEmitter<void> = new EventEmitter();
  @Input() defaultIds: string[] = [];
  @Output() defaultIdsChange = new EventEmitter<string[]>();
  @Output() selectTreeNode: EventEmitter<CommonFlatNode<DivisionTreeSource>[]> =
    new EventEmitter<CommonFlatNode<DivisionTreeSource>[]>();
  @Output() holdStatusChange: EventEmitter<boolean> = new EventEmitter();
  @Output() buttonIconClickEvent = new EventEmitter<CommonFlatNode>();
  @Output() loaded: EventEmitter<CommonNestNode[]> = new EventEmitter();

  constructor(public business: DivisionTreeSyncBusiness) {
    super();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if ('showStation' in changes) {
      this.args.showStation = this.showStation;
    }
    if ('depth' in changes) {
      this.args.depth = this.depth;
    }
    if ('resourceType' in changes) {
      this.args.resourceType = this.resourceType;
    }
  }
  ngOnInit(): void {
    this.init();
  }
  private args = new DivisionTreeSyncArgs();
  @ViewChild(DivisionTreeComponent) tree?: CommonTreeComponent;

  async init() {
    this._nestedNodeMap = this.business.nestedNodeMap;

    let res = await this.business.load(this.args);
    this.dataSubject.next(res);
    this.load.emit();
    this.loaded.emit();
  }

  onSelectTreeNode(nodes: CommonFlatNode<any>[]) {
    this.selectTreeNode.emit(nodes);
  }
  onDefaultIdsChange(args: string[]) {
    this.defaultIdsChange.emit(args);
  }
  onHoldStatusChange(args: boolean) {
    this.holdStatusChange.emit(args);
  }
  onButtonIconClickEvent(args: CommonFlatNode) {
    this.buttonIconClickEvent.emit(args);
  }
  onLoaded(args: CommonNestNode[]) {
    this.loaded.emit(args);
  }

  async searchEventHandler(condition: string) {
    if (this.args.name == condition && this.args.name != '') {
      return;
    }

    this.args.name = condition;

    let res = await this.business.searchNode(this.args);
    if (res && res.length) {
      this.dataSubject.next(res);
      if (condition != '') {
        this.tree?.expandAll();
      } else {
        this.tree?.reset();
        this.tree?.collapseAll();
      }
    } else {
    }
  }
}
