import { ImageVideoControlModel } from 'src/app/common/components/image-video-control/image-video-control.model';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { Language } from 'src/app/common/tools/language';
import { ImageControlConverter } from 'src/app/converter/image-control.converter';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { EventType } from 'src/app/enum/event-type.enum';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station-number-statistic.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { ControlClass, PatrolControlModel } from './patrol-control.model';

export class PatrolControlConverter
  implements IConverter<GarbageStation, PatrolControlModel>
{
  private converter = {
    image: new ImageControlConverter(),
  };

  Convert(
    source: GarbageStation,
    statistic: GarbageStationNumberStatistic
  ): PatrolControlModel {
    let model = new PatrolControlModel(source.Id);
    model.title = source.Name;

    model.media = new Promise((resolve) => {
      let medias = [];
      if (source.Cameras) {
        let online: OnlineStatus = OnlineStatus.Offline;
        for (let i = 0; i < source.Cameras.length; i++) {
          const camera = source.Cameras[i];
          if (online === OnlineStatus.Offline) {
            online = camera.OnlineStatus ?? OnlineStatus.Offline;
          }
          let img = this.converter.image.Convert(camera, false);
          let media = new ImageVideoControlModel(camera.Id, source.Id);
          media.image = img;
          medias.push(media);
        }
        model.status.online = online;
        resolve(medias);
      }
    });

    model.status.stationState = new ControlClass(source.StationState.value);
    model.status.stationState.language = Language.StationStateFlags(
      source.StationState
    );
    model.status.stationState.class = EnumHelper.GetClass(source.StationState);
    if (statistic.TodayEventNumbers) {
      for (let j = 0; j < statistic.TodayEventNumbers.length; j++) {
        const today = statistic.TodayEventNumbers[j];
        switch (today.EventType) {
          case EventType.IllegalDrop:
            model.status.illegalDrop = today.DayNumber;
            break;
          case EventType.MixedInto:
            model.status.mixedInto = today.DayNumber;
            break;

          default:
            break;
        }
      }
    }

    return model;
  }
}
