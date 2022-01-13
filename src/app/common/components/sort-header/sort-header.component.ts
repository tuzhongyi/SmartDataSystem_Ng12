import { Component, Input, OnInit } from '@angular/core';
import { MatSortHeader } from '@angular/material/sort';

@Component({
  selector: '[howell-sort-header]',
  exportAs: 'howellSortHeader',
  templateUrl: './sort-header.component.html',
  styleUrls: ['./sort-header.component.less'],
})
export class SortHeaderComponent extends MatSortHeader {
  @Input('howell-sort-header') id: string = '';
}
