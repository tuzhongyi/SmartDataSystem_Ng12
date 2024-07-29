import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { SelectCameraBusiness } from './select-camera.business';
import { SelectCameraArgs } from './select-camera.model';

@Component({
  selector: 'howell-select-camera',
  templateUrl: './select-camera.component.html',
  styleUrls: ['./select-camera.component.less'],
  providers: [SelectCameraBusiness],
})
export class SelectCameraComponent implements OnInit {
  @Input() divisionId?: string;
  @Input() stationId?: string;

  private _selected?: Camera;
  public get selected(): Camera | undefined {
    return this._selected;
  }
  @Input()
  public set selected(v: Camera | undefined) {
    if (this._selected == v) return;
    this._selected = v;
    this.selectedChange.emit(this.selected);
    if (this.selectedId != this._selected?.Id) {
      this.selectedId = this._selected?.Id;
    }
  }
  @Output() selectedChange = new EventEmitter<Camera>();

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
  constructor(private business: SelectCameraBusiness) {}

  datas: Camera[] = [];
  args = new SelectCameraArgs();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.divisionId) {
      this.args.divisionId = this.divisionId;
      if (changes.divisionId.isFirstChange() == false) {
        this.load();
      }
    }
    if (changes.stationId) {
      this.args.stationId = this.stationId;
      if (changes.stationId.isFirstChange() == false) {
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
