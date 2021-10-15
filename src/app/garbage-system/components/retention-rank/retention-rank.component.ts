import { Component, OnInit } from '@angular/core';
import { DivisionType } from 'src/app/enum/division-type.enum';

@Component({
  selector: 'app-retention-rank',
  templateUrl: './retention-rank.component.html',
  styleUrls: ['./retention-rank.component.less'],
})
export class RetentionRankComponent implements OnInit {
  title: string = '垃圾滞留时长排名';
  // 当前区划id
  divisionId: string = '';

  // 后代区划类型
  childDivisionType: DivisionType = DivisionType.None;

  // 当前区划类型
  private _currentDivisionType: DivisionType = DivisionType.None;

  constructor() {}

  ngOnInit(): void {}
}
