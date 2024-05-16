import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { MapControlTreeArgs } from '../map-control-tree/map-control-tree.model';

@Component({
  selector: 'map-control-tree-panel',
  templateUrl: './map-control-tree-panel.component.html',
  styleUrls: ['./map-control-tree-panel.component.less'],
})
export class MapControlTreePanelComponent implements OnInit {
  @Output() select: EventEmitter<Division | GarbageStation> =
    new EventEmitter();
  @Input() load?: EventEmitter<MapControlTreeArgs>;
  @Output() info: EventEmitter<GarbageStation> = new EventEmitter();

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((x) => {
        this.tree.args.refresh = true;
        this.tree.load.emit(this.tree.args);
      });
    }
  }

  tree = {
    args: new MapControlTreeArgs(),
    load: new EventEmitter<MapControlTreeArgs>(),
  };

  onselect(item: Division | GarbageStation) {
    this.select.emit(item);
  }

  onsearch(text: string) {
    this.tree.args.name = text;
    this.onfilter();
  }

  onstateall() {
    if (
      this.tree.args.isnormal &&
      this.tree.args.isfull &&
      this.tree.args.isdrop &&
      this.tree.args.iserror
    ) {
      this.tree.args.isnormal = false;
      this.tree.args.isfull = false;
      this.tree.args.isdrop = false;
      this.tree.args.iserror = false;
    } else {
      this.tree.args.isnormal = true;
      this.tree.args.isfull = true;
      this.tree.args.isdrop = true;
      this.tree.args.iserror = true;
    }
    this.onfilter();
  }

  onfilter() {
    this.tree.args.refresh = false;
    this.tree.load.emit(this.tree.args);
  }

  ontree() {
    this.tree.args.juststation = false;
    this.onfilter();
  }
  onlist() {
    this.tree.args.juststation = true;
    this.onfilter();
  }

  oninfo(item: GarbageStation) {
    this.info.emit(item);
  }
}
