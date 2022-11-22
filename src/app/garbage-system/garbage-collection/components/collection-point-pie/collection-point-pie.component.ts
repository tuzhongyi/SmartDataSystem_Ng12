import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonPieChartComponent } from 'src/app/common/components/common-pie-chart/common-pie-chart.component';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { CollectionPointPieBusiness } from './collection-point-pie.business';

@Component({
  selector: 'collection-point-pie',
  templateUrl: './collection-point-pie.component.html',
  styleUrls: ['./collection-point-pie.component.less'],
  providers: [CollectionPointPieBusiness],
})
export class CollectionPointPieComponent implements OnInit, OnDestroy {
  title = '垃圾收运点位';
  subscription: Subscription;

  @ViewChild(CommonPieChartComponent) chart?: CommonPieChartComponent;

  constructor(
    public business: CollectionPointPieBusiness,
    private _globalStorage: GlobalStorageService
  ) {
    this.subscription = this._globalStorage.collectionStatusChange.subscribe(
      () => {
        this.business.searchInfo = {
          DivisionIds: [this._globalStorage.divisionId],
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
