import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { SelectStationBusiness } from './select-station.business';
import { SelectStationArgs } from './select-station.model';

@Component({
  selector: 'howell-select-station',
  templateUrl: './select-station.component.html',
  styleUrls: ['./select-station.component.less'],
  providers: [SelectStationBusiness],
})
export class SelectStationComponent implements OnInit, OnChanges, OnDestroy {
  @Input() divisionId?: string;

  @Input() stationId?: string;
  @Output() stationIdChange = new EventEmitter<string>();

  constructor(private business: SelectStationBusiness) {}

  datas: GarbageStation[] = [];
  args = new SelectStationArgs();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.divisionId) {
      if (this.args.divisionId != this.divisionId) {
        this.args.divisionId = this.divisionId;
        if (changes.divisionId.isFirstChange() == false) {
          this.load();
        }
      }
    }
  }

  ngOnInit(): void {
    this.load();
  }

  ngOnDestroy(): void {}

  load() {
    this.business
      .load(this.args)
      .then((x) => {
        this.datas = x;
      })
      .catch(() => {});
  }
  onchange() {
    this.stationIdChange.emit(this.stationId);
  }
}
