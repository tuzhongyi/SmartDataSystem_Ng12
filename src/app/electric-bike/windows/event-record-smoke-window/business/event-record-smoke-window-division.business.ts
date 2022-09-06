import { EventEmitter, Injectable } from '@angular/core';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { Division } from 'src/app/network/model/division.model';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { EventRecordSmokeWindowDivisionListConverter } from './event-record-smoke-window-division.converter';

@Injectable()
export class EventRecordSmokeWindowDivisionBusiness
  implements IBusiness<Division[], SelectItem[]>
{
  constructor(
    private local: LocalStorageService,
    private service: DivisionRequestService
  ) {}
  Converter: IConverter<Division[], SelectItem[]> =
    new EventRecordSmokeWindowDivisionListConverter();
  subscription?: ISubscription | undefined;
  loading?: EventEmitter<void> | undefined;
  async load(divisionId?: string): Promise<SelectItem[]> {
    if (!divisionId) {
      if (this.local.user.Resources && this.local.user.Resources.length > 0) {
        divisionId = this.local.user.Resources[0].Id;
      }
    }
    let data = await this.getData(divisionId);
    let model = this.Converter.Convert(data);
    return model;
  }
  async getData(parentId?: string): Promise<Division[]> {
    let params = new GetDivisionsParams();
    if (parentId) {
      params.ParentId = parentId;
    }
    let paged = await this.service.list(params);
    return paged.Data;
  }
}
