import { EventEmitter } from '@angular/core';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';

export class LabelTreeManager {
  constructor(type: DivisionType) {
    this.type = type;
    this.depth = this.getDepth(type);
  }
  getDepth(type: DivisionType) {
    switch (type) {
      case DivisionType.Community:
      case DivisionType.Committees:
        return 1;
      case DivisionType.County:
        return 2;
      case DivisionType.City:
        return 3;
      case DivisionType.Province:
        return 4;
      case DivisionType.None:
      default:
        return 0;
    }
  }
  depth: number = 2;
  type: DivisionType;
  select: EventEmitter<string> = new EventEmitter();
  expand: boolean = true;
  nodes: CommonFlatNode[] = [];
  ids: Array<string> = [];
  onselected(nodes: CommonFlatNode[]) {
    if (nodes.length === 0) return;

    if (nodes[0].RawData instanceof GarbageStation) {
      this.nodes = nodes;
      let ids = nodes.map((x) => x.Id);
      this.select.emit(ids[0]);
      this.expand = false;
    }
  }
  ontoggle(expend: boolean) {
    if (expend === false) {
      this.ids = this.nodes.map((x) => x.Id);
    }
  }
}
