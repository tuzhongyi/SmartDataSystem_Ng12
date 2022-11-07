import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { Flags } from 'src/app/common/tools/flags';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { WidescreenStationModel } from './widescreen-station-table.model';

export class WidescreenStationTableConverter
  implements
    IConverter<GarbageStation[], WidescreenStationModel<GarbageStation>[]>
{
  item = new WidescreenStationTableItemConverter();
  Convert(
    source: GarbageStation[],
    ...res: any[]
  ): WidescreenStationModel<GarbageStation>[] {
    return source.map((x) => {
      return this.item.Convert(x);
    });
  }
}
class WidescreenStationTableItemConverter
  implements IConverter<GarbageStation, WidescreenStationModel<GarbageStation>>
{
  Convert(
    source: GarbageStation,
    ...res: any[]
  ): WidescreenStationModel<GarbageStation> {
    let model = new WidescreenStationModel<GarbageStation>();
    model.id = source.Id;
    model.name = source.Name;
    model.status = new Flags(source.StationState);
    model.communityName = source.CommunityName ?? '';
    model.cameraCount = source.Cameras ? source.Cameras.length : 0;
    model.data = source;
    return model;
  }
}
