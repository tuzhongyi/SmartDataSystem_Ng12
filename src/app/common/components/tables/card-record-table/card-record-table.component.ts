import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { AIGarbageRfidCardRecord } from 'src/app/network/model/ai-garbage/rfid-card-record.model';
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
  extends PagedTableAbstractComponent<AIGarbageRfidCardRecord>
  implements IComponent<IModel, PagedList<AIGarbageRfidCardRecord>>, OnInit
{
  @Input() business: IBusiness<IModel, PagedList<AIGarbageRfidCardRecord>>;
  @Input() args: CardRecordTableArgs = new CardRecordTableArgs();
  @Input() load?: EventEmitter<CardRecordTableArgs>;
  @Input() isinit: boolean = true;
  @Output() loaded: EventEmitter<PagedList<AIGarbageRfidCardRecord>> =
    new EventEmitter();
  @Output() video: EventEmitter<AIGarbageRfidCardRecord> = new EventEmitter();

  constructor(business: CardRecordTableBusiness) {
    super();
    this.business = business;
  }

  widths: string[] = [
    '12%',
    '12%',
    '10%',
    '10%',
    '10%',
    '12%',
    '12%',
    '12%',
    '10%',
  ];

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((args) => {
        this.args = args;
        this.loadData(
          this.args.tofirst ? 1 : this.page.PageIndex,
          this.pageSize
        );
      });
    }
    if (this.isinit) {
      this.loadData(1);
    }
  }

  loadData(index: number, size: number = 10) {
    this.loading = true;

    let promise = this.business.load(index, size, this.args);
    this.loading = true;
    promise.then((paged) => {
      this.page = paged.Page;
      this.datas = paged.Data;
      this.loading = false;
    });
    return promise;
  }

  onvideo(e: Event, item: AIGarbageRfidCardRecord) {
    e.stopImmediatePropagation();
    this.video.emit(item);
  }
}
