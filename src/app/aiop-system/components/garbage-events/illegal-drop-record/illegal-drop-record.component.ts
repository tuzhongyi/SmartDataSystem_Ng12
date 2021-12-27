import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PagedList } from 'src/app/network/model/page_list.model';
import { IllegalDropRecordModel } from 'src/app/view-model/illegal-drop-record.model';
import {
  TableCellEvent,
  TableColumnModel,
} from 'src/app/view-model/table.model';
import { IllegalDropRecordBusiness } from './illegal-drop-record.business';
import { columns } from './columns';
import { SelectEnum } from 'src/app/enum/select.enum';

@Component({
  selector: 'app-illegal-drop-record',
  templateUrl: './illegal-drop-record.component.html',
  styleUrls: ['./illegal-drop-record.component.less'],
  providers: [IllegalDropRecordBusiness, DatePipe],
})
export class IllegalDropRecordComponent implements OnInit {
  /**private */
  private _pageIndex = 1;
  private _pageSize = 9;
  private _pagedList: PagedList<IllegalDropRecordModel> = new PagedList();

  /**public */
  show = false;
  dataSource: IllegalDropRecordModel[] = [];
  columns: TableColumnModel[] = [...columns];
  displayedColumns: string[] = this.columns.map((column) => column.columnDef);
  // .concat([
  //   'ImageUrl',
  //   'ResourceName',
  //   'StationName',
  //   'CountyName',
  //   'CommitteeName',
  //   'EventTime',
  // ]);
  tableSelectModel = SelectEnum.Single;

  constructor(private _business: IllegalDropRecordBusiness) {
    this._pagedList.Data = [];
    this.dataSource = this._pagedList.Data;

    this._business._dataStream.subscribe(
      (res: PagedList<IllegalDropRecordModel>) => {
        this.dataSource = res.Data;
        this._pagedList = res;
      }
    );
  }

  ngOnInit(): void {
    this.initialize();
  }
  async initialize() {
    let res = await this._business.loadData(this._pageIndex);
  }
  async prev() {
    let res = await this._business.loadData(--this._pageIndex);
  }
  async next() {
    let res = await this._business.loadData(++this._pageIndex);
  }
  selectTableRow(row: IllegalDropRecordModel[]) {
    console.log('row', row);
  }
  selectTableCell(cell: TableCellEvent) {
    console.log('cell', cell);
    if (
      cell.column.columnDef == 'ImageUrl' ||
      cell.column.columnDef == 'Operation'
    ) {
      cell.event.stopPropagation();
    }
  }
}
