import { EventEmitter, Injectable } from '@angular/core';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { SelectItemConverter } from 'src/app/converter/select-item.converter';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class GarbageStationFilterBusiness
  implements IBusiness<GarbageStation[], SelectItem[]>
{
  constructor(private stationService: GarbageStationRequestService) {}
  Converter: IConverter<GarbageStation[], SelectItem[]> =
    new GarbageStationFilterConverter();
  subscription?: ISubscription | undefined;
  loading?: EventEmitter<void> | undefined;
  async load(divisionId: string): Promise<SelectItem[]> {
    let data = await this.getData(divisionId);
    let model = this.Converter.Convert(data);
    return model;
  }
  async getData(divisionId: string): Promise<GarbageStation[]> {
    let params = new GetGarbageStationsParams();
    params.DivisionId = divisionId;
    let paged = await this.stationService.cache.list(params);
    return paged.Data;
  }
}

class GarbageStationFilterConverter
  implements IConverter<GarbageStation[], SelectItem[]>
{
  converter = {
    item: new SelectItemConverter(),
  };
  Convert(source: GarbageStation[]): SelectItem[] {
    let array: SelectItem[] = [];
    for (let i = 0; i < source.length; i++) {
      const division = source[i];
      let item = this.converter.item.Convert(division);
      array.push(item);
    }
    return array;
  }
}
