import { FlatTreeControl } from '@angular/cdk/tree';
import { Injectable } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { MapControlTreeNode } from './map-control-tree.model';
@Injectable()
export class MapControlTreeController {
  datas: MapControlTreeNode[] = [];
  private _source?: MatTreeFlatDataSource<
    MapControlTreeNode,
    MapControlTreeNode
  >;

  source(control: FlatTreeControl<MapControlTreeNode>) {
    let flattener = this.flattener();
    this._source = new MatTreeFlatDataSource(control, flattener);
    return this._source;
  }

  control() {
    return new FlatTreeControl<MapControlTreeNode>(this.level, this.expandable);
  }

  private flattener() {
    return new MatTreeFlattener(
      this.transformer,
      this.level,
      this.expandable,
      this.children
    );
  }

  private transformer(node: MapControlTreeNode, level: number) {
    return node;
  }

  private level(node: MapControlTreeNode) {
    return node.level;
  }

  private expandable(node: MapControlTreeNode) {
    return node.extendable;
  }

  private children(node: MapControlTreeNode) {
    return node.children;
  }
}
