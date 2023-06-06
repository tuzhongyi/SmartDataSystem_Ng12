import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { EventRecord } from 'src/app/network/model/event-record.model';
import { IModel } from 'src/app/network/model/model.interface';
import { PagedList } from 'src/app/network/model/page_list.model';
import { PagedTableAbstractComponent } from '../table-abstract.component';
import { CardRecordTableBusiness } from './card-record-table.business';
import { CardRecordTableArgs } from './card-record-table.model';

@Component({
  selector: 'card-record-table',
  templateUrl: './card-record-table.component.html',
  styleUrls: ['../table.less', './card-record-table.component.less'],
  providers: [CardRecordTableBusiness],
})
export class CardRecordTableComponent
  extends PagedTableAbstractComponent<EventRecord>
  implements IComponent<IModel, PagedList<EventRecord>>, OnInit
{
  widths = [];
  @Input()
  init = true;

  @Input()
  args: CardRecordTableArgs = new CardRecordTableArgs();

  @Input()
  business: IBusiness<IModel, PagedList<EventRecord>>;

  @Input()
  load?: EventEmitter<CardRecordTableArgs>;
  @Output()
  video: EventEmitter<EventRecord> = new EventEmitter();

  constructor(business: CardRecordTableBusiness) {
    super();
    this.business = business;
  }

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((args) => {
        if (args) this.args = args;
        this.loadData(1, this.pageSize, this.args);
      });
    }
    if (this.init) {
      this.loadData(1, this.pageSize, this.args);
    }
  }

  loadData(index: number, size: number, args: CardRecordTableArgs) {
    this.loading = true;

    let promise = this.business.load(index, size, args);
    this.loading = true;
    promise.then((paged) => {
      this.page = paged.Page;
      this.datas = paged.Data;
      this.loading = false;
    });
    return promise;
  }

  onvideo(e: Event, item: EventRecord) {
    e.stopImmediatePropagation();
    this.video.emit(item);
  }
}
