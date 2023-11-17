import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICommonTree } from 'src/app/common/components/common-tree/common-tree.model';
import { IIdNameModel } from 'src/app/network/model/model.interface';

@Component({
  selector: 'common-checkbox-list',
  templateUrl: './common-checkbox-list.component.html',
  styleUrls: ['./common-checkbox-list.component.less'],
})
export class CommonCheckboxListComponent<T extends IIdNameModel = IIdNameModel>
  implements ICommonTree
{
  @Input() selecteds: T[] = [];
  @Output() selectedsChange = new EventEmitter<T[]>();
  @Input() datas: T[] = [];
  constructor() {}

  get selectedIds() {
    return this.selecteds.map((x) => x.Id);
  }

  toggleNodes(ids: string[], clear?: boolean | undefined): void {
    if (clear) {
      this.selecteds = [];
    } else {
      for (let i = 0; i < ids.length; i++) {
        let index = this.selecteds.findIndex((x) => x.Id === ids[i]);
        if (index >= 0) {
          this.selecteds.splice(index, 1);
        }
      }
    }
    this.selectedsChange.emit(this.selecteds);
  }

  onchange(item: T) {
    let index = this.selecteds.findIndex((x) => x.Id === item.Id);
    if (index < 0) {
      this.selecteds.push(item);
    } else {
      this.selecteds.splice(index, 1);
    }
    this.selectedsChange.emit(this.selecteds);
  }
}
