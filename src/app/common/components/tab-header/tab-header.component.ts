import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TabHeaderModel } from 'src/app/view-model/tab-header.model';

@Component({
  selector: 'howell-tab-header',
  templateUrl: './tab-header.component.html',
  styleUrls: ['./tab-header.component.less'],
})
export class TabHeaderComponent implements OnInit {
  currentIndex = 0;

  @Input() headers: TabHeaderModel[] = [];

  @Output() tabHeaderEvent: EventEmitter<TabHeaderModel> =
    new EventEmitter<TabHeaderModel>();
  constructor() {}

  ngOnInit(): void {}

  tabClicked(header: TabHeaderModel, index: number, e: Event) {
    console.log(header);
    this.currentIndex = index;

    this.tabHeaderEvent.emit(header);
  }
}
