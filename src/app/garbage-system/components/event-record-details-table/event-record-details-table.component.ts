import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { EventRecordFilter } from 'src/app/common/components/tables/event-record/event-record.model';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker.directive';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { Enum } from 'src/app/enum/enum-helper';
import { EventType } from 'src/app/enum/event-type.enum';
import { Language } from 'src/app/common/tools/language';
import { IModel } from 'src/app/network/model/model.interface';
import { EventRecordDetailsTableBusiness } from './event-record-details-table.business';
import { EventRecordDetailsTableModel } from './event-record-details-table.model';

@Component({
  selector: 'howell-event-record-details-table',
  templateUrl: './event-record-details-table.component.html',
  styleUrls: ['./event-record-details-table.component.less'],
  providers: [EventRecordDetailsTableBusiness],
})
export class EventRecordDetailsTableComponent
  implements
    IComponent<IModel, EventRecordDetailsTableModel>,
    OnInit,
    OnChanges
{
  Language = Language;
  DateTimePickerView = DateTimePickerView;

  @Input()
  count: number = 0;
  @Input()
  type: EventType = EventType.IllegalDrop;

  model: EventRecordDetailsTableModel = new EventRecordDetailsTableModel();

  listTypes: SelectItem[] = [];
  constructor(business: EventRecordDetailsTableBusiness) {
    this.business = business;

    this.filter = new EventRecordFilter();

    let typeEnum = new Enum(ListType);
    this.listTypes = typeEnum.toArray().map((x) => {
      let item = new SelectItem();
      item.key = x;

      switch (x) {
        case ListType.table:
          item.language = '<i class="howell-icon-ul"></i>';
          break;
        case ListType.card:
          item.language = '<i class="howell-icon-cam-all1"></i>';
          break;

        default:
          break;
      }
      item.value = x;
      return item;
    });
  }
  business: IBusiness<IModel, EventRecordDetailsTableModel>;
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  async ngOnInit() {
    this.model = await this.business.load();
  }

  display = {
    filter: true,
  };

  onfilter() {
    this.filter.camera = undefined;
    this.filter.station = undefined;
    this.filter.division = undefined;
    this.display.filter = !this.display.filter;
  }

  filter: EventRecordFilter;

  searchEvent: EventEmitter<EventRecordFilter> = new EventEmitter();

  changeBegin(date: Date) {
    if (this.filter) {
      this.filter.BeginTime = date;
    }
  }
  changeEnd(date: Date) {
    if (this.filter) {
      this.filter.EndTime = date;
    }
  }

  search() {
    this.searchEvent.emit(this.filter);
  }

  async ondivisionselect(item: SelectItem) {
    this.filter.division = item;
    this.model = await this.business.load({ divisionId: item.key });
    this.filter.camera = undefined;

    this.filter.station = undefined;
  }
  async onstationselect(item: SelectItem) {
    this.filter.station = item;

    this.model = await this.business.load({
      divisionId: this.filter.division?.key,
      stationId: item.key,
    });
    this.filter.camera = undefined;
  }
  oncameraselect(item: SelectItem) {
    this.filter.camera = item;
  }
}

enum ListType {
  table,
  card,
}

interface FilterSelected {
  division?: SelectItem;
  station?: SelectItem;
  camera?: SelectItem;
}

export interface EventRecordDetailsTableOpts {
  divisionId: string;
  stationId?: string;
}
