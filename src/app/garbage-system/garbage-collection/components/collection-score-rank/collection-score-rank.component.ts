import { KeyValue } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import {
  CommonRankData,
  CommonRankModel,
} from 'src/app/common/components/common-rank/common-rank.model';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { TimeService } from 'src/app/common/service/time.service';
import { Language } from 'src/app/common/tools/language';
import { CollectionPointScore } from 'src/app/enum/collection-point-score.enum';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { CollectionScoreRankBusiness } from './collection-score-rank.business';
import { CollectionScoreRankConverter } from './collection-score-rank.converter';
import {
  CollectionScoreRankArgs,
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

  @Output() clickEvent: EventEmitter<CollectionScoreRankArgs> =
    new EventEmitter();

  model?: CollectionScoreRankModel;
  rankModel?: CommonRankModel;
  language: string = '';

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
    return '垃圾分类' + this.language + '月榜';
  }

  today = new Date();

  searchInfo: ICollectionScoreRankSearchInfo = {
    BeginTime: TimeService.curMonth(this.today).beginTime,
    EndTime: DurationParams.allMonth(this.today).EndTime,
    DivisionIds: [this._globalStorage.divisionId],
    Type: CollectionPointScore.Poor,
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
    this.language = Language.CollectionPointScore(this.searchInfo.Type);
  }

  clickRankItem(item: CommonRankData) {
    let args = new CollectionScoreRankArgs();
    args.model = item;
    args.score = this.searchInfo.Type;
    this.clickEvent.emit(args);
  }
  selectChange() {
    this._init();
  }
}
