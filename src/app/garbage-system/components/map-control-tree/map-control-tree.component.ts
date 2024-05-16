import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { MapControlTreeDivisionBusiness } from './business/map-control-tree-division.business';
import { MapControlTreeStationBusiness } from './business/map-control-tree-station.business';
import { MapControlTreeBusiness } from './business/map-control-tree.business';
import { MapControlTreeController } from './map-control-tree.controller';
import { MapControlTreeConverter } from './map-control-tree.converter';
import {
  MapControlButtonType,
  MapControlTreeArgs,
  MapControlTreeModel,
  MapControlTreeNode,
  MapControlTreeNodeButton,
} from './map-control-tree.model';

@Component({
  selector: 'map-control-tree',
  templateUrl: './map-control-tree.component.html',
  styleUrls: ['./map-control-tree.component.less'],
  providers: [
    MapControlTreeConverter,
    MapControlTreeDivisionBusiness,
    MapControlTreeStationBusiness,
    MapControlTreeBusiness,
    MapControlTreeController,
  ],
})
export class MapControlTreeComponent implements OnInit, OnDestroy {
  @Input() args = new MapControlTreeArgs();
  @Input() load?: EventEmitter<MapControlTreeArgs>;
  @Output() select: EventEmitter<Division | GarbageStation> =
    new EventEmitter();
  @Output() info: EventEmitter<GarbageStation> = new EventEmitter();

  constructor(
    private business: MapControlTreeBusiness,
    private creater: MapControlTreeController
  ) {
    let control = creater.control();
    let source = creater.source(control);
    this.tree = new MapControlTreeModel(control, source);
  }

  tree: MapControlTreeModel<MapControlTreeNode>;

  selected?: MapControlTreeNode;
  datas: MapControlTreeNode[] = [];
  loading = false;

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((x) => {
        this.args = x;
        if (this.args.refresh) {
          this.refreshData();
        } else {
          this.loadData();
        }
      });
    }
    this.loadData();
  }
  ngOnDestroy(): void {
    this.business.destroy();
  }

  refreshData() {
    this.business.refresh(this.args).then((flats) => {
      if (flats) {
        flats.forEach((flat) => {
          let data = this.business.find(flat.id, this.tree.source.data);
          if (data) {
            data.buttons = flat.buttons;
            data.icon = flat.icon;
            data.icontitle = flat.icontitle;
            data.data = flat.data;
          }
        });
      }
    });
  }

  loadData() {
    this.loading = true;
    if (this.args.juststation) {
      this.business.loadstation(this.args).then((x) => {
        this.datas = x;
        this.tree.source.data = x;
        this.loading = false;
      });
    } else {
      this.business.load(this.args).then((x) => {
        // this.datas = x.children ?? [];
        // this.tree.source.data = x.children ?? [];

        this.datas = x;
        this.tree.source.data = x;

        this.expands.forEach((value) => {
          let node = this.business.find(value, this.datas);
          if (node) {
            this.tree.control.expand(node);
          }
        });
        this.loading = false;
      });
    }
  }

  expands: string[] = [];

  async onclick(node: MapControlTreeNode) {
    if (this.tree.control.isExpanded(node)) {
      this.tree.control.collapse(node);
      this.expands = this.expands.filter((x) => x != node.id);
    } else {
      this.tree.control.expand(node);
      this.expands.push(node.id);
    }
  }

  async ondblclick(node: MapControlTreeNode) {
    if (node.data instanceof GarbageStation) {
      let division = await this.business.getDivision(node.parentId!);
      this.select.emit(division);

      this.selected = node;
      this.select.emit(node.data);
    }
  }

  onbuttonclick(e: Event, button: MapControlTreeNodeButton) {
    e.stopImmediatePropagation();
    switch (button.type) {
      case MapControlButtonType.info:
        this.info.emit(button.data);
        break;

      default:
        break;
    }
  }
}
