import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { WindowComponent } from 'src/app/common/components/window-control/window.component';
import { Language } from 'src/app/common/tools/language';
import { StationState } from 'src/app/enum/station-state.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { ImageControlModelArray } from 'src/app/view-model/image-control.model';
import { SearchOptions } from 'src/app/view-model/search-options.model';

@Component({
  selector: 'howell-station-window',
  templateUrl: './station-window.component.html',
  styleUrls: ['./station-window.component.less'],
})
export class StationWindowComponent extends WindowComponent implements OnInit {
  @Input()
  state?: StationState;
  @Output()
  position: EventEmitter<GarbageStation> = new EventEmitter();
  @Output()
  image: EventEmitter<ImageControlModelArray> = new EventEmitter();

  constructor() {
    super();
  }

  load: EventEmitter<SearchOptions> = new EventEmitter();

  types: SelectItem[] = [];
  type?: SelectItem;

  ngOnInit(): void {
    this.initStationType();
  }

  initDivision() {}
  initStationType() {
    this.types.push(new SelectItem(undefined, undefined, '全部'));
    this.types.push(
      SelectItem.create(StationState.Normal, Language.StationState)
    );
    this.types.push(
      SelectItem.create(StationState.Smoke, Language.StationState)
    );
    this.types.push(
      SelectItem.create(StationState.Error, Language.StationState)
    );
  }

  onposition(station: GarbageStation) {
    this.position.emit(station);
  }
  onimage(model: ImageControlModelArray) {
    this.image.emit(model);
  }

  onsearch(text: SearchOptions) {
    this.load.emit(text);
  }
}
