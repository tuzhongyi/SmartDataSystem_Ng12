import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { IIdNameModel } from 'src/app/network/model/model.interface';

export class EventRecordDetailsTableModel {
  divisions: IIdNameModel[] = [];
  stations: SelectItem[] = [];
  cameras: SelectItem[] = [];
}
