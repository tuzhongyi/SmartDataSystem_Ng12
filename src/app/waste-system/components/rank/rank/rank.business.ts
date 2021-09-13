import { Injectable } from '@angular/core';
import { DivisionRequestService } from 'src/app/request/division/division-request.service';
import { IRankConverter } from '../../../../Converter/IRankconverter.interface';

@Injectable()
export class RankBusiness {
  private _listData: any = [];

  constructor() {
    // private rankConverter: IRankConverte
  }

  async list() {
    // let data = await this.rankConverter.toRank();
    // console.log(data);
  }
}
