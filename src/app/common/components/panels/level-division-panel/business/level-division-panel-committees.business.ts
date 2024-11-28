import { Injectable } from '@angular/core';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { LevelDivisionPanelConverter } from '../level-division-panel.converter';
import { ILevelDivisionNode } from '../level-division-panel.model';
import { LevelDivisionPanelService } from '../level-division-panel.service';

@Injectable()
export class LevelDivisionPanelCommitteesBusiness {
  constructor(
    private service: LevelDivisionPanelService,
    private converter: LevelDivisionPanelConverter
  ) {}

  async load(current: ILevelDivisionNode, top: DivisionType) {
    let parentId = current.ParentId!;
    let children = await this.service.children(parentId);
    let datas = this.converter.Convert(children);
    let parent = await this.service.get(parentId);
    if (parent && parent.DivisionType > top) {
      datas.unshift({
        DivisionType: parent.DivisionType,
        Id: parent.Id,
        Name: parent.Name,
        ParentId: parent.ParentId,
        IsParent: true,
      });
    }
    return datas;
  }
}
