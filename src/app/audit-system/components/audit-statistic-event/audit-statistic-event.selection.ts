import { EventEmitter } from '@angular/core';
import { DivisionTreeSource } from 'src/app/common/components/division-tree/division-tree.model';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';

export class AuditStatisticEventSelection {
  show = false;
  selecteds: CommonFlatNode<DivisionTreeSource>[] = [];
  selected?: Division;
  select: EventEmitter<Division> = new EventEmitter();
  default: string[] = [];

  onselect(nodes: CommonFlatNode<DivisionTreeSource>[]) {
    this.selecteds = nodes;
    this.selected = undefined;
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.RawData instanceof Division) {
        this.selected = node.RawData;
        this.select.emit(this.selected);
        this.show = false;
        return;
      }
    }
    this.select.emit();
  }
}
