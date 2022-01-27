import { SelectItem } from 'src/app/common/components/select-control/select-control.model';

export class EventRecordSourceModel {
  divisions: SelectItem[] = [];
  stations: SelectItem[] = [];
  cameras: SelectItem[] = [];
}
export interface EventRecordSourceOpts {
  divisionId: string;
  stationId?: string;
}
