import { DivisionType } from 'src/app/enum/division-type.enum';

export class DivisionTreeSyncArgs {
  showStation = false;
  onlystation = false;
  name?: string;
  depth: number = 1;
  resourceType: DivisionType = DivisionType.City;
}