import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonPieChartComponent } from 'src/app/common/components/common-pie-chart/common-pie-chart.component';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { CollectionScorePieBusiness } from './collection-score-pie.business';

@Component({
  selector: 'collection-score-pie',
  templateUrl: './collection-score-pie.component.html',
  styleUrls: ['./collection-score-pie.component.less'],
  providers: [CollectionScorePieBusiness],
})
export class CollectionScorePieComponent implements OnInit, OnDestroy {
  title = '今日垃圾分类评分';
  subscription: Subscription;

  @ViewChild(CommonPieChartComponent) chart?: CommonPieChartComponent;

  constructor(
    public business: CollectionScorePieBusiness,
    private _globalStorage: GlobalStorageService
  ) {
    this.subscription = this._globalStorage.collectionStatusChange.subscribe(
      () => {
        this.business.searchInfo = {
          DivisionId: this._globalStorage.divisionId,
        };
        this.chart?.update();
      }
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
