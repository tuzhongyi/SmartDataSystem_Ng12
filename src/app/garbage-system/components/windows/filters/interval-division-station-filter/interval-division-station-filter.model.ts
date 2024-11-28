import { ILevelDivisionNode } from 'src/app/common/components/panels/level-division-panel/level-division-panel.model';
import { ILevelListNode } from 'src/app/common/components/panels/level-list-panel/level-list-panel.model';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';

export class DivisionStationFilteModel {
  divisions: SelectItem[] = [];
  stations: SelectItem[] = [];
  cameras: SelectItem[] = [];
}
export interface DivisionStationFilterOpts {
  divisionId?: string;
  stationId?: string;
}

export class EventRecordFilterSelected {
  division?: ILevelDivisionNode;
}
export class EventRecordFilterSource {
  division: ILevelListNode[] = [];
}
