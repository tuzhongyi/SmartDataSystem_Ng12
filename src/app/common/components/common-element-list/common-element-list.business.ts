import { Injectable } from '@angular/core';
import {
  CommonElementListModel,
  ICommonElementListBusiness,
} from './common-element-list.model';

import { Guid } from '../../tools/guid';

@Injectable()
export class CommonElementListBusiness implements ICommonElementListBusiness {
  constructor() {}

  async init() {
    let model = new CommonElementListModel();
    model.Id = Guid.NewGuid().ToString('N');

    model.Name = '上海市';

    model.Children = Array.from(Array(3), (v, i) => {
      let child = new CommonElementListModel();
      child.Id = Guid.NewGuid().ToString('N');
      let unicode1 = Math.floor(Math.random() * (0x9fa5 - 0x4e00) + 0x4e00);
      let unicode2 = Math.floor(Math.random() * (0x9fa5 - 0x4e00) + 0x4e00);
      let unicode3 = Math.floor(Math.random() * (0x9fa5 - 0x4e00) + 0x4e00);
      child.Name = String.fromCodePoint(unicode1, unicode2, unicode3);
      return child;
    });
    return model;
  }
}
