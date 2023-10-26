import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';

import { Division } from 'src/app/network/model/garbage-station/division.model';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { ILevelListNode } from '../level-list-panel/level-list-panel.model';

@Injectable()
export class LevelDivisionPanelBusiness
  implements IBusiness<Division[], ILevelListNode[]>
{
  constructor(
    private service: DivisionRequestService,
    private global: GlobalStorageService
  ) {}

  Converter = new Converter();

  async load(parent?: ILevelListNode): Promise<ILevelListNode[]> {
    let parentId = parent?.Id;
    if (!parentId) {
      parentId = this.global.divisionId;
    }
    let data = await this.getData(parentId);
    let model = this.Converter.Convert(data);
    if (parent && parent.ParentId) {
      model.unshift({
        Id: parent.ParentId,
        Name: parent.Name,
        Language: '上一级',
      });
    }
    return model;
  }
  async getData(parentId?: string): Promise<Division[]> {
    let params = new GetDivisionsParams();
    params.ParentId = parentId;
    let paged = await this.service.list(params);
    return paged.Data;
  }
}

class Converter implements IConverter<Division[], ILevelListNode[]> {
  Convert(source: Division[], ...res: any[]): ILevelListNode[] {
    return source;
  }
}
