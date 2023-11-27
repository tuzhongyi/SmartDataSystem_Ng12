import { StationState } from 'src/app/enum/station-state.enum';

export class AuditStatisticDataCountStationArgs {
  divisionId?: string;
}

export class AuditStatisticDataCountStationData {
  normal = 0;
  drop = 0;
  dryFull = 0;
  wetFull = 0;
  error = 0;
  all = 0;
}

export class AuditStatisticDataCountStationDetailsArgs {
  state?: StationState;
  drop?: boolean;
}
