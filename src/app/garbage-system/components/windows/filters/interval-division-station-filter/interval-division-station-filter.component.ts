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
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { EventRecordFilter } from 'src/app/common/components/tables/event-record/event-record.model';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { IModel, IObjectModel } from 'src/app/network/model/model.interface';
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
    if (this.filter) {
      this.filterChange.emit(this.filter);
    }
  }
  changeEnd(date: Date) {
    if (this.filter) {
      this.filterChange.emit(this.filter);
    }
  }

  async ondivision(item?: IObjectModel) {
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
  async onstation(item?: SelectItem) {
    if (item) {
      let opts: DivisionStationFilterOpts = {
        divisionId: this.filter.divisionId,
        stationId: item.Id,
      };
      let model = await this.business.load(opts);
      this.model.cameras = model.cameras;
      this.filter.station = item;
      this.filter.camera = undefined;
      this.filterChange.emit(this.filter);
    }
  }
  oncamera(item?: SelectItem) {
    this.filter.camera = item;
    this.filterChange.emit(this.filter);
  }
}
