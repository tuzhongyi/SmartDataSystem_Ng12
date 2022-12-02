import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Subscription } from 'rxjs';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Time } from 'src/app/common/tools/time';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { CollectionScoreBarInnerBusiness } from './collection-score-bar-inner.business';
import { CollectionScoreBarBusiness } from './collection-score-bar.business';
import { CollectionScoreBarConverter } from './collection-score-bar.converter';
import {
  CollectionScoreBarModel,
  ICollectionScoreBarSearchInfo,
} from './collection-score-bar.model';

@Component({
  selector: 'collection-score-bar',
  templateUrl: './collection-score-bar.component.html',
  styleUrls: ['./collection-score-bar.component.less'],
  providers: [
    CollectionScoreBarInnerBusiness,
    CollectionScoreBarBusiness,
    CollectionScoreBarConverter,
  ],
})
export class CollectionScoreBarComponent implements OnInit {
  title = '垃圾分类评分';
  today = new Date();

  searchInfo: ICollectionScoreBarSearchInfo = {
    BeginTime: Time.beginTime(Time.backDate(this.today, 7)),
    EndTime: Time.endTime(Time.backDate(this.today, 1)),
    DivisionIds: [this._globalStorage.divisionId],
    TimeUnit: TimeUnit.Day,
  };
  model?: CollectionScoreBarModel;

  subscription: Subscription;

  merge: EChartsOption = {};
  constructor(
    public innerBusiness: CollectionScoreBarInnerBusiness,
    private _business: CollectionScoreBarBusiness,
    private _globalStorage: GlobalStorageService
  ) {
    this.subscription = this._globalStorage.collectionStatusChange.subscribe(
      this._init.bind(this)
    );
  }

  ngOnInit(): void {
    this._init();
  }

  private async _init() {
    this.searchInfo.DivisionIds = [this._globalStorage.divisionId];
    this.model = await this._business.init(this.searchInfo);

    this.merge = {
      title: {
        text: this.title,
      },
      ...this.model.BarChartModel.Merge,
    };
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
