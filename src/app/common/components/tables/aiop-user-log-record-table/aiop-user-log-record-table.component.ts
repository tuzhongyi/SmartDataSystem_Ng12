import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { UserRecord } from 'src/app/network/model/garbage-station/user-record.model';
import { IModel } from 'src/app/network/model/model.interface';
import { PagedList } from 'src/app/network/model/page_list.model';
import { PagedTableAbstractComponent } from '../table-abstract.component';
import { AIOPUserLogRecordTableBusiness } from './aiop-user-log-record-table.business';
import { AIOPUserLogRecordTableArgs } from './aiop-user-log-record-table.model';

@Component({
  selector: 'aiop-user-log-record-table',
  templateUrl: './aiop-user-log-record-table.component.html',
  styleUrls: ['../table.less', './aiop-user-log-record-table.component.less'],
  providers: [AIOPUserLogRecordTableBusiness],
})
export class AIOPUserLogRecordTableComponent
  extends PagedTableAbstractComponent<UserRecord>
  implements OnInit
{
  @Input() load?: EventEmitter<AIOPUserLogRecordTableArgs>;
  @Input() args: AIOPUserLogRecordTableArgs = new AIOPUserLogRecordTableArgs();
  @Input() business: IBusiness<IModel, PagedList<UserRecord>>;
  @Output() details: EventEmitter<UserRecord> = new EventEmitter();

  constructor(business: AIOPUserLogRecordTableBusiness) {
    super();
    this.business = business;
    this.pageSize = 10;
  }
  @ViewChild('body') bodyElement?: ElementRef<HTMLDivElement>;
  widths = [];
  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((x) => {
        this.args = x;
        this.loadData(this.args.tofirst ? 1 : this.page.PageIndex);
      });
    }
    this.loadData(1);
  }

  loadData(index: number, size: number = 10): void {
    this.loading = true;
    this.business.load(index, size, this.args).then((x) => {
      this.page = x.Page;
      this.datas = x.Data;
      this.loading = false;
    });
  }
  ondetails(e: Event, item: UserRecord) {
    e.stopImmediatePropagation();
    this.details.emit(item);
  }
}
