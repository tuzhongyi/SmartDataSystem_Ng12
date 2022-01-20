import { Component, OnInit } from '@angular/core';
import { columns } from 'src/app/aiop-system/components/illegal-drop-record/columns';
import { TableColumnModel } from 'src/app/view-model/table.model';

@Component({
  selector: 'howell-event-record-details-table',
  templateUrl: './event-record-details-table.component.html',
  styleUrls: ['./event-record-details-table.component.less'],
})
export class EventRecordDetailsTableComponent implements OnInit {
  columns: TableColumnModel[] = columns;

  constructor() {}

  ngOnInit(): void {}
}
