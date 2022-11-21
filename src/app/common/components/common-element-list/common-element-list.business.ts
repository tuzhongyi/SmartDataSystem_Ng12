import { Injectable } from '@angular/core';
import { newGuid } from '../../tools/guid';
import {
  CommonElementListModel,
  ICommonElementListBusiness,
} from './common-element-list.model';

import * as uuid from 'uuid';

@Injectable()
export class CommonElementListBusiness implements ICommonElementListBusiness {
  constructor() {}

  async init() {
    console.log(newGuid());
    console.log(uuid.v4());

    let model = new CommonElementListModel();
    model.Id = uuid.v4();

    model.Name = '栲霓桤蛙区';

    model.Children = Array.from(Array(3), (v, i) => {
      let child = new CommonElementListModel();
      child.Id = newGuid();
      let unicode1 = Math.floor(Math.random() * (0x9fa5 - 0x4e00) + 0x4e00);
      let unicode2 = Math.floor(Math.random() * (0x9fa5 - 0x4e00) + 0x4e00);
      let unicode3 = Math.floor(Math.random() * (0x9fa5 - 0x4e00) + 0x4e00);
      child.Name = String.fromCodePoint(unicode1, unicode2, unicode3);
      return child;
    });
    return model;
  }
}
