import { Component, Input, OnInit } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Language } from 'src/app/common/tools/language';
import { Time } from 'src/app/common/tools/time';
import { CollectionPointScore } from 'src/app/enum/collection-point-score.enum';
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
  @Input() type: CollectionPointScore = CollectionPointScore.Poor; // 默认好评榜

  get title() {
    return '垃圾清运' + Language.CollectionPointScore(this.type) + '榜';
  }
  trackByFn = (index: number, item: CollectionScoreRankModel) => {
    return item.Id;
  };
  dataSource: CollectionScoreRankModel[] = [];

  today = new Date();

  searchInfo: ICollectionScoreRankSearchInfo = {
    BeginTime: Time.beginTime(this.today),
    EndTime: Time.endTime(this.today),
    Type: this.type,
    DivisionIds: [],
  };
  constructor(
    private _business: CollectionScoreRankBusiness,
    private _globalStorage: GlobalStorageService
  ) {}

  ngOnInit(): void {
    this._init();

    this._globalStorage.statusChange.subscribe(() => {});
  }
  private async _init() {
    this.dataSource = await this._business.init(this.searchInfo);

    // console.log(this.dataSource);
  }
}
