import { formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { EventRecordFilter } from 'src/app/common/components/tables/event-record/event-record.model';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { IIdNameModel, IModel } from 'src/app/network/model/model.interface';
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
  implements
    IComponent<IModel, DivisionStationFilteModel>,
    OnInit,
    OnChanges,
    OnDestroy
{
  @Input() date_sync = false;
  @Input()
  filter: EventRecordFilter;
  @Output()
  filterChange: EventEmitter<EventRecordFilter> = new EventEmitter();
  @Input()
  divisionId?: string;

  DateTimePickerView = DateTimePickerView;
  constructor(business: EventRecordFilterBusiness) {
    this.business = business;

    this.filter = new EventRecordFilter();
  }

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
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.filter.duration = DateTimeTool.allDay(new Date());
    this.filter.cameraId = undefined;
    this.filter.community = undefined;
    this.filter.divisionId = undefined;
    this.filterChange.emit(this.filter);
  }
  business: IBusiness<IModel, DivisionStationFilteModel>;

  async ngOnInit() {
    this.model = await this.business.load();
  }

  model: DivisionStationFilteModel = new DivisionStationFilteModel();

  changeBegin(date: Date) {
    if (
      this.date_sync &&
      formatDate(this.filter.duration.begin, 'yyyy-MM-dd', 'en') !=
        formatDate(this.filter.duration.end, 'yyyy-MM-dd', 'en')
    ) {
      let end = new Date(this.filter.duration.end.getTime());
      end.setFullYear(date.getFullYear());
      end.setMonth(date.getMonth());
      end.setDate(date.getDate());
      this.filter.duration.end = end;
    }
    if (this.filter) {
      this.filterChange.emit(this.filter);
    }
  }
  changeEnd(date: Date) {
    if (
      this.date_sync &&
      formatDate(this.filter.duration.begin, 'yyyy-MM-dd', 'en') !=
        formatDate(this.filter.duration.end, 'yyyy-MM-dd', 'en')
    ) {
      let begin = new Date(this.filter.duration.begin.getTime());
      begin.setFullYear(date.getFullYear());
      begin.setMonth(date.getMonth());
      begin.setDate(date.getDate());
      this.filter.duration.begin = begin;
    }
    if (this.filter) {
      this.filterChange.emit(this.filter);
    }
  }

  async ondivision(item?: IIdNameModel) {
    let opts: DivisionStationFilterOpts | undefined = undefined;
    if (item) {
      opts = {
        divisionId: item.Id,
      };
    }

    let model = await this.business.load(opts);
    this.model.stations = model.stations;
    this.model.cameras = model.cameras;
    this.filter.division = item;
    this.filter.camera = undefined;
    this.filter.station = undefined;
    this.filterChange.emit(this.filter);
  }
  async onstation() {
    if (this.filter.station) {
      let opts: DivisionStationFilterOpts = {
        divisionId: this.filter.divisionId,
        stationId: this.filter.station.Id,
      };
      let model = await this.business.load(opts);
      this.model.cameras = model.cameras;
      this.filter.camera = undefined;
      this.filterChange.emit(this.filter);
    }
  }
  oncamera() {
    this.filterChange.emit(this.filter);
  }
}
