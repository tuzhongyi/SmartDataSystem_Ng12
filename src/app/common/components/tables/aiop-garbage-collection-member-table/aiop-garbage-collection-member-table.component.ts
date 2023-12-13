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
import { CollectionMember } from 'src/app/network/model/garbage-station/member.model';
import { IModel } from 'src/app/network/model/model.interface';
import { PagedList } from 'src/app/network/model/page_list.model';
import { PagedTableAbstractComponent } from '../table-abstract.component';
import { AIOPGarbageCollectionMemberTableBusiness } from './aiop-garbage-collection-member-table.business';
import { AiopGarbageCollectionMemberTableArgs } from './aiop-garbage-collection-member-table.model';

@Component({
  selector: 'aiop-garbage-collection-member-table',
  templateUrl: './aiop-garbage-collection-member-table.component.html',
  styleUrls: [
    '../table.less',
    './aiop-garbage-collection-member-table.component.less',
  ],
  providers: [AIOPGarbageCollectionMemberTableBusiness],
})
export class AIOPGarbageCollectionMemberTableComponent
  extends PagedTableAbstractComponent<CollectionMember>
  implements IComponent<IModel, PagedList<CollectionMember>>, OnInit
{
  @Input()
  business: IBusiness<IModel, PagedList<CollectionMember>>;
  @Input() init = false;
  @Input() args = new AiopGarbageCollectionMemberTableArgs();
  @Input() load?: EventEmitter<AiopGarbageCollectionMemberTableArgs>;

  @Output()
  update: EventEmitter<CollectionMember> = new EventEmitter();

  @Input()
  selected?: CollectionMember[];
  @Output()
  selectedChange: EventEmitter<CollectionMember[]> = new EventEmitter();

  constructor(business: AIOPGarbageCollectionMemberTableBusiness) {
    super();
    this.business = business;
  }

  @ViewChild('body') bodyElement?: ElementRef<HTMLDivElement>;
  widths = ['20%', '20%', '20%', '20%', '20%'];

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
  async loadData(index: number, size: number) {
    this.selected = undefined;

    let paged = await this.business.load(index, size, this.args);
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
