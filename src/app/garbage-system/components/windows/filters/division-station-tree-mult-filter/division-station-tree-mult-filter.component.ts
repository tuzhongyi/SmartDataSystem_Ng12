import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TreeComponent } from 'src/app/common/components/tree/tree.component';
import { HorizontalAlign } from 'src/app/enum/direction.enum';
import { DistrictTreeEnum } from 'src/app/enum/district-tree.enum';
import { SelectEnum } from 'src/app/enum/select.enum';
import { TreeBusinessEnum } from 'src/app/enum/tree-business.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { LocalStorageService } from 'src/app/global/service/local-storage.service';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { FlatTreeNode } from 'src/app/view-model/flat-tree-node.model';
import { DivisionStationTreeFilterConfig } from './division-station-tree-mult-filter.model';

@Component({
  selector: 'howell-division-station-tree-mult-filter',
  templateUrl: './division-station-tree-mult-filter.component.html',
  styleUrls: ['./division-station-tree-mult-filter.component.less'],
})
export class DivisionStationTreeMultFilterComponent
  implements OnInit, OnChanges {
  @Input()
  userType = UserResourceType.County;
  @Output()
  onselect: EventEmitter<string[]> = new EventEmitter();
  @Output()
  maxSelection: number = Number.MAX_VALUE;

  constructor(private local: LocalStorageService) { }

  @ViewChild('tree')
  tree?: TreeComponent;
  HorizontalAlign = HorizontalAlign;
  align: HorizontalAlign = HorizontalAlign.left;
  expand = false;

  selected: Array<Division | GarbageStation> = [];
  selectedIds: string[] = [];
  config = new DivisionStationTreeFilterConfig();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.userType) {
      if (this.userType === UserResourceType.Station) {
        this.config.tree.treeServiceModel = DistrictTreeEnum.Station;
      } else {
        this.config.tree.treeServiceModel = DistrictTreeEnum.Division;
      }
      switch (this.userType) {
        case UserResourceType.Committees:
          this.config.tree.depth = 1;
          this.config.tree.showDepth = 0;
          this.config.tree.depthIsEnd = true;
          break;
        case UserResourceType.County:
        case UserResourceType.City:
          this.config.tree.depth = 0;
          this.config.tree.showDepth = 0;
          this.config.tree.depthIsEnd = true;
          break;
        case UserResourceType.Station:
          let depth = 0;
          let showDepth = 0;
          if (
            this.local.user.Resources &&
            this.local.user.Resources.length > 0
          ) {
            if (
              this.local.user.Resources[0].ResourceType ==
              UserResourceType.County
            ) {
              depth = 1;
              showDepth = 1;
            }
          }
          this.config.tree.depth = depth;
          this.config.tree.showDepth = showDepth;
          this.config.tree.depthIsEnd = false;
          break;
        default:
          break;
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
    this.selectedIds = this.selected.map((x) => x.Id);
    if (this.tree) {
      this.tree.toggleSelect(this.selectedIds);
    }
    this.onselect.emit(this.selectedIds);
  }

  onpanelclick(event: Event) {
    event.cancelBubble = true;
  }
  onchiplistclicked(event: Event) {
    this.expand = !this.expand;
    event.cancelBubble = true;
  }

  selectTree(nodes: FlatTreeNode[]) {
    this.selected = [];
    this.selectedIds = [];
    let index = nodes.findIndex((x) => x.type === this.userType);
    // if (index >= 0) {
    //   return;
    // }
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.type !== this.userType) {
        continue;
      }
      this.selected.push(node.rawData);
      this.selectedIds.push(node.id);
      // this.current = node;
      // this.select.emit(node.data);
    }

    this.onselect.emit(this.selectedIds);
  }
}
