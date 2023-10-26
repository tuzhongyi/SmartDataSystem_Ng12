import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { Language } from 'src/app/common/tools/language';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station/garbage-station-number-statistic.model';

export class AMapLabelOptionConverter
  implements
    IConverter<
      GarbageStationNumberStatistic,
      CesiumDataController.LabelOptions
    >
{
  Convert(
    source: GarbageStationNumberStatistic,
    position: CesiumDataController.Position
  ): CesiumDataController.LabelOptions {
    const opt = new CesiumDataController.LabelOptions();
    opt.position = position;
    opt.id = source.Id;

    let p = (source.CurrentGarbageTime ?? 0) / 240;
    p = p > 1 ? 1 : p;

    const hours = parseInt(((source.CurrentGarbageTime ?? 0) / 60).toString());
    const minutes = parseInt(
      (Math.ceil(source.CurrentGarbageTime ?? 0) % 60).toString()
    );

    opt.text = hours
      ? hours + Language.json.Time.hour
      : minutes
      ? minutes + Language.json.Time.minute
      : '';

    const color = new CesiumDataController.Color();
    color.rgb = '#36e323';
    color.hsl = new CesiumDataController.HSL();
    color.hsl.h = 120 - parseInt((p * 90).toString());
    color.hsl.s = 100;
    color.hsl.l = 60;

    opt.color = color;
    opt.value = p;
    if (opt.text) {
      opt.image = new CesiumDataController.ImageOptions();
      opt.image.color = color;
      opt.image.value = p;
      opt.image.resource = CesiumDataController.ImageResource.arcProgress;
    }

    return opt;
  }
}
