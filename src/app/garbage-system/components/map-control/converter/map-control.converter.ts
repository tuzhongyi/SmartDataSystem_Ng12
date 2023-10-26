import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';

type Local = Array<GarbageStation | CesiumDataController.Point>;
export class MapControlConverter implements IConverter<string[], Local> {
  Convert(source: string[], local: Local): Local {
    return local.filter((x) => {
      if (x instanceof GarbageStation) {
        return source.includes(x.Id);
      } else {
        return source.includes(x.id);
      }
    });
  }
}
