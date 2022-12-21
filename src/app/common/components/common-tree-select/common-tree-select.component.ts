import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Type,
  ViewChild,
} from '@angular/core';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { CommonTree } from '../common-tree/common-tree';
import { LabelTreeComponent } from '../label-tree/label-tree.component';

/**
 *  显示树的选中节点信息
 */
@Component({
  selector: 'common-tree-select',
  templateUrl: './common-tree-select.component.html',
  styleUrls: ['./common-tree-select.component.less'],
})
export class CommonTreeSelecComponent
  implements OnInit, AfterViewInit, AfterContentInit
{
  @Input()
  showDropDown = false;

  @Input()
  selectedNodes: CommonFlatNode[] = [];

  @Output() toggleDropDown = new EventEmitter<boolean>();
  @Output() removeDropItem = new EventEmitter();

  @ContentChild('tree') tree?: CommonTree;

  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {}
  ngAfterContentInit(): void {}
  toggleHandler(e: Event) {
    e.stopPropagation();
    this.showDropDown = !this.showDropDown;
    this.toggleDropDown.emit(this.showDropDown);
  }
  removeNode(e: Event, node: CommonFlatNode) {
    e.stopPropagation();

    this.tree?.toggleNodes([node.Id]);

    this.removeDropItem.emit(node);
  }
  closeDropDown() {
    this.showDropDown = false;
  }
  blur() {
    this.showDropDown = false;
  }
}
