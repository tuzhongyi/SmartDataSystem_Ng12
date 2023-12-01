import { IIdNameModel } from 'src/app/network/model/model.interface';

export class DropWindowSelection {
  show = false;
  selecteds: IIdNameModel[] = [];

  default: string[] = [];

  onselect(nodes: IIdNameModel[]) {
    this.selecteds = nodes;
  }
}
