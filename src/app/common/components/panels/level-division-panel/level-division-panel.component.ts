import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DivisionType } from 'src/app/enum/division-type.enum';

import { ILevelListNode } from '../level-list-panel/level-list-panel.model';
import { LevelDivisionPanelBusiness } from './level-division-panel.business';
import { ILevelDivisionNode } from './level-division-panel.model';
import { LevelDivisionPanelProvider } from './level-division-panel.provider';

@Component({
  selector: 'level-division-panel',
  templateUrl: './level-division-panel.component.html',
  styleUrls: ['./level-division-panel.component.less'],
  providers: [...LevelDivisionPanelProvider],
})
export class LevelDivisionPanelComponent implements OnInit {
  @Input() cannull: boolean = true;
  @Input() nulllanguage = '请选择';
  @Input() selected?: ILevelDivisionNode;
  @Output() selectedChange: EventEmitter<ILevelDivisionNode> =
    new EventEmitter();
  @Output() loaded: EventEmitter<ILevelDivisionNode[]> = new EventEmitter();

  constructor(private business: LevelDivisionPanelBusiness) {}
  opened = false;
  datas: ILevelDivisionNode[] = [];

  ngOnInit(): void {
    this.loadData();
  }

  rename = false;

  async onchange(_node?: ILevelListNode) {
    let node = _node as ILevelDivisionNode;
    try {
      if (node) {
        if (node.DivisionType === DivisionType.Committees) {
          this.opened = false;
          return;
        }
        this.loadData(node);
      }
    } finally {
      this.selectedChange.emit(node);
    }
  }

  async loadData(parent?: ILevelDivisionNode) {
    this.business.load(parent).then((x) => {
      this.datas = x;
      this.loaded.emit(x);
    });
  }
}
