import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { SelectItemConverter } from 'src/app/converter/select-item.converter';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { DivisionStationFilteModel } from './interval-division-station-filter.model';

export class EventRecordFilterConverter
  implements IConverter<string, DivisionStationFilteModel>
{
  converter = {
    item: new SelectItemConverter(),
  };

  Convert(
    source: string,
    divisions?: Division[],
    stations?: GarbageStation[],
    cameras?: Camera[]
  ): DivisionStationFilteModel {
    let model = new DivisionStationFilteModel();

    if (divisions) {
      model.divisions = divisions.map((x) => {
        return this.converter.item.Convert(x);
      });
    }

    if (stations) {
      model.stations = stations.map((x) => {
        return this.converter.item.Convert(x);
      });
    }
    if (cameras) {
      model.cameras = cameras.map((x) => {
        return this.converter.item.Convert(x);
      });
    }

    return model;
  }
}
