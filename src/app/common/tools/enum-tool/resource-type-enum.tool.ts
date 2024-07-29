import { DivisionType } from 'src/app/enum/division-type.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';

export class ResourceTypeEnumTool {
  to = {
    division: (type: UserResourceType) => {
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
    },
  };
  from = {
    division: (type: DivisionType) => {
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
    },
  };

  child(type: UserResourceType) {
    switch (type) {
      case UserResourceType.City:
        return UserResourceType.County;
      case UserResourceType.County:
        return UserResourceType.Committees;
      case UserResourceType.Committees:
      case UserResourceType.Station:
      default:
        return UserResourceType.Station;
    }
  }
  parent(type: UserResourceType) {
    switch (type) {
      case UserResourceType.Station:
        return UserResourceType.Committees;
      case UserResourceType.Committees:
        return UserResourceType.County;
      case UserResourceType.County:
      case UserResourceType.City:
      default:
        return UserResourceType.City;
    }
  }
}
