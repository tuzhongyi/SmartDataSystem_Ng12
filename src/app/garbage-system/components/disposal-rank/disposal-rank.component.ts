import { Component, OnInit } from '@angular/core';
import { DivisionType } from 'src/app/enum/division-type.enum';

@Component({
  selector: 'app-disposal-rank',
  templateUrl: './disposal-rank.component.html',
  styleUrls: ['./disposal-rank.component.less'],
})
export class DisposalRankComponent implements OnInit {
  title = '小包垃圾处置达标率排名';
  // 当前区划id
  divisionId: string = '';

  // 后代区划类型
  childDivisionType: DivisionType = DivisionType.None;

  // 当前区划类型
  private _currentDivisionType: DivisionType = DivisionType.None;

  constructor() {}

  ngOnInit(): void {}
}
