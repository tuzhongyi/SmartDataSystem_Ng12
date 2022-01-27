import { IPromiseConverter } from 'src/app/common/interfaces/converter.interface';
import { ImageControlArrayConverter } from 'src/app/converter/image-control-array.converter';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station-number-statistic.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GarbageDropStationTableModel } from './garbage-drop-station-table.model';

export class GarbageDropStationPagedTableConverter
  implements
    IPromiseConverter<
      PagedList<GarbageStationNumberStatistic>,
      PagedList<GarbageDropStationTableModel>
    >
{
  private converter = {
    item: new GarbageDropStationTableConverter(),
  };

  async Convert(
    source: PagedList<GarbageStationNumberStatistic>,
    getter: {
      station: (id: string) => Promise<GarbageStation>;
      division: (id: string) => Promise<Division>;
    }
  ): Promise<PagedList<GarbageDropStationTableModel>> {
    let array: GarbageDropStationTableModel[] = [];
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

export class GarbageDropStationTableConverter
  implements
    IPromiseConverter<
      GarbageStationNumberStatistic,
      GarbageDropStationTableModel
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
  ): Promise<GarbageDropStationTableModel> {
    let model = new GarbageDropStationTableModel();
    model.GarbageCount = source.GarbageCount ?? 0;
    let now = new Date();
    let offset = now.getTimezoneOffset() / 60;
    if (source.CurrentGarbageTime) {
      model.GarbageDuration = new Date(source.CurrentGarbageTime * 1000);
      model.GarbageDuration.setHours(model.GarbageDuration.getHours() + offset);
    }
    if (source.MaxGarbageTime) {
      model.MaxGarbageDuration = new Date(source.MaxGarbageTime * 1000);
      model.MaxGarbageDuration.setHours(
        model.MaxGarbageDuration.getHours() + offset
      );
    }
    model.GarbageStation = await getter.station(source.Id);

    if (model.GarbageStation) {
      model.members = model.GarbageStation.Members ?? [];

      if (model.GarbageStation.Cameras) {
        model.images = this.converter.image.Convert(
          model.GarbageStation.Cameras
        );
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
