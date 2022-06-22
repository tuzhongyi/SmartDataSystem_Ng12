import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { StoreService } from 'src/app/common/service/store.service';
import { Language } from 'src/app/common/tools/language';
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
  @Input()
  default: boolean = false;

  title?: string;
  items: SelectItem[] = [];

  business: IBusiness<IModel, SelectItem[]>;

  loading: EventEmitter<SelectItem | undefined> = new EventEmitter();

  constructor(business: DivisionFilterBusiness) {
    this.business = business;
  }

  async ngOnInit() {
    this.items = await this.business.load(this.type, this.parentId);
    this.title = Language.DivisionType(this.type);
    if (this.default) {
      let first: SelectItem | undefined = undefined;
      if (this.items && this.items.length > 0) {
        this.loading.emit(this.items[0]);
      }

    }
  }

  onselected(selected: SelectItem) {
    if (selected) {
      this.select.emit(selected.value);
    }
    else {
      this.select.emit()
    }
  }
}
