import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { StoreService } from 'src/app/global/service/store.service';
import { Language } from 'src/app/global/tool/language';
import { Division } from 'src/app/network/model/division.model';
import { IModel } from 'src/app/network/model/model.interface';
import { DivisionFilterBusiness } from './division-filter.business';

@Component({
  selector: 'howell-division-filter',
  templateUrl: './division-filter.component.html',
  styleUrls: ['./division-filter.component.less'],
  providers: [DivisionFilterBusiness],
})
export class DivisionFilterComponent
  implements OnInit, IComponent<IModel, SelectItem[]>
{
  @Input()
  type: DivisionType = DivisionType.Committees;
  @Input()
  parentId?: string;
  @Output()
  select: EventEmitter<Division> = new EventEmitter();

  title?: string;
  items: SelectItem[] = [];

  business: IBusiness<IModel, SelectItem[]>;

  loading: EventEmitter<Division | undefined> = new EventEmitter();

  constructor(business: DivisionFilterBusiness) {
    this.business = business;
  }

  async ngOnInit() {
    this.items = await this.business.load(this.type, this.parentId);
    this.title = Language.DivisionType(this.type);
    this.loading.emit();
  }

  onselected(selected: SelectItem) {
    this.select.emit(selected.value);
  }
}
