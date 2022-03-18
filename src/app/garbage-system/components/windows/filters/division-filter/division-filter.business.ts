import { EventEmitter, Injectable } from '@angular/core';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { SelectItemConverter } from 'src/app/converter/select-item.converter';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { Division } from 'src/app/network/model/division.model';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';

@Injectable()
export class DivisionFilterBusiness
  implements IBusiness<Division[], SelectItem[]>
{
  constructor(private divisionService: DivisionRequestService) { }
  Converter: IConverter<Division[], SelectItem[]> =
    new DivisionFilterConverter();
  subscription?: ISubscription | undefined;
  loading?: EventEmitter<void> | undefined;
  async load(
    divisionType: DivisionType,
    parentId?: string
  ): Promise<SelectItem[]> {
    let data = await this.getData(divisionType, parentId);
    ;
    let model = this.Converter.Convert(data);
    return model;
  }
  async getData(
    divisionType: DivisionType,
    parentId?: string
  ): Promise<Division[]> {
    let params = new GetDivisionsParams();
    params.DivisionType = divisionType;
    params.ParentId = parentId;
    let paged = await this.divisionService.cache.list(params);
    return paged.Data;
  }
}

class DivisionFilterConverter implements IConverter<Division[], SelectItem[]> {
  converter = {
    item: new SelectItemConverter(),
  };
  Convert(source: Division[]): SelectItem[] {
    let array: SelectItem[] = [];
    for (let i = 0; i < source.length; i++) {
      const division = source[i];
      let item = this.converter.item.Convert(division);
      array.push(item);
    }
    return array;
  }
}
