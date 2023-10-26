import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { Language } from 'src/app/common/tools/language';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';
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
  @Input()
  default: boolean = false;

  private _selected?: SelectItem;
  public get selected(): SelectItem | undefined {
    return this._selected;
  }
  @Input()
  public set selected(v: SelectItem | undefined) {
    if (this._selected === v) return;
    this._selected = v;
    this.selectedChange.emit(v);
  }
  @Output()
  selectedChange: EventEmitter<SelectItem> = new EventEmitter();

  @Output()
  select: EventEmitter<Division> = new EventEmitter();

  title?: string;
  items: SelectItem[] = [];

  business: IBusiness<IModel, SelectItem[]>;

  constructor(business: DivisionFilterBusiness) {
    this.business = business;
  }

  async ngOnInit() {
    this.items = await this.business.load(this.type, this.parentId);
    this.title = Language.DivisionType(this.type);
    if (this.default) {
      if (this.items && this.items.length > 0) {
        this.selected = this.items[0].value;
      }
    }
    this.selectedChange.subscribe(this.select);
  }
}
