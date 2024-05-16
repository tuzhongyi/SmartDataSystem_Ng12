import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { ListPanelDivisionBusiness } from './map-control-list-panel-division.business';
import { ListPanelStationBusiness } from './map-control-list-panel-station.business';
import { ListPanelBusiness } from './map-control-list-panel.business';
import {
  ListItem,
  ListItemType,
  MapListPanelArgs,
} from './map-control-list-panel.model';
import { ListPanelConverter } from './map-list-panel.converter';

@Component({
  selector: 'app-map-list-panel',
  templateUrl: './map-list-panel.component.html',
  styleUrls: ['./map-list-panel.component.less'],
  providers: [
    ListPanelConverter,
    ListPanelDivisionBusiness,
    ListPanelStationBusiness,
    ListPanelBusiness,
  ],
})
export class MapListPanelComponent implements OnInit {
  @Output() select: EventEmitter<Division | GarbageStation> =
    new EventEmitter();

  constructor(private business: ListPanelBusiness) {}

  datas: Array<ListItem<Division | GarbageStation>> = [];
  standBySearching: Array<ListItem<Division | GarbageStation>> = [];

  args = new MapListPanelArgs();

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.business.load(this.args).then((x) => {
      this.datas = x;
    });
  }

  onclick(e: Event, item: ListItem<Division | GarbageStation>) {
    switch (item.type) {
      case ListItemType.Division:
      case ListItemType.Parent:
        this.args.divisionId = item.Id;
        this.loadData();
        break;

      default:
        break;
    }

    this.select.emit(item.Data);
    e.stopImmediatePropagation();
  }

  searched = false;

  search(text: string) {
    if (text) {
      this.business.search(text).then((x) => {
        this.datas = x;
      });
    } else {
      this.loadData();
    }
  }
}
