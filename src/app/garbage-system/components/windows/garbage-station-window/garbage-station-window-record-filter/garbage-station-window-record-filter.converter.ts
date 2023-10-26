import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { SelectItemConverter } from 'src/app/converter/select-item.converter';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { IModel } from 'src/app/network/model/model.interface';
import { GarbageStationWindowRecordFilterModel } from './garbage-station-window-record-filter.model';

export class GarbageStationWindowRecordFilterConverter
  implements IConverter<IModel, GarbageStationWindowRecordFilterModel>
{
  converter = {
    item: new SelectItemConverter(),
  };

  Convert(stations: GarbageStation[]): GarbageStationWindowRecordFilterModel {
    let model = new GarbageStationWindowRecordFilterModel();
    model.stations = stations.map((x) => {
      return this.converter.item.Convert(x);
    });
    model.stations.unshift(SelectItem.create(undefined, '全部'));
    return model;
  }
}
