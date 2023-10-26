import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { HorizontalAlign } from 'src/app/enum/direction.enum';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { TreeBusinessEnum } from 'src/app/enum/tree-business.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { FlatTreeNode } from 'src/app/view-model/flat-tree-node.model';

@Component({
  selector: 'howell-division-station-tree-mult-filter',
  templateUrl: './division-station-tree-mult-filter.component.html',
  // styleUrls: ['./division-station-tree-mult-filter.component.less']
})
export class DivisionStationTreeMultFilterComponent
  implements OnInit, OnChanges
{
  @Input()
  userType = UserResourceType.County;
  @Output()
  onselect: EventEmitter<string[]> = new EventEmitter();
  constructor() {}

  HorizontalAlign = HorizontalAlign;
  align: HorizontalAlign = HorizontalAlign.left;
  expand = true;

  treeServiceModel: TreeBusinessEnum = TreeBusinessEnum.Division;
  treeSelectModel: SelectStrategy = SelectStrategy.Multiple;

  selected: Array<Division | GarbageStation> = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.userType) {
      if (this.userType === UserResourceType.Station) {
        this.treeServiceModel = TreeBusinessEnum.Station;
      } else {
        this.treeServiceModel = TreeBusinessEnum.Division;
      }
    }
  }

  ngOnInit(): void {
    window.addEventListener('click', () => {
      this.expand = false;
    });
  }

  remove(item: Division | GarbageStation): void {
    const index = this.selected.indexOf(item);

    if (index >= 0) {
      this.selected.splice(index, 1);
    }
  }

  onpanelclick(event: Event) {
    event.cancelBubble = true;
  }
  onchiplistclicked(event: Event) {
    this.expand = !this.expand;
    event.cancelBubble = true;
  }

  selectTreeNode(nodes: FlatTreeNode[]) {
    this.selected = [];
    let ids = [];
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      this.selected.push(node.data);
      ids.push(node.id);
      // this.current = node;
      // this.select.emit(node.data);
    }
    this.onselect.emit(ids);
  }
}
