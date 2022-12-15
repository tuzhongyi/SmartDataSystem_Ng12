import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonTabModel } from 'src/app/common/components/common-tab/common-tab.model';

@Component({
  selector: 'common-tab',
  templateUrl: './common-tab.component.html',
  styleUrls: ['./common-tab.component.less'],
})
export class CommonTabComponent implements OnInit {
  @Input() dataSource: CommonTabModel[] = [];

  @Output() clickEvent = new EventEmitter<CommonTabModel>();

  curIndex = 0;

  constructor() {}

  ngOnInit(): void {}

  clickTab(model: CommonTabModel, index: number, e: Event) {
    e.stopPropagation();
    this.curIndex = index;
    this.clickEvent.emit(model);
  }
}
