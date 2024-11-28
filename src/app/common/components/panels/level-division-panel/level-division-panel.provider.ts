import { LevelDivisionPanelCommitteesBusiness } from './business/level-division-panel-committees.business';
import { LevelDivisionPanelOtherBusiness } from './business/level-division-panel-other.business';
import { LevelDivisionPanelBusiness } from './level-division-panel.business';
import { LevelDivisionPanelConverter } from './level-division-panel.converter';
import { LevelDivisionPanelService } from './level-division-panel.service';

export const LevelDivisionPanelProvider = [
  LevelDivisionPanelConverter,
  LevelDivisionPanelService,
  LevelDivisionPanelCommitteesBusiness,
  LevelDivisionPanelOtherBusiness,
  LevelDivisionPanelBusiness,
];
