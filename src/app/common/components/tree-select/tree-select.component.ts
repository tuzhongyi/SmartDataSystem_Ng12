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
  selector: 'tree-select',
  templateUrl: './tree-select.component.html',
  styleUrls: ['./tree-select.component.less'],
})
export class TreeSelecComponent
  implements OnInit, AfterViewInit, AfterContentInit
{
  show = false;

  @Input()
  selectedNodes: CommonFlatNode[] = [];

  @Output() defaultIdsChange = new EventEmitter<string[]>();

  defaultIds: string[] = [];

  @ContentChild('tree') tree?: CommonTree;

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {}
  ngAfterContentInit(): void {}
  toggleHandler() {
    this.show = !this.show;
  }
  removeNode(e: Event, node: CommonFlatNode) {
    e.stopPropagation();
    // this.changeDetector.detectChanges();

    console.log(this.tree);
    this.tree?.toggleNodes([node.Id]);
  }
}
