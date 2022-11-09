import { Component, Input, OnInit } from '@angular/core';
import { Time } from 'src/app/common/tools/time';
import { CollectionScoreEnum } from 'src/app/enum/collection-score.enum';
import { CollectionScoreRankBusiness } from './collection-score-rank.business';
import { ICollectionScoreRankSearchInfo } from './collection-score-rank.model';

@Component({
  selector: 'collection-score-rank',
  templateUrl: './collection-score-rank.component.html',
  styleUrls: ['./collection-score-rank.component.less'],
  providers: [CollectionScoreRankBusiness],
})
export class CollectionScoreRankComponent implements OnInit {
  @Input() type: CollectionScoreEnum = CollectionScoreEnum.Good; // 默认好评榜

  today = new Date();

  searchInfo: ICollectionScoreRankSearchInfo = {
    BeginTime: Time.beginTime(this.today),
    EndTime: Time.endTime(this.today),
    Type: this.type,
  };
  constructor() {}

  ngOnInit(): void {}
}
