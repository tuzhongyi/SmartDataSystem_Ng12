import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IllegalDropRecordBusiness } from './illegal-drop-record.business';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-illegal-drop-record',
  templateUrl: './illegal-drop-record.component.html',
  styleUrls: ['./illegal-drop-record.component.less'],
  providers: [IllegalDropRecordBusiness],
})
export class IllegalDropRecordComponent implements OnInit {
  show = false;
  displayedColumns: string[] = ['position', 'weight', 'symbol', 'name'];
  data = ELEMENT_DATA;

  pageIndex = 1;
  pageSize = 9;

  constructor(private _business: IllegalDropRecordBusiness) {}
  ngOnInit(): void {
    this._business.loadData(this.pageIndex);
  }
  prev() {
    this.pageIndex--;
    this._business.loadData(this.pageIndex);
  }
  next() {
    this.pageIndex++;
    this._business.loadData(this.pageIndex);
  }
}
