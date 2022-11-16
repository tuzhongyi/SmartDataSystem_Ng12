import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { IModel } from 'src/app/network/model/model.interface';
import { CollectionMapRouteDeviceListBusiness } from './collection-map-route-device-list.business';
import { CollectionMapRouteDevice } from './collection-map-route-device-list.model';

@Component({
  selector: 'collection-map-route-device-list',
  templateUrl: './collection-map-route-device-list.component.html',
  styleUrls: ['./collection-map-route-device-list.component.less'],
  providers: [CollectionMapRouteDeviceListBusiness],
})
export class CollectionMapRouteDeviceListComponent
  implements IComponent<IModel, CollectionMapRouteDevice[]>, OnInit
{
  @Input()
  business: IBusiness<IModel, CollectionMapRouteDevice<IModel>[]>;
  @Output()
  select: EventEmitter<IModel> = new EventEmitter();

  constructor(business: CollectionMapRouteDeviceListBusiness) {
    this.business = business;
  }

  datas: CollectionMapRouteDevice[] = [];
  selected?: CollectionMapRouteDevice;
  ngOnInit(): void {
    this.loadData();
  }
  async loadData(name?: string) {
    this.datas = await this.business.load(name);
  }

  onselect(e: Event, item: CollectionMapRouteDevice) {
    this.selected = item;
    this.select.emit(item.data);
  }
  onsearch(text: string) {
    this.loadData(text);
  }
}
