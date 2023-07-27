import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Language } from 'src/app/common/tools/language';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { GarbageDropRecordFilter } from '../garbage-drop-record-table/garbage-drop-record.model';
import { GarbageDropRecordTaskTableDownloadBusiness } from './garbage-drop-record-task-table-download.business';
import { GarbageDropRecordTaskTableBusiness } from './garbage-drop-record-task-table.business';
import { GarbageDropRecordTaskTableConverter } from './garbage-drop-record-task-table.converter';
import {
  GarbageDropRecordTaskTableModel,
  IGarbageDropRecordTaskTableBusiness,
} from './garbage-drop-record-task-table.model';
import { GarbageDropRecordTaskTableService } from './garbage-drop-record-task-table.service';

@Component({
  selector: 'garbage-drop-record-task-table',
  templateUrl: './garbage-drop-record-task-table.component.html',
  styleUrls: [
    '../table.less',
    './garbage-drop-record-task-table.component.less',
  ],
  providers: [
    GarbageDropRecordTaskTableService,
    GarbageDropRecordTaskTableConverter,
    GarbageDropRecordTaskTableBusiness,
    GarbageDropRecordTaskTableDownloadBusiness,
  ],
})
export class GarbageDropRecordTaskTableComponent implements OnInit {
  @Input() business: IGarbageDropRecordTaskTableBusiness;
  @Input() load?: EventEmitter<GarbageDropRecordFilter>;
  @Input() args: GarbageDropRecordFilter = new GarbageDropRecordFilter();
  @Output() loaded: EventEmitter<GarbageDropRecordTaskTableModel[]> =
    new EventEmitter();

  constructor(
    business: GarbageDropRecordTaskTableBusiness,
    private downloader: GarbageDropRecordTaskTableDownloadBusiness
  ) {
    this.business = business;
  }
  widths: Array<string | undefined> = [
    undefined,
    undefined,
    undefined,
    undefined,
    '5%',
  ];
  loading = false;
  datas: GarbageDropRecordTaskTableModel[] = [];
  total?: GarbageDropRecordTaskTableModel;
  type: DivisionType = DivisionType.None;
  Language = Language;
  ngOnInit(): void {
    console.log(this.load);
    if (this.load) {
      this.load.subscribe((x) => {
        this.args = x;
        this.loadData();
      });
    }
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.business.load(this.args).then((data) => {
      this.datas = data;
      this.total = this.business.total(data);
      this.type = EnumHelper.GetDivisionChildType(
        this.business.division.DivisionType
      );

      this.loading = false;
      this.loaded.emit(this.datas);
    });
  }

  sortData(sort: Sort) {
    const isAsc = sort.direction === 'asc';
    this.datas = this.datas.sort((a, b) => {
      return LocaleCompare.compare(a[sort.active], b[sort.active], isAsc);
    });
  }

  ondownload() {
    if (this.total) {
      this.downloader.download(
        this.args.duration.begin,
        this.type,
        this.datas,
        this.total
      );
    }
  }
}
