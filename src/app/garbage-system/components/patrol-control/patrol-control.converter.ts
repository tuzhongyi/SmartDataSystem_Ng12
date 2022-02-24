import { ImageVideoControlModel } from 'src/app/common/components/image-video-control/image-video-control.model';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { Flags } from 'src/app/common/tools/flags';
import { ImageControlConverter } from 'src/app/converter/image-control.converter';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { EventType } from 'src/app/enum/event-type.enum';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { Language } from 'src/app/global/tool/language';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station-number-statistic.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { ControlClass, PatrolControlModel } from './patrol-control.model';

export class PatrolArrayControlConverter
  implements IConverter<GarbageStation[], PatrolControlModel[]>
{
  converter = {
    item: new PatrolControlConverter(),
  };
  Convert(
    source: GarbageStation[],
    statistic: GarbageStationNumberStatistic[]
  ): PatrolControlModel[] {
    let array: PatrolControlModel[] = [];
    for (let i = 0; i < source.length; i++) {
      let illegalDrop = 0;
      let mixedInto = 0;
      let number = statistic.find((x) => x.Id === source[i].Id);
      if (number && number.TodayEventNumbers) {
        for (let j = 0; j < number.TodayEventNumbers.length; j++) {
          const today = number.TodayEventNumbers[j];
          switch (today.EventType) {
            case EventType.IllegalDrop:
              illegalDrop = today.DayNumber;
              break;
            case EventType.MixedInto:
              mixedInto = today.DayNumber;
              break;

            default:
              break;
          }
        }
      }

      let item = this.converter.item.Convert(
        source[i],

        illegalDrop,
        mixedInto
      );
      array.push(item);
    }
    return array;
  }
}

export class PatrolControlConverter
  implements IConverter<GarbageStation, PatrolControlModel>
{
  private converter = {
    image: new ImageControlConverter(),
  };

  Convert(
    source: GarbageStation,
    illegalDrop = 0,
    mixedInto = 0
  ): PatrolControlModel {
    let model = new PatrolControlModel(source.Id);
    model.title = source.Name;

    model.media = [];
    if (source.Cameras) {
      let online: OnlineStatus = OnlineStatus.Offline;
      for (let i = 0; i < source.Cameras.length; i++) {
        const camera = source.Cameras[i];
        if (online === OnlineStatus.Offline) {
          online = camera.OnlineStatus ?? OnlineStatus.Offline;
        }
        let img = this.converter.image.Convert(camera, false);
        let media = new ImageVideoControlModel(source.Id, camera.Id);
        media.image = img;
        model.media.push(media);
      }
      model.status.online = online;
    }
    let flags = new Flags(source.StationState);

    model.status.stationState = new ControlClass(source.StationState);
    model.status.stationState.language = Language.StationStateFlags(flags);
    model.status.stationState.class = EnumHelper.GetClass(flags);
    model.status.illegalDrop = illegalDrop;
    model.status.mixedInto = mixedInto;

    return model;
  }
}
