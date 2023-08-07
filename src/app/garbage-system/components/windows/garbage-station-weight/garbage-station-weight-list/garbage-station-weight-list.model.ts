import { EventEmitter } from '@angular/core';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { Division } from 'src/app/network/model/division.model';

export class GarbageStationWeightListDateArgs {
  format = 'yyyy年MM月dd日';
  view = DateTimePickerView.month;
  isweek = false;
}
export class GarbageStationWeightListSelected {
  division?: Division;

  private _type: UserResourceType = UserResourceType.County;
  public get type(): UserResourceType {
    return this._type;
  }
  public set type(v: UserResourceType) {
    this._type = v;
    this.typeChange.emit(this._type);
  }

  child: UserResourceType = UserResourceType.County;

  typeChange = new EventEmitter();
}
