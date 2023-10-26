import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { CollectionPoint } from 'src/app/network/model/garbage-station/collection-point.model';
import { IModel } from 'src/app/network/model/model.interface';
import { PagedList } from 'src/app/network/model/page_list.model';
import { PagedParams } from 'src/app/network/request/IParams.interface';

import { PagedTableAbstractComponent } from '../table-abstract.component';
import { AIOPGarbageCollectionPointTableBusiness } from './aiop-garbage-collection-point-table.business';

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
  implements IComponent<IModel, PagedList<CollectionPoint>>, OnInit, OnChanges
{
  @Input()
  business: IBusiness<IModel, PagedList<CollectionPoint>>;
  @Input()
  divisionId?: string;
  @Input()
  load?: EventEmitter<string>;

  @Output()
  update: EventEmitter<CollectionPoint> = new EventEmitter();

  @Input()
  selected?: CollectionPoint[];
  @Output()
  selectedChange: EventEmitter<CollectionPoint[]> = new EventEmitter();

  constructor(business: AIOPGarbageCollectionPointTableBusiness) {
    super();
    this.business = business;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.divisionId) {
      if (this.divisionId) {
        this.loadData(1, this.pageSize);
      }
    }
    if (changes.load) {
      if (this.load) {
        this.load.subscribe((name) => {
          this.loadData(1, this.pageSize, name);
        });
      }
    }
  }

  widths = ['30%', '25%', '30%', '15%'];

  ngOnInit(): void {}

  async loadData(index: number, size: number, name?: string) {
    this.selected = undefined;
    let params = new PagedParams();
    params.PageIndex = index;
    params.PageSize = size;
    let paged = await this.business.load(params, this.divisionId, name);
    this.page = paged.Page;
    this.datas = paged.Data;
  }

  onupdate(e: Event, item: CollectionPoint) {
    this.update.emit(item);
    e.stopPropagation();
  }

  onselected(item: CollectionPoint) {
    if (!this.selected) {
      this.selected = [];
    }
    let index = this.selected.indexOf(item);
    if (index < 0) {
      this.selected.push(item);
    } else {
      this.selected.splice(index, 1);
    }
    this.selectedChange.emit(this.selected);
  }
}
