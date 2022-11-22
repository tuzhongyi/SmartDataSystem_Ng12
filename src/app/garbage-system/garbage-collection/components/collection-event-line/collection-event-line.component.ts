import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonLineChartComponent } from 'src/app/common/components/common-line-chart/common-line-chart.component';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Language } from 'src/app/common/tools/language';
import { TrashCanType } from 'src/app/enum/trashcan-type.enum';
import { CollectionEventLineBusiness } from './collection-event-line.business';

@Component({
  selector: 'collection-event-line',
  templateUrl: './collection-event-line.component.html',
  styleUrls: ['./collection-event-line.component.less'],
  providers: [CollectionEventLineBusiness],
})
export class CollectionEventLineComponent implements OnInit, OnDestroy {
  @Input() type: TrashCanType = TrashCanType.Dry;

  @ViewChild(CommonLineChartComponent) chart?: CommonLineChartComponent;

  subscription: Subscription;

  title = '';

  constructor(
    public business: CollectionEventLineBusiness,
    private _globalStorage: GlobalStorageService
  ) {
    this.subscription = this._globalStorage.collectionStatusChange.subscribe(
      () => {
        this.business.searchInfo.DivisionIds = [this._globalStorage.divisionId];
        this.chart?.update();
      }
    );
  }

  ngOnInit(): void {
    this.business.searchInfo.TrashCanType = this.type;
    this.title = '今日' + Language.TrashCanType(this.type) + '收运量';
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
