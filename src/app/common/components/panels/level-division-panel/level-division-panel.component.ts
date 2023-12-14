import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { IModel } from 'src/app/network/model/model.interface';
import { ILevelListNode } from '../level-list-panel/level-list-panel.model';
import { LevelDivisionPanelBusiness } from './level-division-panel.business';

@Component({
  selector: 'level-division-panel',
  templateUrl: './level-division-panel.component.html',
  styleUrls: ['./level-division-panel.component.less'],
  providers: [LevelDivisionPanelBusiness],
})
export class LevelDivisionPanelComponent
  implements IComponent<IModel, ILevelListNode[]>, OnInit
{
  @Input() business: IBusiness<IModel, ILevelListNode[]>;
  @Input() cannull: boolean = true;
  @Input() nulllanguage = '请选择';
  @Input() selected?: ILevelListNode;
  @Output() selectedChange: EventEmitter<ILevelListNode> = new EventEmitter();

  constructor(business: LevelDivisionPanelBusiness) {
    this.business = business;
  }
  opened = false;
  datas: ILevelListNode[] = [];

  ngOnInit(): void {
    this.loadData();
  }

  rename = false;

  async onchange(node?: ILevelListNode) {
    try {
      if (node) {
        let division = node as Division;
        if (division.DivisionType === DivisionType.Committees) {
          this.opened = false;
          return;
        }
      }
      this.loadData(node);
    } finally {
      this.selectedChange.emit(node);
    }
  }

  loadData(node?: ILevelListNode) {
    this.business.load(node).then((x) => {
      this.datas = x;
    });
  }
}
