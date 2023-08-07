import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Language } from 'src/app/common/tools/language';
import { ExportType } from 'src/app/enum/export-type.enum';

import { GarbageStationWeightTableBusiness } from './garbage-station-weight-table.business';
import { GarbageStationWeightTableConverter } from './garbage-station-weight-table.converter';
import {
  GarbageStationWeightTableArgs,
  GarbageStationWeightTableModel,
} from './garbage-station-weight-table.model';
import { GarbageStationWeightTableService } from './garbage-station-weight-table.service';
import { GarbageStationWeightTableDivisionService } from './service/garbage-station-weight-table-division.service';
import { GarbageStationWeightTableStationService } from './service/garbage-station-weight-table-station.service';

@Component({
  selector: 'garbage-station-weight-table',
  templateUrl: './garbage-station-weight-table.component.html',
  styleUrls: [
    '../table-vertical.less',
    './garbage-station-weight-table.component.less',
  ],
  providers: [
    GarbageStationWeightTableDivisionService,
    GarbageStationWeightTableStationService,
    GarbageStationWeightTableService,
    GarbageStationWeightTableConverter,
    GarbageStationWeightTableBusiness,
  ],
})
export class GarbageStationWeightTableComponent implements OnInit {
  @Input()
  isinit = true;
  @Input()
  args: GarbageStationWeightTableArgs = new GarbageStationWeightTableArgs();
  @Input()
  load?: EventEmitter<GarbageStationWeightTableArgs>;
  @Output()
  loaded: EventEmitter<GarbageStationWeightTableModel[]> = new EventEmitter();
  @Input()
  excel?: EventEmitter<string>;
  @Input()
  csv?: EventEmitter<string>;

  constructor(private business: GarbageStationWeightTableBusiness) {}

  datas: GarbageStationWeightTableModel[] = [];
  widths: string[] = ['15%', '30%', '25%', '15%', '15%'];
  headers = ['序号', '名称', '行政区', '干垃圾重量(KG)', '湿垃圾重量(KG)'];
  sort?: Sort;

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((args) => {
        this.args = args;
        this.loadData();
      });
    }
    if (this.excel) {
      this.excel.subscribe((x) => {
        this.ondownload(ExportType.excel, x);
      });
    }
    if (this.csv) {
      this.csv.subscribe((x) => {
        this.ondownload(ExportType.csv, x);
      });
    }
    if (this.isinit) {
      this.loadData();
    }
  }

  loadData(): void {
    this.business.load(this.args).then((x) => {
      this.datas = x;
      if (this.sort) {
        this.sortData(this.sort);
      }
      this.loaded.emit(x);
    });
  }

  sortData(sort: Sort) {
    this.sort = sort;
    const isAsc = sort.direction === 'asc';

    this.datas = this.datas.sort((a, b) => {
      if (isAsc) {
        return a.weight[sort.active] - b.weight[sort.active];
      } else {
        return b.weight[sort.active] - a.weight[sort.active];
      }
    });
  }

  ondownload(type: ExportType, title: string) {
    let name = `${Language.Date(
      this.args.date,
      this.args.unit
    )} ${Language.DivisionType(this.args.type)} ${title} 总数据`;
    this.business.download(type, name, this.headers, this.datas);
  }
}
