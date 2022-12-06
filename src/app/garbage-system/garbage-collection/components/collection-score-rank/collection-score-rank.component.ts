import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonRankModel } from 'src/app/common/components/common-rank/common-rank.model';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Language } from 'src/app/common/tools/language';
import { Time } from 'src/app/common/tools/time';
import { CollectionPointScore } from 'src/app/enum/collection-point-score.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { CollectionScoreRankInnerBusiness } from './collection-score-rank-inner.business';
import { CollectionScoreRankBusiness } from './collection-score-rank.business';
import { CollectionScoreRankConverter } from './collection-score-rank.converter';
import {
  CollectionScoreRankModel,
  ICollectionScoreRankSearchInfo,
} from './collection-score-rank.model';

@Component({
  selector: 'collection-score-rank',
  templateUrl: './collection-score-rank.component.html',
  styleUrls: ['./collection-score-rank.component.less'],
  providers: [
    CollectionScoreRankBusiness,
    CollectionScoreRankInnerBusiness,
    CollectionScoreRankConverter,
  ],
})
export class CollectionScoreRankComponent implements OnInit {
  @Input() type: CollectionPointScore = CollectionPointScore.Poor;

  model?: CollectionScoreRankModel;
  rankModel?: CommonRankModel;

  get title() {
    return '垃圾分类' + Language.CollectionPointScore(this.type) + '月榜';
  }

  today = new Date();

  searchInfo: ICollectionScoreRankSearchInfo = {
    BeginTime: DurationParams.allMonth(this.today).BeginTime,
    EndTime: DurationParams.allMonth(this.today).EndTime,
    DivisionId: this._globalStorage.divisionId,
    Type: CollectionPointScore.Poor,
  };
  subscription: Subscription;

  constructor(
    public innerBusiness: CollectionScoreRankInnerBusiness,
    private _business: CollectionScoreRankBusiness,
    private _globalStorage: GlobalStorageService
  ) {
    this.subscription = this._globalStorage.collectionStatusChange.subscribe(
      this._init.bind(this)
    );
  }

  ngOnInit(): void {
    this.searchInfo.Type = this.type;
    this._init();
  }
  private async _init() {
    // this.innerBusiness.searchInfo.DivisionId = this._globalStorage.divisionId;
    // this.innerBusiness.init();

    this.searchInfo.DivisionId = this._globalStorage.divisionId;
    this.model = await this._business.init(this.searchInfo);
    this.rankModel = this.model.RankModel;

    // console.log(this.dataSource);
  }
}
