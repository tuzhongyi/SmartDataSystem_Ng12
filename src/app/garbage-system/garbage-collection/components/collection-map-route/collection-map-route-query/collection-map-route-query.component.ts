import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { IModel, Model } from 'src/app/network/model/model.interface';
import { CollectionMapRouteDeviceListBusiness as CollectionMapRouteQueryBusiness } from './collection-map-route-query.business';
import {
  CollectionMapRouteConfig,
  CollectionMapRouteDevice,
} from './collection-map-route-query.model';

@Component({
  selector: 'collection-map-route-query',
  templateUrl: './collection-map-route-query.component.html',
  styleUrls: ['./collection-map-route-query.component.less'],
  providers: [CollectionMapRouteQueryBusiness],
})
export class CollectionMapRouteQueryComponent
  implements IComponent<IModel, CollectionMapRouteDevice[]>, OnInit
{
  @Input()
  business: IBusiness<IModel, CollectionMapRouteDevice<Model>[]>;
  @Output()
  select: EventEmitter<IModel> = new EventEmitter();
  @Input()
  selected?: Model;
  @Input()
  date: Date = new Date();
  @Input()
  config: CollectionMapRouteConfig = new CollectionMapRouteConfig();
  @Output()
  dateChange: EventEmitter<Date> = new EventEmitter();
  @Output()
  close: EventEmitter<void> = new EventEmitter();

  constructor(business: CollectionMapRouteQueryBusiness) {
    this.business = business;
  }

  DateTimePickerView = DateTimePickerView;

  datas: CollectionMapRouteDevice[] = [];

  ngOnInit(): void {
    this.loadData().then((x) => {
      this.onquery();
    });
    console.log('collection-map-route-query.component', this.selected);
  }
  async loadData(name?: string) {
    this.datas = await this.business.load(name);
  }

  changeDate(date: Date) {
    this.dateChange.emit(date);
  }

  onselect(e: Event, item: CollectionMapRouteDevice) {
    this.selected = item.data;
  }
  onsearch(text: string) {
    this.loadData(text);
  }

  onquery() {
    if (this.selected) {
      this.select.emit(this.selected);
    }
  }
  onclose() {
    this.close.emit();
  }
}
