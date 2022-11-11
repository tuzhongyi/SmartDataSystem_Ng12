/*
 * @Author: pmx
 * @Date: 2021-10-11 13:11:58
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-02 10:51:46
 */
import { Component, OnInit } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Division } from 'src/app/network/model/division.model';
import { GarbageVehiclesDivisionListBusiness } from './collection-division-list.business';

@Component({
  selector: 'collection-division-list',
  templateUrl: './collection-division-list.component.html',
  styleUrls: ['./collection-division-list.component.less'],
  providers: [GarbageVehiclesDivisionListBusiness],
})
export class GarbageCollectionDivisionListComponent implements OnInit {
  parentDivision: Division | null = null;

  constructor(
    private _business: GarbageVehiclesDivisionListBusiness,
    private _globalStorage: GlobalStorageService
  ) {}

  ngOnInit(): void {
    this._init();
  }

  private async _init() {
    let id = this._globalStorage.divisionId;
    let division = await this._business.getDivision(id);

    console.log(division);
  }
}
