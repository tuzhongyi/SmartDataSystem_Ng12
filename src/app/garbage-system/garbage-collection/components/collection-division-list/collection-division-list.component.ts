/*
 * @Author: pmx
 * @Date: 2021-10-11 13:11:58
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-02 10:51:46
 */
import { Component, OnInit } from '@angular/core';
import { IService } from 'src/app/business/Ibusiness';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { GlobalStoreService } from 'src/app/common/service/global-store.service';
import { Division } from 'src/app/network/model/division.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GarbageVehiclesDivisionListBusiness } from './collection-division-list.business';

@Component({
  selector: 'collection-division-list',
  templateUrl: './collection-division-list.component.html',
  styleUrls: ['./collection-division-list.component.less'],
  providers: [
    {
      provide: GarbageVehiclesDivisionListBusiness,
      useFactory: function (business: IService<Division>) {
        return new GarbageVehiclesDivisionListBusiness(business);
      },
      deps: [DivisionRequestService],
    },
  ],
})
export class GarbageCollectionDivisionListComponent implements OnInit {
  // 显式声明null类型，表示类实例一定有该属性
  currentDivision: Division | null = null;
  childDivisions: Division[] | null = null;
  selectedId: string = '';

  constructor(
    private divisionListBusiness: GarbageVehiclesDivisionListBusiness,
    private storeService: GlobalStoreService
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
