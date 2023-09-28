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
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { HorizontalAlign } from 'src/app/enum/direction.enum';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { DivisionStationTreeFilterConfig } from './division-station-tree-mult-filter.model';

@Component({
  selector: 'howell-division-station-tree-mult-filter',
  templateUrl: './division-station-tree-mult-filter.component.html',
  styleUrls: ['./division-station-tree-mult-filter.component.less'],
})
export class DivisionStationTreeMultFilterComponent
  implements OnInit, OnChanges
{
  @Input()
  divisionType = DivisionType.County;
  @Output() onselect: EventEmitter<string[]> = new EventEmitter();
  @Input() maxSelection: number = Number.MAX_VALUE;
  @Input() onlystation = false;

  constructor(private local: LocalStorageService) {}

  @ViewChild('tree')
  tree?: TreeComponent;
  HorizontalAlign = HorizontalAlign;
  align: HorizontalAlign = HorizontalAlign.left;
  expand = false;

  selected: Array<Division | GarbageStation> = [];
  selectedIds: string[] = [];
  config = new DivisionStationTreeFilterConfig();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.divisionType) {
    }
  }

  ngOnInit(): void {
    window.addEventListener('click', () => {
      this.expand = false;
    });
    this.init();
  }

  init() {
    this.config.tree.showStation = this.divisionType === DivisionType.None;

    switch (this.divisionType) {
      case DivisionType.Committees:
        this.config.tree.depth = 1;
        this.config.tree.showDepth = 0;
        this.config.tree.depthIsEnd = true;
        break;
      case DivisionType.County:
      case DivisionType.City:
        this.config.tree.depth = 0;
        this.config.tree.showDepth = 0;
        this.config.tree.depthIsEnd = true;
        break;
      case DivisionType.None:
        let depth = 0;
        let showDepth = 0;
        if (this.local.user.Resources && this.local.user.Resources.length > 0) {
          if (
            this.local.user.Resources[0].ResourceType == UserResourceType.County
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

  selectTree(nodes: CommonFlatNode[]) {
    this.selected = [];
    this.selectedIds = [];

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.RawData instanceof Division) {
        if (node.RawData.DivisionType !== this.divisionType) {
          continue;
        }
      }

      this.selected.push(node.RawData);
      this.selectedIds.push(node.Id);
      if (this.selected.length >= this.maxSelection) {
        break;
      }
    }

    this.onselect.emit(this.selectedIds);
  }
}
