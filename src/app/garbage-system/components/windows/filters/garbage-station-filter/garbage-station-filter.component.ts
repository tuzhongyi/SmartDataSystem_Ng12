import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { IModel } from 'src/app/network/model/model.interface';
import { GarbageStationFilterBusiness } from './garbage-station-filter.business';

@Component({
  selector: 'howell-garbage-station-filter',
  templateUrl: './garbage-station-filter.component.html',
  styleUrls: ['./garbage-station-filter.component.less'],
  providers: [GarbageStationFilterBusiness],
})
export class GarbageStationFilterComponent implements OnInit, OnChanges {
  @Input()
  divisionId?: string;
  @Output()
  select: EventEmitter<GarbageStation> = new EventEmitter();

  loading: EventEmitter<GarbageStation | undefined> = new EventEmitter();

  items: SelectItem[] = [];
  business: IBusiness<IModel, SelectItem[]>;

  constructor(business: GarbageStationFilterBusiness) {
    this.business = business;
  }
  async ngOnChanges(changes: SimpleChanges) {
    this.items = await this.business.load(this.divisionId);
  }

  async ngOnInit() {}

  onselected(selected: SelectItem) {
    this.select.emit(selected ? selected.value : undefined);
  }
}
