import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { EChartsOption } from 'echarts';
import { Subscription } from 'rxjs';
import { CommonPieChartComponent } from 'src/app/common/components/common-pie-chart/common-pie-chart.component';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { CollectionPointPieBusiness } from './collection-point-pie.business';
import { CollectionPointPieConverter } from './collection-point-pie.converte';
import {
  CollectionPointPieModel,
  ICollectionPointPieData,
  ICollectionPointPieSearchInfo,
} from './collection-point-pie.model';

@Component({
  selector: 'collection-point-pie',
  templateUrl: './collection-point-pie.component.html',
  styleUrls: ['./collection-point-pie.component.less'],
  providers: [CollectionPointPieBusiness, CollectionPointPieConverter],
})
export class CollectionPointPieComponent implements OnInit, OnDestroy {
  @Output() clickEvent = new EventEmitter();

  title = '垃圾收运点位';

  searchInfo: ICollectionPointPieSearchInfo = {
    DivisionIds: [this._globalStorage.divisionId],
  };
  model?: CollectionPointPieModel;

  subscription: Subscription;

  merge: EChartsOption = {};

  constructor(
    private _business: CollectionPointPieBusiness,
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
    this.searchInfo.DivisionIds = [this._globalStorage.divisionId];

    this.model = await this._business.init(this.searchInfo);

    // console.log(this.model);
    this.merge = {
      ...this.model.PieCharModel.Merge,
    };
  }
  clickItem(item: ICollectionPointPieData) {
    // console.log(item);
    this.clickEvent.emit(item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
