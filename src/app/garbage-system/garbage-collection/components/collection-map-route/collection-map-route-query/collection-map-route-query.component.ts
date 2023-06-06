import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimeModel } from 'src/app/common/components/time-control/time-control.model';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { IdNameModel, IModel } from 'src/app/network/model/model.interface';
import { CollectionMapRouteDeviceListBusiness as CollectionMapRouteQueryBusiness } from './collection-map-route-query.business';
import {
  CollectionMapRouteConfig,
  CollectionMapRouteDevice,
  CollectionMapRouteQuery,
  CollectionMapRouteQueryArgs,
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
  business: IBusiness<IModel, CollectionMapRouteDevice<IdNameModel>[]>;

  @Input()
  config: CollectionMapRouteConfig = new CollectionMapRouteConfig();

  @Output()
  close: EventEmitter<void> = new EventEmitter();

  @Input()
  args: CollectionMapRouteQueryArgs = new CollectionMapRouteQueryArgs();
  @Output()
  query: EventEmitter<CollectionMapRouteQuery> = new EventEmitter();

  constructor(business: CollectionMapRouteQueryBusiness) {
    this.business = business;
  }

  DateTimePickerView = DateTimePickerView;
  datas: CollectionMapRouteDevice[] = [];
  selected?: IdNameModel;
  date: Date = new Date();
  time = this.getTime(this.date);

  ngOnInit(): void {
    this.loadData().then((x) => {
      this.onquery();
    });
    this.date = this.args.date;
    this.selected = this.args.model;
    this.time = this.getTime(this.args.date);
  }

  getTime(date: Date) {
    let duration = DateTimeTool.allDay(date);
    return {
      begin: new TimeModel(duration.begin),
      end: new TimeModel(duration.end),
    };
  }

  async loadData(name?: string) {
    this.datas = await this.business.load(name);
  }

  onselect(e: Event, item: CollectionMapRouteDevice) {
    this.selected = item.data;
  }
  onsearch(text: string) {
    this.loadData(text);
  }

  onquery() {
    if (this.selected) {
      let query = new CollectionMapRouteQuery();
      query.duration = {
        begin: this.time.begin.toDate(this.date),
        end: this.time.end.toDate(this.date),
      };
      query.model = this.selected;
      this.query.emit(query);
    }
  }
  onclose() {
    this.close.emit();
  }
}
