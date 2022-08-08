import { AfterViewInit, Component, ContentChild, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
  styleUrls: ['./tree-select.component.less']
})
export class TreeSelecComponent implements OnInit, AfterViewInit {

  show = false;


  @Input()
  selectedNodes: CommonFlatNode[] = [];

  @Output() defaultIdsChange = new EventEmitter<string[]>();


  defaultIds: string[] = [];

  @ContentChild(CommonTree) tree?: CommonTree;

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
  }

  toggleHandler() {
    this.show = !this.show;

    // 仅在关闭的时候保存所有选中节点，用于恢复
    // if (!this.show) {
    //     this.defaultIds = this.selectedNodes.map(node => node.Id);
    // }
  }
  removeNode(e: Event, node: CommonFlatNode) {
    e.stopPropagation();
    if (this.tree) {
      this.tree.toggleNodes([node.Id])
    } else {

      // let index = this.selectedNodes.findIndex(v => v.Id == node.Id)
      // if (index != -1) {
      //   this.selectedNodes.splice(index, 1);

      //   this.defaultIds = this.selectedNodes.map(node => node.Id);
      //   this.defaultIdsChange.emit(this.defaultIds)
      // }
    }
  }

}
