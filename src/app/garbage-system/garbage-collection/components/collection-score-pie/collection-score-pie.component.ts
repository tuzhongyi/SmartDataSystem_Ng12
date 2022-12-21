import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { EChartsOption } from 'echarts';
import { Subscription } from 'rxjs';
import { CommonPieChartComponent } from 'src/app/common/components/common-pie-chart/common-pie-chart.component';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { CollectionScorePieBusiness } from './collection-score-pie.business';
import { CollectionScorePieConverter } from './collection-score-pie.converter';
import {
  CollectionScorePieModel,
  ICollectionScorePieData,
  ICollectionScorePieSearchInfo,
} from './collection-score-pie.model';

@Component({
  selector: 'collection-score-pie',
  templateUrl: './collection-score-pie.component.html',
  styleUrls: ['./collection-score-pie.component.less'],
  providers: [CollectionScorePieBusiness, CollectionScorePieConverter],
})
export class CollectionScorePieComponent implements OnInit, OnDestroy {
  @Output() clickEvent = new EventEmitter();

  title = '今日垃圾分类评分';

  searchInfo: ICollectionScorePieSearchInfo = {
    DivisionId: this._globalStorage.divisionId,
  };
  model?: CollectionScorePieModel;

  merge: EChartsOption = {};

  subscription: Subscription;

  constructor(
    private _business: CollectionScorePieBusiness,
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
    this.searchInfo.DivisionId = this._globalStorage.divisionId;
    this.model = await this._business.init(this.searchInfo);

    this.merge = {
      ...this.model.PieCharModel.Merge,
    };
  }
  clickItem(item: ICollectionScorePieData) {
    // console.log(item);
    this.clickEvent.emit(item);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
