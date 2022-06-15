import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DivisionsUrl } from 'src/app/network/url/aiop/Garbage-management/divisions.url';
import { PlatformManageModel } from 'src/app/view-model/platform-manage.model';
import { TableColumnModel } from 'src/app/view-model/table.model';
import { PlatformManageConf } from './platform-manage.config';
import { PlatformManageBusiness } from './platform-manage.business';

@Component({
  selector: 'howell-platform-manage',
  templateUrl: './platform-manage.component.html',
  styleUrls: ['./platform-manage.component.less'],
  providers: [
    PlatformManageBusiness
  ]
})
export class PlatformManageComponent implements OnInit {
  /**private */
  private _pageSize = 9;
  private _pageIndex = 1;


  dataSource: PlatformManageModel[] = [];

  dataSubject = new BehaviorSubject<PlatformManageModel[]>([]);


  columnModel: TableColumnModel[] = [...PlatformManageConf]; // 表格列配置详情
  displayedColumns: string[] = this.columnModel.map((model) => model.columnDef); // 表格列 id


  constructor(private _business: PlatformManageBusiness) { }

  async ngOnInit() {
    let res = await this._business.loadData(this._pageIndex,
      this._pageSize)

    console.log(res)

    this.dataSubject.next(res.Data)
  }

}
