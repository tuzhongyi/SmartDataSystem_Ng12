import { Directive } from '@angular/core';
import { CommonTree } from '../components/common-tree/common-tree';
import { ICommonTree } from '../components/common-tree/common-tree.model';

@Directive({
  selector: '[label-select-content]',
})
export class TreeDirective implements ICommonTree {
  constructor(private e: CommonTree) {}
  toggleNodes(ids: string[], clear?: boolean | undefined): void {
    this.e.toggleNodes(ids, clear);
  }
}
