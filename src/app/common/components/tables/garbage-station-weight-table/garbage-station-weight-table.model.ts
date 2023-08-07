import { DivisionType } from 'src/app/enum/division-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { Division } from 'src/app/network/model/division.model';

export class GarbageStationWeightTableArgs {
  date: Date = new Date();
  unit: TimeUnit = TimeUnit.Day;
  type: DivisionType = DivisionType.County;
  divisionId?: string;
}

export class GarbageStationWeightTableModel {
  name!: string;
  division!: Promise<Division>;
  weight: Weight = new Weight();
}
export class GarbageStationWeightTableExportModel {
  name!: string;
  division!: Division;
  weight: Weight = new Weight();
}
class Weight {
  [key: string]: number;
  dry: number = 0;
  wet: number = 0;
}
