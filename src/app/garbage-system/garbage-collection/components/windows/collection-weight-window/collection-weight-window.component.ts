import {
  Component,
  EventEmitter,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ToastWindowService } from 'src/app/common/components/toast-window/toast-window.service';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Time } from 'src/app/common/tools/time';
import { Page } from 'src/app/network/model/page_list.model';
import { GarbageCollectionIndexComponent } from '../../collection-index/collection-index.component';
import { CollectionWeightWindowBusiness } from './collection-weight-window.business';
import { CollectionWeightWindowConverter } from './collection-weight-window.converter';
import {
  CollectionWeightWindowModel,
  ICollectionWeightWindowSearchInfo,
} from './collection-weight-window.model';

@Component({
  selector: 'collection-weight-window',
  templateUrl: './collection-weight-window.component.html',
  styleUrls: ['./collection-weight-window.component.less'],
  providers: [CollectionWeightWindowBusiness, CollectionWeightWindowConverter],
})
export class CollectionWeightWindowComponent implements OnInit {
  @Output() clickEvent = new EventEmitter();

  tdWidth = ['10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%'];
  dataSource: CollectionWeightWindowModel[] = [];
  // Paginator
  pagerCount: number = 4;

  page: Page = {
    PageIndex: 0,
    PageSize: 0,
    RecordCount: 0,
    TotalRecordCount: 0,
    PageCount: 0,
  };

  searchInfo: ICollectionWeightWindowSearchInfo = {
    DivisionIds: [this._globalStorage.divisionId],
    PageIndex: 1,
    PageSize: 9,
    Condition: '',
    BeginTime: Time.beginTime(Date.now()),
    EndTime: Time.endTime(Date.now()),
  };

  constructor(
    private _globalStorage: GlobalStorageService,
    private _business: CollectionWeightWindowBusiness,
    @Optional() private _toastWindowService: ToastWindowService
  ) {
    let data = this._toastWindowService.data;
    if (data) {
      if (data.divisionIds) this.searchInfo.DivisionIds = data.divisionIds;
    }
  }
  ngOnInit(): void {
    this._init();
  }
  private async _init() {
    let res = await this._business.init(this.searchInfo);

    this.dataSource = res.Data;
    this.page = res.Page;
  }
  pageEvent(pageInfo: PageEvent) {
    if (this.searchInfo.PageIndex == pageInfo.pageIndex + 1) return;
    this.searchInfo.PageIndex = pageInfo.pageIndex + 1;

    this._init();
  }
  searchEvent(condition: string) {
    this.searchInfo.Condition = condition;
    this.searchInfo.PageIndex = 1;
    this._init();
  }

  clickItem(item: CollectionWeightWindowModel) {
    this.clickEvent.emit(item);
  }
}
