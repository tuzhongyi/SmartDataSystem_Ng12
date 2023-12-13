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
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { TableSelectType } from 'src/app/enum/table-select-type.enum';
import { CollectionPoint } from 'src/app/network/model/garbage-station/collection-point.model';
import { IModel } from 'src/app/network/model/model.interface';
import { PagedList } from 'src/app/network/model/page_list.model';
import { PagedParams } from 'src/app/network/request/IParams.interface';

import { PagedTableAbstractComponent } from '../table-abstract.component';
import { AIOPGarbageCollectionPointTableBusiness } from './aiop-garbage-collection-point-table.business';
import { AIOPGarbageCollectionPointTableArgs } from './aiop-garbage-collection-point-table.model';

@Component({
  selector: 'aiop-garbage-collection-point-table',
  templateUrl: './aiop-garbage-collection-point-table.component.html',
  styleUrls: [
    '../table.less',
    './aiop-garbage-collection-point-table.component.less',
  ],
  providers: [AIOPGarbageCollectionPointTableBusiness],
})
export class AiopGarbageCollectionPointTableComponent
  extends PagedTableAbstractComponent<CollectionPoint>
  implements IComponent<IModel, PagedList<CollectionPoint>>, OnInit
{
  @Input()
  business: IBusiness<IModel, PagedList<CollectionPoint>>;
  @Input() init = false;
  @Input()
  args = new AIOPGarbageCollectionPointTableArgs();
  @Input()
  load?: EventEmitter<AIOPGarbageCollectionPointTableArgs>;

  @Output()
  update: EventEmitter<CollectionPoint> = new EventEmitter();

  @Input()
  selecteds: CollectionPoint[] = [];
  @Output()
  selectedsChange: EventEmitter<CollectionPoint[]> = new EventEmitter();

  constructor(business: AIOPGarbageCollectionPointTableBusiness) {
    super();
    this.business = business;
  }

  @ViewChild('body') bodyElement?: ElementRef<HTMLDivElement>;
  widths = ['30%', '25%', '30%', '15%'];

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
    if (this.init) {
      this.loadData(1, this.pageSize);
    }
  }

  async loadData(index: number, size: number, name?: string) {
    this.selecteds = [];
    let params = new PagedParams();
    params.PageIndex = index;
    params.PageSize = size;
    let paged = await this.business.load(params, this.args);
    this.page = paged.Page;
    this.datas = paged.Data;
  }

  onupdate(e: Event, item: CollectionPoint) {
    this.update.emit(item);
    e.stopPropagation();
  }

  onselected(item: CollectionPoint) {
    if (!this.selecteds) {
      this.selecteds = [];
    }
    let index = this.selecteds.indexOf(item);
    if (index < 0) {
      this.selecteds.push(item);
    } else {
      this.selecteds.splice(index, 1);
    }
    this.selectedsChange.emit(this.selecteds);
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
