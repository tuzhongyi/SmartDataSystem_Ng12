import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { EventRecordFilter } from 'src/app/common/components/tables/event-record-table/event-record.model';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker.directive';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { IModel } from 'src/app/network/model/model.interface';
import { EventRecordFilterBusiness } from './event-record-filter.business';
import {
  EventRecordSourceModel,
  EventRecordSourceOpts,
} from './event-record-source.model';

@Component({
  selector: 'howell-event-record-filter',
  templateUrl: './event-record-filter.component.html',
  styleUrls: ['./event-record-filter.component.less'],
  providers: [EventRecordFilterBusiness],
})
export class EventRecordFilterComponent
  implements IComponent<IModel, EventRecordSourceModel>, OnInit
{
  @Output('filter')
  filterEvent: EventEmitter<EventRecordFilter> = new EventEmitter();

  DateTimePickerView = DateTimePickerView;
  constructor(business: EventRecordFilterBusiness) {
    this.business = business;

    this.filter = new EventRecordFilter();
  }
  business: IBusiness<IModel, EventRecordSourceModel>;

  async ngOnInit() {
    this.model = await this.business.load();
  }

  model: EventRecordSourceModel = new EventRecordSourceModel();

  filter: EventRecordFilter;

  changeBegin(date: Date) {
    if (this.filter) {
      this.filter.begin = date;
      this.filterEvent.emit(this.filter);
    }
  }
  changeEnd(date: Date) {
    if (this.filter) {
      this.filter.end = date;
      this.filterEvent.emit(this.filter);
    }
  }

  async ondivision(item: SelectItem) {
    let opts: EventRecordSourceOpts = {
      divisionId: item.key,
    };
    this.model = await this.business.load(opts);
    this.filter.division = item;
    this.filter.camera = undefined;
    this.filter.station = undefined;
    this.filterEvent.emit(this.filter);
  }
  async onstation(item: SelectItem) {
    let opts: EventRecordSourceOpts = {
      divisionId: this.filter.division!.key,
      stationId: item.key,
    };
    this.model = await this.business.load(opts);
    this.filter.station = item;
    this.filter.camera = undefined;
    this.filterEvent.emit(this.filter);
  }
  oncamera(item: SelectItem) {
    this.filter.camera = item;
    this.filterEvent.emit(this.filter);
  }
}
