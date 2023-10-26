import { DivisionType } from 'src/app/enum/division-type.enum';
import { Member } from 'src/app/network/model/garbage-station/member.model';
import { SearchOptions } from 'src/app/view-model/search-options.model';
import { GarbageStationModel } from '../../../../view-model/garbage-station.model';

export class GarbageDropStationTableModel {
  GarbageStation!: Promise<GarbageStationModel>;
  GarbageDuration?: Date;
  MaxGarbageDuration?: Date;
  GarbageCount = 0;
  members!: Promise<MemberViewModel[]>;
  urls!: Promise<string[]>;
}

export class MemberViewModel extends Member {
  view: string = '';
}

export class GarbageDropStationTableSourceModel {
  id!: string;
  type!: DivisionType;
}

export interface GarbageDropStationTableArgs {
  divisionId?: string;
  opts?: SearchOptions;
}
