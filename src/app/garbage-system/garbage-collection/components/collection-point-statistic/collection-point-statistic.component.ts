import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { HWPieChartComponent } from 'src/app/common/components/hw-pie-chart/hw-pie-chart.component';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { CollectionPointStatisticBusiness } from './collection-point-statistic.business';

@Component({
  selector: 'collection-point-statistic',
  templateUrl: './collection-point-statistic.component.html',
  styleUrls: ['./collection-point-statistic.component.less'],
  providers: [CollectionPointStatisticBusiness],
})
export class CollectionPointStatisticComponent implements OnInit, OnDestroy {
  title = '垃圾收运点位';
  subscription: Subscription;

  @ViewChild(HWPieChartComponent) hwChart?: HWPieChartComponent;

  constructor(
    public business: CollectionPointStatisticBusiness,
    private _globalStorage: GlobalStorageService
  ) {
    this.subscription = this._globalStorage.collectionStatusChange.subscribe(
      () => {
        this.business.searchInfo = {
          DivisionIds: [this._globalStorage.divisionId],
        };
        this.hwChart?.update();
      }
    );
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
