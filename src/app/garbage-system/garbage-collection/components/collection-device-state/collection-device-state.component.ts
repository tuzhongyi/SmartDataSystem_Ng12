import { Component, OnDestroy, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Subscription } from 'rxjs';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { CollectionDeviceStateInnerBusiness } from './collection-device-state-inner.business';
import { CollectionDeviceStateBusiness } from './collection-device-state.business';
import { CollectionDeviceStateConverter } from './collection-device-state.converter';
import {
  CollectionDeviceStateModel,
  ICollectionDeviceStateSearchInfo,
} from './collection-device-state.model';

@Component({
  selector: 'collection-device-state',
  templateUrl: './collection-device-state.component.html',
  styleUrls: ['./collection-device-state.component.less'],
  providers: [
    CollectionDeviceStateBusiness,
    CollectionDeviceStateInnerBusiness,
    CollectionDeviceStateConverter,
  ],
})
export class GarbageVehiclesDeviceStateComponent implements OnInit, OnDestroy {
  title: string = '收运车运行状态';
  model?: CollectionDeviceStateModel;

  searchInfo: ICollectionDeviceStateSearchInfo = {
    DivisionId: this._globalStorage.divisionId,
  };

  subscription: Subscription;

  gaugeOption: EChartsOption = {};

  merge: EChartsOption = {};

  constructor(
    public innerBusiness: CollectionDeviceStateInnerBusiness,
    private _business: CollectionDeviceStateBusiness,
    private _globalStorage: GlobalStorageService
  ) {
    this.subscription = this._globalStorage.collectionStatusChange.subscribe(
      this._init.bind(this)
    );
  }

  ngOnInit() {
    this._init();
  }
  private async _init() {
    this.searchInfo.DivisionId = this._globalStorage.divisionId;
    this.model = await this._business.init(this.searchInfo);

    // console.log(this.model);

    this.merge = this.model.GaugeChartModel.Merge;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
