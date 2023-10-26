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
import { CollectionMember } from 'src/app/network/model/garbage-station/member.model';
import { IModel } from 'src/app/network/model/model.interface';
import { PagedList } from 'src/app/network/model/page_list.model';
import { PagedTableAbstractComponent } from '../table-abstract.component';
import { AiopGarbageCollectionMemberTableBusiness } from './aiop-garbage-collection-member-table.business';

@Component({
  selector: 'aiop-garbage-collection-member-table',
  templateUrl: './aiop-garbage-collection-member-table.component.html',
  styleUrls: [
    '../table.less',
    './aiop-garbage-collection-member-table.component.less',
  ],
  providers: [AiopGarbageCollectionMemberTableBusiness],
})
export class AiopGarbageCollectionMemberTableComponent
  extends PagedTableAbstractComponent<CollectionMember>
  implements IComponent<IModel, PagedList<CollectionMember>>, OnInit, OnChanges
{
  @Input()
  business: IBusiness<IModel, PagedList<CollectionMember>>;
  @Input()
  divisionId?: string;
  @Input()
  load?: EventEmitter<string>;

  @Output()
  update: EventEmitter<CollectionMember> = new EventEmitter();

  @Input()
  selected?: CollectionMember[];
  @Output()
  selectedChange: EventEmitter<CollectionMember[]> = new EventEmitter();

  constructor(business: AiopGarbageCollectionMemberTableBusiness) {
    super();
    this.business = business;
  }

  widths = ['20%', '20%', '20%', '20%', '20%'];

  ngOnInit(): void {}
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
  async loadData(index: number, size: number, name?: string) {
    this.selected = undefined;

    let paged = await this.business.load(index, size, this.divisionId, name);
    this.page = paged.Page;
    this.datas = paged.Data;
  }

  onupdate(e: Event, item: CollectionMember) {
    this.update.emit(item);
    e.stopPropagation();
  }

  onselected(item: CollectionMember) {
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
