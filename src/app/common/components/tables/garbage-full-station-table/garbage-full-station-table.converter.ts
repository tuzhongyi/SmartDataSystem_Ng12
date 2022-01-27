import { IPromiseConverter } from 'src/app/common/interfaces/converter.interface';
import { Flags } from 'src/app/common/tools/flags';
import { ImageControlArrayConverter } from 'src/app/converter/image-control-array.converter';
import { CameraUsage } from 'src/app/enum/camera-sage.enum';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station-number-statistic.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GarbageFullStationTableModel } from './garbage-full-station-table.model';

export class GarbageFullStationPagedTableConverter
  implements
    IPromiseConverter<
      PagedList<GarbageStationNumberStatistic>,
      PagedList<GarbageFullStationTableModel>
    >
{
  private converter = {
    item: new GarbageFullStationTableConverter(),
  };

  async Convert(
    source: PagedList<GarbageStationNumberStatistic>,
    getter: {
      station: (id: string) => Promise<GarbageStation>;
      division: (id: string) => Promise<Division>;
    }
  ): Promise<PagedList<GarbageFullStationTableModel>> {
    let array: GarbageFullStationTableModel[] = [];
    for (let i = 0; i < source.Data.length; i++) {
      let item = await this.converter.item.Convert(source.Data[i], getter);

      array.push(item);
    }
    return {
      Page: source.Page,
      Data: array,
    };
  }
}

export class GarbageFullStationTableConverter
  implements
    IPromiseConverter<
      GarbageStationNumberStatistic,
      GarbageFullStationTableModel
    >
{
  converter = {
    image: new ImageControlArrayConverter(),
  };

  async Convert(
    source: GarbageStationNumberStatistic,
    getter: {
      station: (id: string) => Promise<GarbageStation>;
      division: (id: string) => Promise<Division>;
    }
  ): Promise<GarbageFullStationTableModel> {
    let model = new GarbageFullStationTableModel();

    let now = new Date();
    let offset = now.getTimezoneOffset() / 60;
    if (source.FullDuration) {
      model.FullDuration = new Date(source.FullDuration * 1000 * 60);
      model.FullDuration.setHours(model.FullDuration.getHours() + offset);
    }
    model.GarbageStation = await getter.station(source.Id);

    if (model.GarbageStation) {
      if (model.GarbageStation.Cameras) {
        let cameras = model.GarbageStation.Cameras.filter((x) => {
          let flags = new Flags(x.CameraUsage);
          return flags.contains(CameraUsage.GarbageFull);
        });

        model.images = this.converter.image.Convert(cameras);
      }

      if (model.GarbageStation.DivisionId) {
        model.Committees = await getter.division(
          model.GarbageStation.DivisionId
        );
        if (model.Committees.ParentId) {
          model.County = await getter.division(model.Committees.ParentId);
          if (model.County.ParentId) {
            model.City = await getter.division(model.County.ParentId);
          }
        }
      }
    }
    return model;
  }
}
