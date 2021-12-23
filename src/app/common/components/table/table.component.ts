import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
})
export class TableComponent implements OnInit {
  @Input()
  dataSource = new MatTableDataSource<any>();

  @Input()
  displayedColumns: string[] = [];

  constructor() {}

  ngOnInit(): void {
    // this.dataSource.data = ELEMENT_DATA;
  }
}
