import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { IObjectModel } from 'src/app/network/model/model.interface';

export class EventRecordDetailsTableModel {
  divisions: IObjectModel[] = [];
  stations: SelectItem[] = [];
  cameras: SelectItem[] = [];
}
