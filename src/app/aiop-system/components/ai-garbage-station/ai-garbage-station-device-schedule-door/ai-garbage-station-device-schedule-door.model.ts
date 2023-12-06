import { EventEmitter } from '@angular/core';
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
