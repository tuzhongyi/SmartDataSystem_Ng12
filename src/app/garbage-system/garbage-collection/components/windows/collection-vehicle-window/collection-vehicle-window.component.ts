import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Optional,
  Output,
  ViewChild,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CollectionDivisionTreeBusiness } from 'src/app/common/business/collection-division-tree.business';
import { CommonTreeSelecComponent } from 'src/app/common/components/common-tree-select/common-tree-select.component';
import {
  ToastWindowService,
  ToastWindowType,
} from 'src/app/common/components/toast-window/toast-window.service';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { CollectionDeviceStateCountType } from 'src/app/enum/collection-device-state.enum';
import { VehicleType } from 'src/app/enum/vehicle-type.enum';
import { Page } from 'src/app/network/model/page_list.model';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { CollectionVehicleWindowBusiness } from './collection-vehicle-window.business';
import { CollectionVehicleWindowConverter } from './collection-vehicle-window.converter';
import {
  CollectionVehicleWindowModel,
  ICollectionVehicleWindowSearchInfo,
} from './collection-vehicle-window.model';

@Component({
  selector: 'collection-vehicle-window',
  templateUrl: './collection-vehicle-window.component.html',
  styleUrls: ['./collection-vehicle-window.component.less'],
  providers: [
    {
      provide: CollectionVehicleWindowBusiness,
      useClass: CollectionVehicleWindowBusiness,
    },
    CollectionVehicleWindowConverter,
    CollectionDivisionTreeBusiness,
  ],
})
export class CollectionVehicleWindowComponent implements OnInit {
  CollectionDeviceStateCountType = CollectionDeviceStateCountType;
  VehicleType = VehicleType;

  @Output('position') clickMapEvent = new EventEmitter();

  @Output('route') clickLineEvent = new EventEmitter();

  @ViewChild(CommonTreeSelecComponent)
  commonTreeSelect!: CommonTreeSelecComponent;

  tdWidth = ['10%', '10%', '10%', '10%', '10%', '10%', '10%'];
  dataSource: CollectionVehicleWindowModel[] = [];

  // Paginator
  pagerCount: number = 4;

  page: Page = {
    PageIndex: 0,
    PageSize: 0,
    RecordCount: 0,
    TotalRecordCount: 0,
    PageCount: 0,
  };

  searchInfo: ICollectionVehicleWindowSearchInfo = {
    DivisionId: this._globalStorage.divisionId,
    PageIndex: 1,
    PageSize: 9,
    State: CollectionDeviceStateCountType.All,
    Condition: '',
    Type: '',
    PlatNo: '',
  };
  selectedNodes: CommonFlatNode[] = [];

  constructor(
    public collectionDivisionTreeBusiness: CollectionDivisionTreeBusiness,
    private _globalStorage: GlobalStorageService,
    private _business: CollectionVehicleWindowBusiness,
    @Optional() private _toastWindowService: ToastWindowService
  ) {
    // console.log(this._toastWindowService.data);
    let data = this._toastWindowService.data;
    if (data) {
      if (data.type) this.searchInfo.State = data.type;
      if (data.divisionId) this.searchInfo.DivisionId = data.divisionId;
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
  search() {
    this.searchInfo.PageIndex = 1;
    this._init();
  }
  clickMap(item: CollectionVehicleWindowModel, e: MouseEvent) {
    e.stopPropagation();

    this._toastWindowService.customEvent.emit({
      Type: ToastWindowType.ClickMap,
      Data: item.rawData,
      Component: CollectionVehicleWindowComponent,
      Close: true,
    });
    this.clickMapEvent.emit(item.rawData);
  }
  clickLine(item: CollectionVehicleWindowModel, e: MouseEvent) {
    this.clickLineEvent.emit(item.rawData);
    e.stopPropagation();

    this._toastWindowService.customEvent.emit({
      Type: ToastWindowType.ClickLine,
      Data: item.rawData,
      Component: CollectionVehicleWindowComponent,
      Close: true,
    });
  }
  selectTreeNode(nodes: CommonFlatNode[]) {
    // console.log('外部结果', nodes)
    this.commonTreeSelect.closeDropDown();
    this.selectedNodes = nodes;
    if (nodes.length > 0) {
      this.searchInfo.DivisionId = nodes[0].Id;
    } else {
      this.searchInfo.DivisionId = '';
    }
  }
}
