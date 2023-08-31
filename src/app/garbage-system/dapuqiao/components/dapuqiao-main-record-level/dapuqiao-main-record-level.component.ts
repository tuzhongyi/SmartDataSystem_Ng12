import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { EventType } from 'src/app/enum/event-type.enum';
import { IModel } from 'src/app/network/model/model.interface';
import { RankModel } from 'src/app/view-model/rank.model';
import { DaPuQiaoMainRecordLevelBusiness } from './dapuqiao-main-record-level.business';
import { DaPuQiaoMainRecordLevelArgs } from './dapuqiao-main-record-level.model';

@Component({
  selector: 'dapuqiao-main-record-level',
  templateUrl: './dapuqiao-main-record-level.component.html',
  styleUrls: ['./dapuqiao-main-record-level.component.less'],
  providers: [DaPuQiaoMainRecordLevelBusiness],
})
export class DaPuQiaoMainRecordLevelComponent
  implements OnInit, IComponent<IModel, RankModel[]>
{
  @Input() business: IBusiness<IModel, RankModel[]>;
  @Input() load?: EventEmitter<void>;
  @Output() itemClickedEvent: EventEmitter<RankModel> = new EventEmitter();

  constructor(business: DaPuQiaoMainRecordLevelBusiness) {
    this.business = business;
  }

  args = new DaPuQiaoMainRecordLevelArgs();

  public title: string = '今日三级事件';

  // 处理后的排行榜数据
  public rankData: RankModel[] = [];

  Type = EventType;

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((x) => {
        this.loadData();
      });
    }
    this.loadData();
  }

  async loadData() {
    this.rankData = await this.business.load(this.args);
  }

  onItemClicked(model: RankModel) {
    this.itemClickedEvent.emit(model);
  }
  onchange() {
    this.loadData();
  }
}
