import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Subscription } from 'rxjs';
import { CommonLineChartComponent } from 'src/app/common/components/common-line-chart/common-line-chart.component';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Language } from 'src/app/common/tools/language';
import { TimeService } from 'src/app/common/service/time.service';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { TrashCanType } from 'src/app/enum/trashcan-type.enum';
import { CollectionWeightLineInnerBusiness } from './collection-weight-line-inner.business';
import { CollectionWeightLineBusiness } from './collection-weight-line.business';
import { CollectionWeightLineConverter } from './collection-weight-line.converter';
import {
  CollectionWeightLineModel,
  ICollectionWeightLineSearchInfo,
} from './collection-weight-line.model';

@Component({
  selector: 'collection-weight-line',
  templateUrl: './collection-weight-line.component.html',
  styleUrls: ['./collection-weight-line.component.less'],
  providers: [
    CollectionWeightLineBusiness,
    CollectionWeightLineInnerBusiness,
    CollectionWeightLineConverter,
  ],
})
export class CollectionWeightLineComponent implements OnInit, OnDestroy {
  @Input() type: TrashCanType = TrashCanType.Dry;
  title = '';

  today = new Date();

  searchInfo: ICollectionWeightLineSearchInfo = {
    BeginTime: TimeService.beginTime(TimeService.backDate(this.today, 7)),
    EndTime: TimeService.endTime(TimeService.backDate(this.today, 1)),
    DivisionIds: [this._globalStorage.divisionId],
    TimeUnit: TimeUnit.Day,
    Type: TrashCanType.Dry,
  };
  subscription: Subscription;
  model?: CollectionWeightLineModel;

  merge: EChartsOption = {};

  constructor(
    public innerBusiness: CollectionWeightLineInnerBusiness,
    private _business: CollectionWeightLineBusiness,
    private _globalStorage: GlobalStorageService
  ) {
    this.subscription = this._globalStorage.collectionStatusChange.subscribe(
      this._init.bind(this)
    );
  }

  ngOnInit(): void {
    this.title = Language.TrashCanType(this.type) + '收运量(周)';
    this.searchInfo.Type = this.type;

    this.innerBusiness.searchInfo.Type = this.type;

    this._init();
  }

  private async _init() {
    this.searchInfo.DivisionIds = [this._globalStorage.divisionId];
    this.model = await this._business.init(this.searchInfo);

    this.merge = {
      ...this.model.LineChartModel.Merge,
    };
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
