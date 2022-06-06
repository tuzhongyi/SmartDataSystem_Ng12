import { DivisionType } from '../enum/division-type.enum';
import { UserResourceType } from '../enum/user-resource-type.enum';
import { Division } from '../network/model/division.model';
import { GarbageStation } from '../network/model/garbage-station.model';
import { UserResource } from '../network/model/user.model';

export class FlatTreeNode {
  constructor(
    public id: string,
    public name: string,
    public level: number,
    public expandable = false,
    public parentId: string | null = null,
    public iconType: string = 'howell-icon-map5',
    public type: UserResourceType = UserResourceType.None,
    // public parentNode: FlatTreeNode | null = null,

    public data?: any,
  ) { }
  setData<T>(data: T) {
    this.data = data;
  }
  getData<T>() {
    return this.data as T;
  }
}
