import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { ISelect } from '../hw-select/select-control.model';
import { SelectStationBusiness } from './select-station.business';
import { SelectStationArgs } from './select-station.model';

@Component({
  selector: 'howell-select-station',
  templateUrl: './select-station.component.html',
  styleUrls: ['./select-station.component.less'],
  providers: [SelectStationBusiness],
})
export class SelectStationComponent
  implements ISelect<GarbageStation>, OnInit, OnChanges
{
  @Input() divisionId?: string;

  private _selected?: GarbageStation;
  public get selected(): GarbageStation | undefined {
    return this._selected;
  }
  @Input()
  public set selected(v: GarbageStation | undefined) {
    if (this._selected == v) return;
    this._selected = v;
    this.selectedChange.emit(this.selected);
    if (this.selectedId != this._selected?.Id) {
      this.selectedId = this._selected?.Id;
    }
  }
  @Output() selectedChange = new EventEmitter<GarbageStation>();

  private _selectedId?: string;
  public get selectedId(): string | undefined {
    return this._selectedId;
  }
  @Input()
  public set selectedId(v: string | undefined) {
    if (this._selectedId === v) return;
    this._selectedId = v;
    this.selectedIdChange.emit(this._selectedId);
    if (this.selected?.Id != this._selectedId) {
      this.selected = this.datas.find((x) => x.Id == this._selectedId);
    }
  }
  @Output() selectedIdChange = new EventEmitter<string>();

  constructor(private business: SelectStationBusiness) {}

  datas: GarbageStation[] = [];
  args = new SelectStationArgs();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.divisionId) {
      this.args.divisionId = this.divisionId;
      if (changes.divisionId.isFirstChange() == false) {
        this.load();
      }
    }
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.business.load(this.args).then((x) => {
      this.datas = x;
    });
  }
}
