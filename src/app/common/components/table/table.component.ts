import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { TableModel } from 'src/app/view-model/table.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
})
export class TableComponent implements OnInit {
  @Input()
  dataSource: any[] = [];

  @Input()
  columns: TableModel[] = [];

  @Input()
  displayedColumns: string[] = [];

  constructor() {}

  ngOnInit(): void {
    // console.log(this.columns, this.displayedColumns);
  }
}
