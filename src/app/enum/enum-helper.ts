import { DivisionType } from './division-type.enum';
import { UserResourceType } from './user-resource-type.enum';

export class EnumHelper {
  constructor() {}

  static ConvertUserResourceToDivision(type: UserResourceType) {
    switch (type) {
      case UserResourceType.City:
        return DivisionType.City;
      case UserResourceType.Committees:
        return DivisionType.Committees;
      case UserResourceType.County:
        return DivisionType.County;
      case UserResourceType.Station:
      default:
        return DivisionType.None;
    }
  }
  static ConvertDivisionToUserResource(type: DivisionType) {
    switch (type) {
      case DivisionType.City:
        return UserResourceType.City;
      case DivisionType.County:
        return UserResourceType.County;
      case DivisionType.Committees:
        return UserResourceType.Committees;
      default:
        return UserResourceType.City;
    }
  }

  static GetResourceChildType(type: DivisionType) {
    switch (type) {
      case DivisionType.City:
        return UserResourceType.County;
      case DivisionType.County:
        return UserResourceType.Committees;
      case DivisionType.Committees:
        return UserResourceType.Station;
      default:
        throw new Error('this is not divisiontype');
    }
  }
  static GetDivisionChildType(type: DivisionType) {
    switch (type) {
      case DivisionType.Province:
        return DivisionType.City;
      case DivisionType.City:
        return DivisionType.County;
      case DivisionType.County:
        return DivisionType.Committees;
      case DivisionType.Committees:
        return DivisionType.Community;
      default:
        throw new Error('this is not divisiontype');
    }
  }
}
