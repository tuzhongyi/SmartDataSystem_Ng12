import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { GarbageVehicle } from 'src/app/network/model/garbage-station/garbage-vehicle.model';
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
  @Output() clickEvent = new EventEmitter();

  @Output('position') clickMapEvent = new EventEmitter();

  @Output('route') clickLineEvent = new EventEmitter();

  tdWidth = ['10%', '10%', '5%'];

  dataSource: CollectionVehicleModel<GarbageVehicle>[] = [];

  searchInfo: ICollectionVehicleSearchInfo = {};
  subscription: Subscription;

  constructor(
    private _business: CollectionVehicleBusiness,
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
    this.dataSource = await this._business.init(this.searchInfo);
  }

  clickItem(item: CollectionVehicleModel<GarbageVehicle>) {
    this.clickEvent.emit(item);
  }
  clickMap(item: CollectionVehicleModel<GarbageVehicle>, e: MouseEvent) {
    this.clickMapEvent.emit(item.rawData);
    e.stopPropagation();
  }
  clickLine(item: CollectionVehicleModel<GarbageVehicle>, e: MouseEvent) {
    this.clickLineEvent.emit(item.rawData);
    e.stopPropagation();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
