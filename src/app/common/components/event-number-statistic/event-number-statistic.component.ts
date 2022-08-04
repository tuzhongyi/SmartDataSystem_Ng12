import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject } from 'rxjs';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { Page } from 'src/app/network/model/page_list.model';
import { EventNumberStatisticModel, EventNumberStatisticSearchInfo } from 'src/app/view-model/illegal-drop-total.model';
import { TableColumnModel } from 'src/app/view-model/table.model';
import { GlobalStoreService } from '../../service/global-store.service';
import { Language } from '../../tools/language';
import { SelectItem } from '../select-control/select-control.model';
import { IllegalDropTotalBusiness } from './event-number-statistic.business';
import { IllegalDropStatisticConf } from './event-number-statistic.config';


@Component({
  selector: 'event-number-statistic',
  templateUrl: './event-number-statistic.component.html',
  styleUrls: ['./event-number-statistic.component.less'],
  providers: [
    IllegalDropTotalBusiness
  ]
})
export class EventNumberStatisticComponent implements OnInit {

  /**private */
  private _pageSize = 9527;


  @Input()
  ResourceId: string = '310109000000';

  // 虹口区: 310109000000
  // 欧阳路街道: 310109009000

  // 当前区划等级
  @Input()
  userResourceType: UserResourceType = UserResourceType.City;


  // Table
  dataSubject = new BehaviorSubject<EventNumberStatisticModel[]>([]);
  selectStrategy = SelectStrategy.Single;
  columnModel: TableColumnModel[] = [...IllegalDropStatisticConf]; // 表格列配置详情
  displayedColumns: string[] = this.columnModel.map((model) => model.columnDef); // 表格列 id


  // Paginator
  page: Page | null = null;
  pagerCount: number = 4;
  pageIndex = 1;

  searchInfo: EventNumberStatisticSearchInfo = {
    ResourceType: UserResourceType.None,
    ResourceId: this.ResourceId
  }
  // 

  // 行政区列表
  options: SelectItem[] = [];

  constructor(private _business: IllegalDropTotalBusiness, private _globalStore: GlobalStoreService) { }

  ngOnInit(): void {
    this._initUserResourceType();
    if (this.options.length) {
      this.searchInfo.ResourceType = this.options[2].value;
    }
    this._init();

  }
  private async _init() {
    let res = await this._business.init(this.searchInfo, this.pageIndex, this._pageSize);
    console.log(res);
    this.page = res.Page;
    this.dataSubject.next(res.Data);
  }

  pageEvent(pageInfo: PageEvent) {
    if (this.pageIndex == pageInfo.pageIndex + 1) return;
    this.pageIndex = pageInfo.pageIndex + 1;
    this._init();
  }
  private _initUserResourceType() {
    let type: UserResourceType = this.userResourceType;

    do {
      type = EnumHelper.GetResourceChildType(type);
      this.options.push(
        new SelectItem(
          type.toString(),
          type,
          Language.UserResourceType(type)
        )
      );
    } while (type != UserResourceType.Station)

    // console.log(this.options)
  }
}

// {
//   "Id": "0af2654c-8716-48ca-bc18-0ae1f24857db",
//   "Username": "admin",
//   "Password": null,
//   "PasswordHash": null,
//   "PasswordSalt": null,
//   "FirstName": null,
//   "LastName": null,
//   "Gender": 1,
//   "MobileNo": null,
//   "Email": null,
//   "Note": null,
//   "ExpiredTime": "2099-01-01T07:00:56.000Z",
//   "CreateTime": "2019-03-06T07:01:12.000Z",
//   "UpdateTime": "2019-06-21T07:06:13.645Z",
//   "State": 0,
//   "Role": [
//       {
//           "Id": "c245dfa9-ff65-43cc-9187-2e1d4cef6f84",
//           "Name": "管理员",
//           "CreateTime": "2019-03-06T15:40:12",
//           "UpdateTime": "2019-03-06T15:40:16",
//           "PrivacyData": 1,
//           "UserData": 1,
//           "StaticData": 1,
//           "PictureData": 1,
//           "Resources": [],
//           "ServerId": null
//       }
//   ],
//   "OpenId": null,
//   "Resources": [
//       {
//           "Id": "310110000000",
//           "Name": "杨浦区",
//           "ResourceType": 4,
//           "RoleFlags": 0,
//           "AllSubResources": true,
//           "Resources": []
//       }
//   ],
//   "ServerId": null,
//   "CanCreateWeChatUser": null,
//   "CreatorId": null,
//   "OffEvents": [],
//   "UserType": null,
//   "RandomPassword": null,
//   "RandomPasswordExpiredTime": null
// }
