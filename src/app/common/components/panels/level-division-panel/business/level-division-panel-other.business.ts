import { Injectable } from '@angular/core';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { LevelDivisionPanelConverter } from '../level-division-panel.converter';
import { ILevelDivisionNode } from '../level-division-panel.model';
import { LevelDivisionPanelService } from '../level-division-panel.service';

@Injectable()
export class LevelDivisionPanelOtherBusiness {
  constructor(
    private service: LevelDivisionPanelService,
    private converter: LevelDivisionPanelConverter
  ) {}

  async load(current: ILevelDivisionNode, top: DivisionType) {
    // 如果是区
    let children = await this.service.children(current.Id);
    // 加载街道
    let datas = this.converter.Convert(children);
    // 如果有父级并且父级是区
    if (current.ParentId && current.DivisionType > top) {
      datas.unshift({
        DivisionType: current.DivisionType,
        Id: current.Id,
        Name: current.Name,
        ParentId: current.ParentId,
        Language: '上一级',
        IsParent: true,
      });
    }
    return datas;
  }
}
