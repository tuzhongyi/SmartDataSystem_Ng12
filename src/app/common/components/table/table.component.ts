import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElement } from 'src/app/aiop-system/components/garbage-events/illegal-drop-record/illegal-drop-record.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
})
export class TableComponent implements OnInit {
  @Input()
  data: PeriodicElement[] = [];

  @Input()
  displayedColumns: string[] = [];

  dataSource = new MatTableDataSource<any>();

  constructor() {}

  ngOnInit(): void {
    this.dataSource.data = this.data;
  }
}
