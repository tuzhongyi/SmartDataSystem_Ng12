import { Component, Input, OnInit } from '@angular/core';
import { SelectItem } from '../select-control/select-control.model';

@Component({
  selector: 'app-tab-title',
  templateUrl: './tab-title.component.html',
  styleUrls: ['./tab-title.component.less'],
})
export class TabTitleComponent implements OnInit {
  @Input()
  title: string = '';

  constructor() {}

  ngOnInit(): void {}
}
