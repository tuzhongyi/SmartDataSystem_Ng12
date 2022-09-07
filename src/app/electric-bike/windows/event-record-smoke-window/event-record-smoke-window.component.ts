import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { EventRecordFilter } from 'src/app/common/components/tables/event-record/event-record.model';
import { WindowComponent } from 'src/app/common/components/window-control/window.component';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker.directive';
import { Language } from 'src/app/common/tools/language';
import { EventType } from 'src/app/enum/event-type.enum';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { ImageControlModelArray } from 'src/app/view-model/image-control.model';
import { EventRecordSmokeWindowDivisionBusiness } from './business/event-record-smoke-window-division.business';
import { EventRecordSmokeWindowBusiness } from './event-record-smoke-window.business';

@Component({
  selector: 'howell-event-record-smoke-window',
  templateUrl: './event-record-smoke-window.component.html',
  styleUrls: ['./event-record-smoke-window.component.less'],
  providers: [
    EventRecordSmokeWindowDivisionBusiness,
    EventRecordSmokeWindowBusiness,
  ],
})
export class EventRecordSmokeWindowComponent
  extends WindowComponent
  implements OnInit
{
  @Output()
  image: EventEmitter<ImageControlModelArray> = new EventEmitter();
  constructor(private business: EventRecordSmokeWindowBusiness) {
    super();
  }
  @Output()
  play: EventEmitter<ImageControlModelArray> = new EventEmitter();

  load: EventEmitter<EventRecordFilter> = new EventEmitter();

  DateTimePickerView = DateTimePickerView;

  type: EventType = EventType.Smoke;
  types: SelectItem[] = [];

  division?: SelectItem;
  divisions: SelectItem[] = [];

  filter: EventRecordFilter = new EventRecordFilter();
  text: string = '';
  async initDivisions() {
    let items = await this.business.division.load();
    this.division = new SelectItem(undefined, undefined, '全部');
    items.unshift(this.division);
    this.divisions = items;
  }
  initTypes() {
    this.types.push(SelectItem.create(EventType.Smoke, Language.EventType));
  }

  ngOnInit(): void {
    let day = DurationParams.before(new Date(), 30);
    this.filter.BeginTime = day.BeginTime;
    this.filter.EndTime = day.EndTime;

    this.initTypes();
    this.initDivisions();
  }

  changeBegin(date: Date) {
    this.filter.BeginTime = date;
  }
  changeEnd(date: Date) {
    this.filter.EndTime = date;
  }
  onimage(images: ImageControlModelArray) {
    this.image.emit(images);
  }
  onplay(images: ImageControlModelArray) {
    this.play.emit(images);
  }
  onsearch() {
    if (this.division) {
      this.filter.divisionId = this.division.key;
    } else {
      this.filter.divisionId = undefined;
    }
    this.filter.opts.text = this.text;
    this.load.emit(this.filter);
  }
}
