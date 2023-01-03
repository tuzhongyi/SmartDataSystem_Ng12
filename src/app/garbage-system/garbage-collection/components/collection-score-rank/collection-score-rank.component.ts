import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import {
  CommonRankData,
  CommonRankModel,
} from 'src/app/common/components/common-rank/common-rank.model';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Language } from 'src/app/common/tools/language';
import { Time } from 'src/app/common/tools/time';
import { CollectionPointScore } from 'src/app/enum/collection-point-score.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { DurationParams } from 'src/app/network/request/IParams.interface';
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
  providers: [CollectionScoreRankBusiness, CollectionScoreRankConverter],
})
export class CollectionScoreRankComponent implements OnInit {
  Language = Language;
  CollectionPointScore = CollectionPointScore;

  @Output() clickEvent = new EventEmitter();

  model?: CollectionScoreRankModel;
  rankModel?: CommonRankModel;

  selectDataSource = new Map([
    [
      CollectionPointScore.Good,
      Language.CollectionPointScore(CollectionPointScore.Good),
    ],
    [
      CollectionPointScore.Average,
      Language.CollectionPointScore(CollectionPointScore.Average),
    ],
    [
      CollectionPointScore.Poor,
      Language.CollectionPointScore(CollectionPointScore.Poor),
    ],
  ]);
  customCompare = (
    keyValueA: KeyValue<number, string>,
    keyValueB: KeyValue<number, string>
  ): number => {
    return (keyValueA.key - keyValueB.key) * -1;
  };
  get title() {
    return '垃圾分类' + '' + '月榜';
  }

  today = new Date();

  searchInfo: ICollectionScoreRankSearchInfo = {
    BeginTime: Time.curMonth(this.today).beginTime,
    EndTime: DurationParams.allMonth(this.today).EndTime,
    DivisionIds: [this._globalStorage.divisionId],
    Type: CollectionPointScore.Good,
  };
  subscription: Subscription;

  constructor(
    private _business: CollectionScoreRankBusiness,
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
    this.rankModel = this.model.RankModel;
  }

  clickRankItem(item: CommonRankData) {
    this.clickEvent.emit(item);
  }
  selectChange() {
    this._init();
  }
}
