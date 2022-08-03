import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { Page } from 'src/app/network/model/page_list.model';
import { IllegalDropTotalModel, IllegalDropTotalSearchInfo } from 'src/app/view-model/illegal-drop-total.model';
import { TableColumnModel } from 'src/app/view-model/table.model';
import { IllegalDropTotalBusiness } from './illegal-drop-total.business';
import { IllegalDropTotalConf } from './illegal-drop-total.config';


@Component({
  selector: 'howell-illegal-drop-total',
  templateUrl: './illegal-drop-total.component.html',
  styleUrls: ['./illegal-drop-total.component.less'],
  providers: [
    IllegalDropTotalBusiness
  ]
})
export class IllegalDropTotalComponent implements OnInit {

  /**private */
  private _pageSize = 9;


  // Table
  dataSubject = new BehaviorSubject<IllegalDropTotalModel[]>([]);
  selectStrategy = SelectStrategy.Single;
  columnModel: TableColumnModel[] = [...IllegalDropTotalConf]; // 表格列配置详情
  displayedColumns: string[] = this.columnModel.map((model) => model.columnDef); // 表格列 id


  // Paginator
  page: Page | null = null;
  pagerCount: number = 4;
  pageIndex = 1;

  searchInfo: IllegalDropTotalSearchInfo = {
    resourceType: UserResourceType.None
  }


  constructor(private _business: IllegalDropTotalBusiness) { }

  ngOnInit(): void {
    this._init();
  }
  private async _init() {
    let res = await this._business.init(this.searchInfo, this.pageIndex, this._pageSize);
    console.log(res);
    this.dataSubject.next(res.Data);
  }

}
