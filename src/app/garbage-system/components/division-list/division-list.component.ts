/*
 * @Author: pmx
 * @Date: 2021-10-11 13:11:58
 * @Last Modified by: pmx
 * @Last Modified time: 2021-10-13 13:54:32
 */
import { Component, OnInit } from '@angular/core';
import { IBusiness } from 'src/app/business/Ibusiness';
import { LocalStorageService } from 'src/app/global/service/local-storage.service';
import { StoreService } from 'src/app/global/service/store.service';
import { Division } from 'src/app/network/model/division.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { DivisionListBusiness } from './division-list.business';

@Component({
  selector: 'app-division-list',
  templateUrl: './division-list.component.html',
  styleUrls: ['./division-list.component.less'],
  providers: [
    {
      provide: DivisionListBusiness,
      useFactory: function (business: IBusiness<Division>) {
        return new DivisionListBusiness(business);
      },
      deps: [DivisionRequestService],
    },
  ],
})
export class DivisionListComponent implements OnInit {
  // 显式声明null类型，表示类实例一定有该属性
  currentDivision: Division | null = null;
  childDivisions: Division[] | null = null;

  constructor(
    private _divisionListBusiness: DivisionListBusiness,
    private _localStorageService: LocalStorageService,
    private _storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }
  async loadData() {
    let divisionId = this._storeService.divisionId;
    this.currentDivision = await this._divisionListBusiness.get(divisionId);

    console.log('currentDivision', this.currentDivision);

    this.childDivisions = await this._divisionListBusiness.listChildDivisions(
      divisionId
    );
    console.log('child divisions ', this.childDivisions);
  }
  itemClick(division: Division | null) {
    console.log(division);
    if (division) {
      this._storeService.divisionId = division.Id;
      this._storeService.divisionType = division.DivisionType;

      this._storeService.statusChange.emit();
    }
  }
}
