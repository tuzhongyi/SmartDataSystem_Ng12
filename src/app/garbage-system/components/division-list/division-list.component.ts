/*
 * @Author: pmx
 * @Date: 2021-10-11 13:11:58
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-21 17:00:26
 */
import { Component, OnInit } from '@angular/core';
import { IService } from 'src/app/business/Ibusiness';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Division } from 'src/app/network/model/division.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { DivisionListBusiness } from './division-list.business';
import { CommonElementListModel } from 'src/app/common/components/common-element-list/common-element-list.model';

@Component({
  selector: 'app-division-list',
  templateUrl: './division-list.component.html',
  styleUrls: ['./division-list.component.less'],
  providers: [DivisionListBusiness],
})
export class DivisionListComponent implements OnInit {
  constructor(public business: DivisionListBusiness) {}

  ngOnInit(): void {}

  itemClick(model: CommonElementListModel) {
    if (model.RawData && model.RawData instanceof Division)
      this.business.notifyMessage(model.RawData);
  }
}
