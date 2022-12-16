import { Component, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'collection-member-window',
  templateUrl: './collection-member-window.component.html',
  styleUrls: ['./collection-member-window.component.less'],
})
export class CollectionMemberWindowComponent implements OnInit {
  constructor() {
   
  }

  ngOnInit(): void {}
  searchEvent(condition: string) {
    // this.searchInfo.Condition = condition;
    // this.searchInfo.PageIndex = 1;
    // this._init();
  }
}
