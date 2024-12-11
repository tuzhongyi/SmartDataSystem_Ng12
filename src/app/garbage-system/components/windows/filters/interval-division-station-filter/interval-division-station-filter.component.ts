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
import { ILevelDivisionNode } from 'src/app/common/components/panels/level-division-panel/level-division-panel.model';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { DateTimeTool } from 'src/app/common/tools/date-time-tool/datetime.tool';
import { Language } from 'src/app/common/tools/language';
import { EventType } from 'src/app/enum/event-type.enum';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import { IIdNameModel, IModel } from 'src/app/network/model/model.interface';
import { EventRecordFilterBusiness } from './interval-division-station-filter.business';
import {
  DivisionStationFilteModel,
  EventRecordFilterSelected,
  EventRecordFilterSource,
} from './interval-division-station-filter.model';

@Component({
  selector: 'interval-division-station-filter',
  templateUrl: './interval-division-station-filter.component.html',
  styleUrls: ['./interval-division-station-filter.component.less'],
  providers: [EventRecordFilterBusiness],
})
export class EventRecordFilterComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() type?: EventType;

  @Input() date_sync = false;

  @Input() duration = DateTimeTool.allDay(new Date());
  @Output() durationChange = new EventEmitter<Duration>();

  @Input() divisionId?: string;
  @Output() divisionIdChange = new EventEmitter<string>();

  @Input() stationId?: string;
  @Output() stationIdChange = new EventEmitter<string>();

  @Input() cameraId?: string;
  @Output() cameraIdChange = new EventEmitter<string>();

  @Input() handle?: boolean;
  @Output() handleChange = new EventEmitter<boolean>();

  @Input() display_handle = true;

  constructor(business: EventRecordFilterBusiness) {
    this.business = business;
  }
  business: IBusiness<IModel, DivisionStationFilteModel>;
  source = new EventRecordFilterSource();
  selected = new EventRecordFilterSelected();

  Language = Language;
  DateTimePickerView = DateTimePickerView;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnDestroy(): void {}

  async ngOnInit() {}

  changeBegin(date: Date) {
    if (
      this.date_sync &&
      !DateTimeTool.is.day.equals(this.duration.begin, this.duration.end)
    ) {
      let end = new Date(this.duration.end.getTime());
      end.setFullYear(date.getFullYear());
      end.setMonth(date.getMonth());
      end.setDate(date.getDate());
      this.duration.end = end;
      this.durationChange.emit(this.duration);
    }
  }
  changeEnd(date: Date) {
    // if (
    //   this.date_sync &&
    //   !DateTimeTool.is.day.equals(this.duration.begin, this.duration.end)
    // ) {
    //   let begin = new Date(this.duration.begin.getTime());
    //   begin.setFullYear(date.getFullYear());
    //   begin.setMonth(date.getMonth());
    //   begin.setDate(date.getDate());
    //   this.duration.begin = begin;
    // }
    this.durationChange.emit(this.duration);
  }

  async ondivision(item?: IIdNameModel) {
    this.divisionId = item?.Id;
    this.divisionIdChange.emit(this.divisionId);
  }
  ondivisionloaded(datas: ILevelDivisionNode[]) {
    this.source.division = datas;
    if (this.divisionId) {
      let division = datas.find((item) => item.Id == this.divisionId);
      if (division?.IsParent) {
        this.selected.division = undefined;
      } else {
        this.selected.division = division;
      }
    }
  }
  onstation() {
    this.stationIdChange.emit(this.stationId);
  }
  oncamera() {
    this.cameraIdChange.emit(this.cameraId);
  }
  onhandle() {
    this.handleChange.emit(this.handle);
  }
}
