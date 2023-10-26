/*
 * @Author: pmx
 * @Date: 2021-10-11 13:11:58
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-22 14:06:36
 */
import { Component, OnInit } from '@angular/core';
import { IService } from 'src/app/business/Ibusiness';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { DivisionListBusiness } from './division-list.business';

@Component({
  selector: 'app-division-list',
  templateUrl: './division-list.component.html',
  styleUrls: ['./division-list.component.less'],
  providers: [
    {
      provide: DivisionListBusiness,
      useFactory: function (business: IService<Division>) {
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
  selectedId: string = '';

  constructor(
    private divisionListBusiness: DivisionListBusiness,
    private storeService: GlobalStorageService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }
  async loadData() {
    let divisionId = this.storeService.divisionId;
    this.currentDivision = await this.divisionListBusiness.get(divisionId);

    // console.log('currentDivision', this.currentDivision);

    this.childDivisions = await this.divisionListBusiness.listChildDivisions(
      divisionId
    );
    // console.log('child divisions ', this.childDivisions);
  }
  itemClick(division: Division | null) {
    // console.log(division);

    if (division) {
      this.selectedId = division.Id;
      this.storeService.divisionId = division.Id;
      this.storeService.divisionType = division.DivisionType;

      this.storeService.statusChange.emit();
    }
  }
}
