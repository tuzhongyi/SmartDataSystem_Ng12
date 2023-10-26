import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { DivisionModel } from 'src/app/view-model/garbage-station.model';

@Injectable({
  providedIn: 'root',
})
export class DivisionModelConverter
  implements
    IConverter<Division | Promise<Division>, DivisionModel | Promise<Division>>
{
  constructor(private service: DivisionRequestService) {}

  Convert(source: Division): DivisionModel;
  Convert(source: Promise<Division>): Promise<DivisionModel>;

  Convert(
    source: Division | Promise<Division>,
    ...res: any[]
  ): DivisionModel | Promise<Division> {
    if (source instanceof Division) {
      let plain = instanceToPlain(source);
      let model = plainToInstance(DivisionModel, plain);
      if (source.ParentId) {
        model.Parent = this.service.cache.get(source.ParentId).then((x) => {
          return this.Convert(x);
        });
      }
      return model;
    } else {
      return source.then((x) => {
        return this.Convert(x);
      });
    }
  }
}
