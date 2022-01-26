import { KeyValue } from '@angular/common';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { Member } from 'src/app/network/model/member.model';
import { ImageControlModel } from '../../image-control/image-control.model';

export class GarbageDropStationTableModel {
  GarbageStation?: GarbageStation;
  Committees?: Division;
  County?: Division;
  City?: Division;
  GarbageDuration?: Date;
  MaxGarbageDuration?: Date;
  GarbageCount = 0;
  images: ImageControlModel[] = [];
  members: Member[] = [];
}
