import { AfterViewInit, Component, ContentChild, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { CommonTree } from '../common-tree/common-tree';

@Component({
  selector: 'howell-label-list',
  templateUrl: './label-list.component.html',
  styleUrls: ['./label-list.component.less']
})
export class LabelListComponent implements OnInit, AfterViewInit {

  @Input()
  selectedNodes: CommonFlatNode[] = [];

  show = false;

  @ContentChild('tree') tree?: CommonTree;

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
  }

  toggleHandler() {
    this.show = !this.show;
  }
  removeNode(e: Event, node: CommonFlatNode) {
    e.stopPropagation();
    if (this.tree) {
      this.tree.toggleNodes([node.Id])
    }
  }

}
