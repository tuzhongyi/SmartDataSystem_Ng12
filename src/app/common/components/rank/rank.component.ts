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
  @Input() title: string = '';

  @Input() dropList?: Array<DropListObj>;

  @Input() data: Array<RankModel> = [];

  @Output() changeDataSourceEvent = new EventEmitter<RankEventModel>();

  constructor() {}
  ngOnInit(): void {}
  trackByFn(index: number, item: RankModel) {
    return item.id;
  }

  toggleDropList(item: DropListObj, $event: Event) {
    item.status = !item.status;
    $event.stopPropagation();
  }
  /**
   *
   * @param option  当前 下拉选项
   * @param options  当前下拉列表数据源
   * @param obj 当前 dropList对象
   */
  changeDataSource(
    option: DropListModel,
    options: DropListModel[],
    obj: DropListObj,
    e: Event
  ) {
    // console.log(option, options, obj);

    // 确定当前选项在选项数组中的位置
    let index = options.findIndex((o) => o.id == option.id);
    if (index !== -1) {
      if (obj.index == index) return;
      obj.index = index;
    }

    this.changeDataSourceEvent.emit({
      data: option,
      type: obj.type,
    });

    obj.status = false;
    e.stopPropagation();
  }
}
