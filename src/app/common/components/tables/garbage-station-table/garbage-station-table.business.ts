import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { Flags } from 'src/app/common/tools/flags';
import { GarbageStationConverter } from 'src/app/converter/garbage-station.converter';
import { ImageControlArrayConverter } from 'src/app/converter/image-control-array.converter';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { SearchOptions } from 'src/app/view-model/search-options.model';
import { GarbageStationTableModel } from './garbage-station-table.model';

@Injectable()
export class GarbageStationTableBusiness
  implements
    IBusiness<PagedList<GarbageStation>, PagedList<GarbageStationTableModel>>
{
  constructor(
    private storeService: GlobalStorageService,
    private stationService: GarbageStationRequestService,
    private divisionService: DivisionRequestService
  ) {}
  Converter: IPromiseConverter<
    PagedList<GarbageStation>,
    PagedList<GarbageStationTableModel>
  > = new GarbageStationPagedConverter();
  subscription?: ISubscription | undefined;
  loading?: EventEmitter<void> | undefined;
  async load(
    page: PagedParams,
    opts?: SearchOptions,
    stationId?: string,
    divisionId?: string
  ): Promise<PagedList<GarbageStationTableModel>> {
    if (!divisionId) {
      divisionId = this.storeService.divisionId;
    }
    let data = await this.getData(divisionId, page, opts, stationId);
    let model = await this.Converter.Convert(data, (id: string) => {
      return this.divisionService.cache.get(id);
    });
    return model;
  }
  getData(
    divisionId: string,
    page: PagedParams,
    opts?: SearchOptions,
    stationId?: string
  ): Promise<PagedList<GarbageStation>> {
    let params = new GetGarbageStationsParams();
    params = Object.assign(params, page);
    if (opts) {
      (params as any)[opts.propertyName] = opts.text;
    }
    params.DivisionId = divisionId;
    if (stationId) {
      params.Ids = [stationId];
    }
    return this.stationService.list(params);
  }
}

export class GarbageStationPagedConverter
  implements
    IPromiseConverter<
      PagedList<GarbageStation>,
      PagedList<GarbageStationTableModel>
    >
{
  converter = {
    item: new GarbageStationTableConverter(),
  };

  async Convert(
    source: PagedList<GarbageStation>,
    getter: (id: string) => Promise<Division>
  ): Promise<PagedList<GarbageStationTableModel>> {
    let array: GarbageStationTableModel[] = [];
    for (let i = 0; i < source.Data.length; i++) {
      const item = source.Data[i];
      let model = await this.converter.item.Convert(item, getter);
      array.push(model);
    }
    return {
      Page: source.Page,
      Data: array,
    };
  }
}

export class GarbageStationTableConverter
  implements IPromiseConverter<GarbageStation, GarbageStationTableModel>
{
  async Convert(
    source: GarbageStation,
    getter: (id: string) => Promise<Division>
  ): Promise<GarbageStationTableModel> {
    let model = new GarbageStationTableModel();
    model.GarbageStation = await this.converter.station.Convert(source, getter);
    if (model.GarbageStation) {
      if (model.GarbageStation.Cameras) {
        model.images = this.converter.image.Convert(
          model.GarbageStation.Cameras
        );
      }
    }
    return model;
  }
  converter = {
    image: new ImageControlArrayConverter(),
    station: new GarbageStationConverter(),
  };
}
