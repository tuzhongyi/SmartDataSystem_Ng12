import { SelectItem } from 'src/app/common/components/select-control/select-control.model';

export class DivisionStationFilteModel {
  divisions: SelectItem[] = [];
  stations: SelectItem[] = [];
  cameras: SelectItem[] = [];
}
export interface DivisionStationFilterOpts {
  divisionId?: string;
  stationId?: string;
}
