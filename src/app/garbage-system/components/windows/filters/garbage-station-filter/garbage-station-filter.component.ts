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
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
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

  loading: EventEmitter<string> = new EventEmitter();

  items: SelectItem[] = [];
  business: IBusiness<IModel, SelectItem[]>;

  constructor(business: GarbageStationFilterBusiness) {
    this.business = business;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.divisionId) {
      this.business
        .load(this.divisionId)
        .then((x) => {
          this.items = x;
        })
        .catch((x) => {
          this.items = [];
        });
    } else {
      this.items = [];
    }
  }

  async ngOnInit() {}

  onselected(selected: SelectItem) {
    this.select.emit(selected ? selected.value : undefined);
  }
}
