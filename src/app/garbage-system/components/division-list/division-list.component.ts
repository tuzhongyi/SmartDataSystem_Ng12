/*
 * @Author: pmx
 * @Date: 2021-10-11 13:11:58
 * @Last Modified by: pmx
 * @Last Modified time: 2021-11-09 09:44:40
 */
import { Component, OnInit } from '@angular/core';
import { IService } from 'src/app/business/Ibusiness';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Division } from 'src/app/network/model/division.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { DivisionListBusiness } from './division-list.business';
import { ElementListConverter } from 'src/app/converter/element-list.converter';

@Component({
  selector: 'app-division-list',
  templateUrl: './division-list.component.html',
  styleUrls: ['./division-list.component.less'],
  providers: [DivisionListBusiness],
})
export class DivisionListComponent implements OnInit {
  constructor(public business: DivisionListBusiness) {}

  ngOnInit(): void {}

  itemClick(division: Division) {
    this.business.notifyMessage(division);
  }
}
