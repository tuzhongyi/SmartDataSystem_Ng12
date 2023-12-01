import { Component, OnInit } from '@angular/core';
import { CommonCheckboxListComponent } from 'src/app/common/components/common-checkbox-list/common-checkbox-list.component';
import { ICommonTree } from 'src/app/common/components/common-tree/common-tree.model';
import { Language } from 'src/app/common/tools/language';
import { IIdNameModel } from 'src/app/network/model/model.interface';

@Component({
  selector: 'ai-garbage-station-week-list',
  templateUrl: './ai-garbage-station-week-list.component.html',
  styleUrls: ['./ai-garbage-station-week-list.component.less'],
})
export class AiGarbageStationWeekListComponent
  extends CommonCheckboxListComponent
  implements OnInit, ICommonTree
{
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.datas = [];
    Language;
    for (let i = 0; i < 7; i++) {
      let item = {
        Id: i.toString(),
        Name: Language.Week(i),
      };
      this.datas.push(item);
    }
  }

  onselect(items: IIdNameModel[]) {
    this.selectedsChange.emit(items);
  }
}
