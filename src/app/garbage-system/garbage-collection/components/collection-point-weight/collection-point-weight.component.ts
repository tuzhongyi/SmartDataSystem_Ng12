import { Component, OnInit } from '@angular/core';
import { TimeService } from 'src/app/common/service/time.service';
import { CollectionPointWeightBusiness } from './collection-point-weight.business';
import { CollectionPointWeightConverter } from './collection-point-weight.converter';
import {
  CollectionPointWeightModel,
  CollectionPointWeightSearchInfo,
} from './collection-point-weight.model';

@Component({
  selector: 'collection-point-weight',
  templateUrl: './collection-point-weight.component.html',
  styleUrls: ['./collection-point-weight.component.less'],
  providers: [
    {
      provide: CollectionPointWeightBusiness,
      useClass: CollectionPointWeightBusiness,
    },
    CollectionPointWeightConverter,
  ],
})
export class CollectionPointWeightComponent implements OnInit {
  tdWidth = ['15%', '10%', '15%', '5%'];

  dataSource: CollectionPointWeightModel[] = [];

  searchInfo: CollectionPointWeightSearchInfo = {
    BeginTime: TimeService.beginTime(new Date()),
    EndTime: TimeService.endTime(new Date()),
  };

  constructor(private _business: CollectionPointWeightBusiness) {}

  ngOnInit(): void {
    this._init();

    // console.log(Time.curWeek(new Date()));
  }
  private async _init() {
    this.dataSource = await this._business.init(this.searchInfo);
    // console.log(this.dataSource);
  }
}
