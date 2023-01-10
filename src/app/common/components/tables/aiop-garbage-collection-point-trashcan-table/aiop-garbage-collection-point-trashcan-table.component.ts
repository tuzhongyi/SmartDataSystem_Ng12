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
import { IModel } from 'src/app/network/model/model.interface';
import { PagedList } from 'src/app/network/model/page_list.model';
import { CollectionTrashCan } from 'src/app/network/model/trash-can.model';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { PagedTableAbstractComponent } from '../table-abstract.component';
import { AiopGarbageCollectionPointTrashCanTableBusiness } from './aiop-garbage-collection-point-trashcan-table.business';

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
  implements
    IComponent<IModel, PagedList<CollectionTrashCan>>,
    OnInit,
    OnChanges
{
  @Input()
  business: IBusiness<IModel, PagedList<CollectionTrashCan>>;
  @Input()
  divisionId?: string;
  @Input()
  load?: EventEmitter<string>;

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

  widths = ['15%', '20%', '15%', '15%', '25%', '10%'];

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