import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { TableSelectType } from 'src/app/enum/table-select-type.enum';
import { User } from 'src/app/network/model/garbage-station/user.model';
import { IModel } from 'src/app/network/model/model.interface';
import { PagedList } from 'src/app/network/model/page_list.model';
import { PagedTableAbstractComponent } from '../table-abstract.component';
import { AIOPUserTableBusiness } from './aiop-user-table.business';
import { AIOPUserTableArgs } from './aiop-user-table.model';

@Component({
  selector: 'aiop-user-table',
  templateUrl: './aiop-user-table.component.html',
  styleUrls: ['../table.less', './aiop-user-table.component.less'],
  providers: [AIOPUserTableBusiness],
})
export class AIOPUserTableComponent
  extends PagedTableAbstractComponent<User>
  implements OnInit
{
  @Input() load?: EventEmitter<AIOPUserTableArgs>;
  @Input() args: AIOPUserTableArgs = new AIOPUserTableArgs();
  @Input() business: IBusiness<IModel, PagedList<User>>;
  @Input() selecteds: User[] = [];
  @Output() selectedsChange: EventEmitter<User[]> = new EventEmitter();
  @Output() details: EventEmitter<User> = new EventEmitter();
  @Output() key: EventEmitter<User> = new EventEmitter();

  constructor(business: AIOPUserTableBusiness) {
    super();
    this.business = business;
    this.pageSize = 10;
  }
  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((x) => {
        this.args = x;
        this.loadData(this.args.tofirst ? 1 : this.page.PageIndex);
      });
    }
    this.loadData(1);
  }

  widths = [];

  loadData(index: number, size: number = 10): void {
    this.loading = true;
    this.business.load(index, size, this.args).then((x) => {
      this.page = x.Page;
      this.datas = x.Data;
      this.loading = false;
    });
  }
  onselect(item: User) {
    let index = this.selecteds.indexOf(item);
    if (index < 0) {
      this.selecteds.push(item);
    } else {
      this.selecteds.splice(index, 1);
    }

    this.selectedsChange.emit(this.selecteds);
  }
  ondetails(e: Event, item: User) {
    e.stopImmediatePropagation();
    this.details.emit(item);
  }
  onkey(e: Event, item: User) {
    e.stopImmediatePropagation();
    this.key.emit(item);
  }
  toselect(type: TableSelectType) {
    switch (type) {
      case TableSelectType.All:
        this.selecteds = [...this.datas];
        break;
      case TableSelectType.Cancel:
        this.selecteds = [];
        break;
      case TableSelectType.Reverse:
        this.selecteds = this.datas.filter((x) => !this.selecteds.includes(x));
        break;

      default:
        break;
    }
    this.selectedsChange.emit(this.selecteds);
  }
}
