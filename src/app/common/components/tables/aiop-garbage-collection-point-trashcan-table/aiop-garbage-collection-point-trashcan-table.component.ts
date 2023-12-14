import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { CollectionTrashCan } from 'src/app/network/model/garbage-station/trash-can.model';
import { IModel } from 'src/app/network/model/model.interface';
import { PagedList } from 'src/app/network/model/page_list.model';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { PagedTableAbstractComponent } from '../table-abstract.component';
import { AiopGarbageCollectionPointTrashCanTableBusiness } from './aiop-garbage-collection-point-trashcan-table.business';
import { AiopGarbageCollectionPointTrashCanTableArgs } from './aiop-garbage-collection-point-trashcan-table.model';

@Component({
  selector: 'aiop-garbage-collection-point-trashcan-table',
  templateUrl: './aiop-garbage-collection-point-trashcan-table.component.html',
  styleUrls: [
    '../table.less',
    './aiop-garbage-collection-point-trashcan-table.component.less',
  ],
  providers: [AiopGarbageCollectionPointTrashCanTableBusiness],
})
export class AiopGarbageCollectionPointTrashCanTableComponent
  extends PagedTableAbstractComponent<CollectionTrashCan>
  implements IComponent<IModel, PagedList<CollectionTrashCan>>, OnInit
{
  @Input()
  business: IBusiness<IModel, PagedList<CollectionTrashCan>>;
  @Input() init = false;
  @Input() args = new AiopGarbageCollectionPointTrashCanTableArgs();
  @Input()
  load?: EventEmitter<AiopGarbageCollectionPointTrashCanTableArgs>;

  @Output()
  update: EventEmitter<CollectionTrashCan> = new EventEmitter();

  @Input()
  selected?: CollectionTrashCan[];
  @Output()
  selectedChange: EventEmitter<CollectionTrashCan[]> = new EventEmitter();

  constructor(business: AiopGarbageCollectionPointTrashCanTableBusiness) {
    super();
    this.business = business;
  }

  widths = ['15%', '20%', '15%', '15%', '25%', '10%'];

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
    this.selected = undefined;
    let params = new PagedParams();
    params.PageIndex = index;
    params.PageSize = size;
    let paged = await this.business.load(params, this.args);
    this.page = paged.Page;
    this.datas = paged.Data;
  }

  onupdate(e: Event, item: CollectionTrashCan) {
    this.update.emit(item);
    e.stopPropagation();
  }

  onselected(item: CollectionTrashCan) {
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
