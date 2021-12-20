/*
 * @Author: pmx
 * @Date: 2021-10-13 15:02:38
 * @Last Modified by: pmx
 * @Last Modified time: 2021-10-14 17:19:21
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  DropListObj,
  DropListModel,
  RankModel,
  RankEventModel,
} from '../../../view-model/rank.model';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.less'],
})
export class RankComponent implements OnInit {
  @Input() data: Array<RankModel> = [];

  @Output()
  itemClickedEvent: EventEmitter<RankModel> = new EventEmitter();

  constructor() {}
  ngOnInit(): void {}
  trackByFn(index: number, item: RankModel) {
    return item.id;
  }

  itemClick(event: Event, model: RankModel) {
    this.itemClickedEvent.emit(model);
  }
}
