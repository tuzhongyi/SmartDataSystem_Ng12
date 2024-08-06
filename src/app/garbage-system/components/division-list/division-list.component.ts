/*
 * @Author: pmx
 * @Date: 2021-10-11 13:11:58
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-22 14:06:36
 */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { DivisionListBusiness } from './division-list.business';
import { DivisionListModel } from './division-list.model';

@Component({
  selector: 'app-division-list',
  templateUrl: './division-list.component.html',
  styleUrls: ['./division-list.component.less'],
  providers: [DivisionListBusiness],
})
export class DivisionListComponent implements OnInit {
  @Output() info = new EventEmitter<Division>();

  constructor(
    private business: DivisionListBusiness,
    private storeService: GlobalStorageService
  ) {}

  selectedId: string = '';
  model: DivisionListModel = new DivisionListModel();

  ngOnInit(): void {
    this.loadData();
  }
  async loadData() {
    let divisionId = this.storeService.division.selected.Id;
    this.business.load(divisionId).then((model) => {
      this.model = model;
    });
  }

  divisionclick(data?: Division) {
    if (data) {
      this.selectedId = data.Id;
      this.storeService.division.setSelected(data);
    }
  }

  async statisticclick(data?: DivisionNumberStatistic) {
    // console.log(division);

    if (data) {
      let division = await this.business.get(data.Id);
      this.divisionclick(division);
    }
  }

  oninfo() {
    this.info.emit(this.model.current);
  }
}
