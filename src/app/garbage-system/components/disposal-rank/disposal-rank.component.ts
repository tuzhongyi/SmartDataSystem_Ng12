import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { IModel } from 'src/app/network/model/model.interface';
import { RankModel } from 'src/app/view-model/rank.model';
import { DisposalRankBusiness } from './disposal-rank.business';

@Component({
  selector: 'app-disposal-rank',
  templateUrl: './disposal-rank.component.html',
  styleUrls: ['./disposal-rank.component.less'],
  providers: [DisposalRankBusiness],
})
export class DisposalRankComponent
  implements OnInit, IComponent<IModel, RankModel[]>
{
  @Input() load?: EventEmitter<void>;
  @Output() itemClickedEvent: EventEmitter<RankModel> = new EventEmitter();

  public title: string = '小包垃圾处置达标率排名';

  // 处理后的排行榜数据
  public rankData: RankModel[] = [];

  constructor(business: DisposalRankBusiness) {
    this.business = business;
  }
  business: IBusiness<IModel, RankModel[]>;

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((x) => {
        this.loadData();
      });
    }
    this.loadData();
  }
  async loadData() {
    this.rankData = await this.business.load();
  }

  onItemClicked(model: RankModel) {
    this.itemClickedEvent.emit(model);
  }
}
