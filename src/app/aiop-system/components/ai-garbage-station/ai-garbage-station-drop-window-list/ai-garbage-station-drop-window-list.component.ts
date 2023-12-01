import { Component, Input, OnInit } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { CommonCheckboxListComponent } from 'src/app/common/components/common-checkbox-list/common-checkbox-list.component';
import { ICommonTree } from 'src/app/common/components/common-tree/common-tree.model';
import { DropWindow } from 'src/app/network/model/garbage-station/drop-window.model';
import { IIdNameModel } from 'src/app/network/model/model.interface';
import { DropWindowModel } from './ai-garbage-station-drop-window-list.model';

@Component({
  selector: 'ai-garbage-station-drop-window-list',
  templateUrl: './ai-garbage-station-drop-window-list.component.html',
  styleUrls: ['./ai-garbage-station-drop-window-list.component.less'],
})
export class AIGarbageStationDropWindowListComponent
  extends CommonCheckboxListComponent
  implements OnInit, ICommonTree
{
  @Input() models?: DropWindow[];

  constructor() {
    super();
  }

  ngOnInit(): void {
    if (!this.models) {
      this.models = [];
    }
    let plain = instanceToPlain(this.models);
    this.datas = plainToInstance(DropWindowModel, plain as Array<any>);
  }

  onselect(items: IIdNameModel[]) {
    this.selectedsChange.emit(items);
  }
}
