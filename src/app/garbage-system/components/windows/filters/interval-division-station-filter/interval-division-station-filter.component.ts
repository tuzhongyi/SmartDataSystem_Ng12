import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { EventRecordFilter } from 'src/app/common/components/tables/event-record/event-record.model';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { IModel } from 'src/app/network/model/model.interface';
import { EventRecordFilterBusiness } from './interval-division-station-filter.business';
import {
  DivisionStationFilteModel,
  DivisionStationFilterOpts,
} from './interval-division-station-filter.model';

@Component({
  selector: 'interval-division-station-filter',
  templateUrl: './interval-division-station-filter.component.html',
  styleUrls: ['./interval-division-station-filter.component.less'],
  providers: [EventRecordFilterBusiness],
})
export class EventRecordFilterComponent
  implements IComponent<IModel, DivisionStationFilteModel>, OnInit, OnChanges
{
  @Output('filter')
  filterEvent: EventEmitter<EventRecordFilter> = new EventEmitter();
  @Input()
  divisionId?: string;

  DateTimePickerView = DateTimePickerView;
  constructor(business: EventRecordFilterBusiness) {
    this.business = business;

    this.filter = new EventRecordFilter();
  }

  loadDivision: EventEmitter<string> = new EventEmitter();
  loadStation: EventEmitter<string> = new EventEmitter();
  loadCamera: EventEmitter<string> = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.divisionId) {
      if (this.divisionId) {
        let opts: DivisionStationFilterOpts = {
          divisionId: this.divisionId,
        };
        this.business.load(opts).then((model) => {
          this.model = model;
          this.filter.divisionId = this.divisionId;
          this.filter.camera = undefined;
          this.filter.station = undefined;
          this.loadDivision.emit(this.filter.divisionId);
        });
      }
    }
  }
  business: IBusiness<IModel, DivisionStationFilteModel>;

  async ngOnInit() {
    this.model = await this.business.load();
  }

  model: DivisionStationFilteModel = new DivisionStationFilteModel();

  filter: EventRecordFilter;

  changeBegin(date: Date) {
    if (this.filter) {
      this.filter.BeginTime = date;
      this.filterEvent.emit(this.filter);
    }
  }
  changeEnd(date: Date) {
    if (this.filter) {
      this.filter.EndTime = date;
      this.filterEvent.emit(this.filter);
    }
  }

  async ondivision(item: SelectItem) {
    let opts: DivisionStationFilterOpts = {
      divisionId: item.key,
    };
    this.model = await this.business.load(opts);
    this.filter.division = item;
    this.filter.camera = undefined;
    this.filter.station = undefined;
    this.filterEvent.emit(this.filter);
    this.loadStation.emit(this.filter.station);
  }
  async onstation(item: SelectItem) {
    let opts: DivisionStationFilterOpts = {
      divisionId: this.filter.divisionId!,
      stationId: item.key,
    };
    this.model = await this.business.load(opts);
    this.filter.station = item;
    this.filter.camera = undefined;
    this.filterEvent.emit(this.filter);
    this.loadCamera.emit(this.filter.camera);
  }
  oncamera(item: SelectItem) {
    this.filter.camera = item;
    this.filterEvent.emit(this.filter);
  }
}
