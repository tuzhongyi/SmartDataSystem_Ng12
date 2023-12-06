import { EventEmitter } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { IIdNameModel } from 'src/app/network/model/model.interface';

export class WeekSelection {
  selecteds: IIdNameModel[] = [];

  default: string[] = [];

  select: EventEmitter<IIdNameModel[]> = new EventEmitter();

  onselect(nodes: IIdNameModel[]) {
    this.selecteds = nodes;
    this.select.emit(this.selecteds);
  }
}
export class WeekSelectionWindow extends WindowViewModel {
  style = {
    width: '300px',
    height: 'auto',
  };
  current: number = 0;
  weeks: number[] = [];
}
