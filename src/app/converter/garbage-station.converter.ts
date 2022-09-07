import { IPromiseConverter } from 'src/app/common/interfaces/converter.interface';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { GarbageStationModel } from '../view-model/garbage-station.model';

export class GarbageStationConverter
  implements IPromiseConverter<GarbageStation, GarbageStationModel>
{
  async Convert(
    source: GarbageStation,
    getter: (id: string) => Promise<Division>
  ): Promise<GarbageStationModel> {
    if (source.Cameras) {
      source.Cameras = source.Cameras.sort((a, b) => {
        return a.Name.localeCompare(b.Name);
      });
    }

    let model = new GarbageStationModel();

    model = Object.assign(model, source);
    if (model.DivisionId) {
      model.Committees = await getter(model.DivisionId);
      if (model.Committees.ParentId) {
        model.County = await getter(model.Committees.ParentId);
        if (model.County.ParentId) {
          model.City = await getter(model.County.ParentId);
        }
      }
    }
    return model;
  }
}
