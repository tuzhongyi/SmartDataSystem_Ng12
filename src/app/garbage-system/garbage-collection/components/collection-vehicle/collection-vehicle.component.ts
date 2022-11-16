import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, timer } from 'rxjs';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { CollectionVehicleBusiness } from './collection-vehicle.business';
import { CollectionVehicleConverter } from './collection-vehicle.converter';
import {
  CollectionVehicleModel,
  ICollectionVehicleSearchInfo,
} from './collection-vehicle.model';


@Component({
  selector: 'collection-vehicle',
  templateUrl: './collection-vehicle.component.html',
  styleUrls: ['./collection-vehicle.component.less'],
  providers: [
    {
      provide: CollectionVehicleBusiness,
      useClass: CollectionVehicleBusiness,
    },
    CollectionVehicleConverter,
  ],
})
export class CollectionVehicleComponent implements OnInit, OnDestroy {
  tdWidth = ['10%', '10%', '5%'];

  dataSource: CollectionVehicleModel[] = [];

  searchInfo: ICollectionVehicleSearchInfo = {
    DivisionId: "",
  };
  subscription: Subscription;

  constructor(private _business: CollectionVehicleBusiness, private _globalStorage: GlobalStorageService) {

    this.subscription = this._globalStorage.collectionStatusChange.subscribe(this._init.bind(this))
  }

  ngOnInit(): void {

    this._init();
  }
  private async _init() {
    this.searchInfo.DivisionId = this._globalStorage.divisionId;
    this.dataSource = await this._business.init(this.searchInfo);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
