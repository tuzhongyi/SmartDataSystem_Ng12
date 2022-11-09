/*
 * @Author: pmx
 * @Date: 2022-11-09 09:56:20
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-09 10:02:06
 */
import { Injectable } from '@angular/core';
import { CollectionPointRequestService } from 'src/app/network/request/collection-point/collection-point.service';

@Injectable()
export class CollectionScoreRankBusiness {
  constructor(private _collectionPointRequest: CollectionPointRequestService) {}

  init() {}
  private _list() {}
}
