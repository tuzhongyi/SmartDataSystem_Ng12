import { Component, OnInit } from '@angular/core';
import { Time } from 'src/app/common/tools/time';
import { CollectionPointBusiness } from './collection-point.business';
import { CollectionPointConverter } from './collection-point.converter';
import {
  CollectionPointModel,
  CollectionPointSearchInfo,
} from './collection-point.model';

@Component({
  selector: 'collection-point',
  templateUrl: './collection-point.component.html',
  styleUrls: ['./collection-point.component.less'],
  providers: [
    {
      provide: CollectionPointBusiness,
      useClass: CollectionPointBusiness,
    },
    CollectionPointConverter,
  ],
})
export class CollectionPointComponent implements OnInit {
  tdWidth = ['15%', '10%', '15%', '5%'];

  dataSource: CollectionPointModel[] = [];

  searchInfo: CollectionPointSearchInfo = {
    BeginTime: Time.beginTime(new Date()),
    EndTime: Time.endTime(new Date()),
  };

  constructor(private _business: CollectionPointBusiness) {}

  ngOnInit(): void {
    this._init();

    // console.log(Time.curWeek(new Date()));
  }
  private async _init() {
    this.dataSource = await this._business.init(this.searchInfo);
    // console.log(this.dataSource);
  }
}
