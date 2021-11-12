import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { TreeSelectMode } from 'src/app/enum/tree-select-mode.enum';
import { FlatTreeNode } from 'src/app/view-model/flat-tree-node.model';
import { NestedTreeNode } from 'src/app/view-model/nested-tree-node.model';

@Component({
  selector: 'app-base-flat-tree',
  templateUrl: './base-flat-tree.component.html',
  styleUrls: ['./base-flat-tree.component.less'],
})
export class BaseFlatTreeComponent implements OnInit {
  @Input() data: NestedTreeNode[] = [];
  @Input() selectMode: TreeSelectMode = TreeSelectMode.single;

  @Output() selectEvent = new EventEmitter<FlatTreeNode[]>();

  private transformer = (node: NestedTreeNode, level: number) => {
    let FlatTreeNode: FlatTreeNode = {
      name: node.name,
      level: level,
      expandable: !!node.children && node.children.length > 0,
    };
    return FlatTreeNode;
  };

  private treeFlattener = new MatTreeFlattener(
    this.transformer,
    (node: FlatTreeNode) => node.level,
    (node: FlatTreeNode) => node.expandable,
    (node: NestedTreeNode) => node.children
  );
  public treeControl = new FlatTreeControl<FlatTreeNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  public dataSource = new MatTreeFlatDataSource(
    this.treeControl,
    this.treeFlattener
  );

  public currentNode: FlatTreeNode | null = null;
  public selectedNodes: FlatTreeNode[] = [];

  constructor() {}
  ngOnInit() {
    this.data.push();

    this.dataSource.data = this.data;
  }
  hasChild(_: number, node: FlatTreeNode) {
    return node.expandable;
  }
  clickNode(node: FlatTreeNode) {
    if (this.selectMode == TreeSelectMode.single) {
      if (this.currentNode == node) {
        this.currentNode = null;
        this.selectEvent.emit([]);
      } else {
        this.currentNode = node;
        this.selectEvent.emit([node]);
      }
    } else if (this.selectMode == TreeSelectMode.multiple) {
    }
  }
}
