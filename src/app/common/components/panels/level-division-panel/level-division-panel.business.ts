import { Injectable } from '@angular/core';

import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { LevelDivisionPanelCommitteesBusiness } from './business/level-division-panel-committees.business';
import { LevelDivisionPanelOtherBusiness } from './business/level-division-panel-other.business';
import { ILevelDivisionNode } from './level-division-panel.model';
import { LevelDivisionPanelService } from './level-division-panel.service';

@Injectable()
export class LevelDivisionPanelBusiness {
  constructor(
    public committees: LevelDivisionPanelCommitteesBusiness,
    public other: LevelDivisionPanelOtherBusiness,
    private service: LevelDivisionPanelService,
    private global: GlobalStorageService
  ) {}

  async load(node?: ILevelDivisionNode): Promise<ILevelDivisionNode[]> {
    if (!node) {
      node = await this.global.division.selected;
    }
    if (node.IsParent && node.ParentId) {
      node = await this.service.get(node.ParentId);
    }
    let _default = await this.global.division.default;
    if (node.DivisionType === DivisionType.Committees) {
      return this.committees.load(node, _default.DivisionType);
    } else {
      return this.other.load(node, _default.DivisionType);
    }
  }
}
