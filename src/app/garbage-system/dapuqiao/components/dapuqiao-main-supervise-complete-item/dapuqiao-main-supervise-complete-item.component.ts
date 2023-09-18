import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dapuqiao-main-supervise-complete-item',
  templateUrl: './dapuqiao-main-supervise-complete-item.component.html',
  styleUrls: ['./dapuqiao-main-supervise-complete-item.component.less'],
})
export class DapuqiaoMainSuperviseCompleteItemComponent implements OnInit {
  @Input() left = false;
  @Input() top = false;
  @Input() bottom = false;

  @Input() lineOffset = '24px';
  @Input() width = '270px';
  @Input() note?: string;
  @Input() color?: string;

  constructor() {}

  ngOnInit(): void {}
}
