import { Member } from 'src/app/network/model/member.model';
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
