import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RegionTreeComponent } from 'src/app/common/components/region-tree/region-tree.component';
import { RegionTreeSource } from 'src/app/converter/label-tree.converter';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { ResourceType } from 'src/app/enum/resource-type.enum';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { RegionNode } from 'src/app/network/model/garbage-station/region';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { CommonNestNode } from 'src/app/view-model/common-nest-node.model';

import { RegionNodeMatchBusiness } from './region-node-match.business';
import {
  RegionNodeMatchSearch,
  RegionNodeResourceModel,
} from './region-node-match.model';

@Component({
  selector: 'region-node-match',
  templateUrl: './region-node-match.component.html',
  styleUrls: ['./region-node-match.component.less'],
  providers: [RegionNodeMatchBusiness],
})
export class RegionNodeMatchComponent implements OnInit {
  // 摄像机选中池
  selection = new SelectionModel<RegionNodeResourceModel>(true);

  // 区域选中池
  treeNodes: CommonFlatNode<RegionTreeSource>[] = [];

  // 区域原始数据
  rawNodes: CommonNestNode[] = [];

  // 区域树单选、多选
  selectStrategy = SelectStrategy.Single;

  // 禁用节点类型
  disableItemType = RegionTreeItemType.RegionNode;

  condition: string = '';

  highLight = (model: RegionNodeResourceModel) => {
    return this.selection.isSelected(model);
  };

  MatchState = MatchState;

  state = MatchState.Add;

  searchInfo: RegionNodeMatchSearch = {
    Name: '',
  };

  //  拉取到的所有 Resource
  allResource: RegionNodeResourceModel[] = [];

  // 根据
  dataSource: RegionNodeResourceModel[] = [];

  load: EventEmitter<void> = new EventEmitter();
  loaded: EventEmitter<void> = new EventEmitter();

  @ViewChild('regionTree') regionTree!: RegionTreeComponent;

  constructor(
    private _business: RegionNodeMatchBusiness,
    private _toastrService: ToastrService
  ) {}

  ngOnInit() {
    this._init();
  }

  private async _init() {
    this.allResource = await this._business.listResource(this.searchInfo);
  }
  changeToDelete() {
    this.state = MatchState.Delete;
    this.selectStrategy = SelectStrategy.Multiple;
  }
  changeToCreate() {
    this.state = MatchState.Add;
    this.treeNodes = [];
    this.selectStrategy = SelectStrategy.Single;
  }
  selectResource(model: RegionNodeResourceModel) {
    this.selection.toggle(model);
  }

  tableSelect(type: TableSelectStateEnum) {
    switch (type) {
      case TableSelectStateEnum.All:
        this.selection.select(...this.dataSource);
        break;
      case TableSelectStateEnum.Reverse:
        this.dataSource.forEach((model) => this.selection.toggle(model));

        break;
      case TableSelectStateEnum.Cancel:
        this.selection.clear();

        break;
      default:
        throw new TypeError('类型错误');
    }
  }

  onTreeLoaded(nodes: CommonNestNode[]) {
    this.rawNodes = nodes;

    this._updateDataSource();
  }
  selectRegionTreeNode(nodes: CommonFlatNode<RegionTreeSource>[]) {
    console.log('区域树', nodes);
    this.treeNodes = nodes;
  }
  searchEventHandler(condition: string) {
    console.log(condition);
    this.searchInfo.Name = condition;

    this._init();
  }

  async createRegionNode() {
    if (this.selection.isEmpty()) {
      this._toastrService.error('请选择摄像机');
      return;
    }
    if (!this.treeNodes.length) {
      this._toastrService.error('请选择一个区域');
      return;
    }
    let region = this.treeNodes[0];
    let promiseArr: Promise<any>[] = [];
    for (let i = 0; i < this.selection.selected.length; i++) {
      let resource = this.selection.selected[i];
      let regionNode = new RegionNode();
      regionNode.Id = '';
      regionNode.Name = resource.Name;
      regionNode.RegionId = region.Id;
      regionNode.ResourceId = resource.Id;
      regionNode.ResourceType = resource.ResourceType;
      if (resource.ResourceType == ResourceType.Camera) {
        regionNode.NodeType = EnumHelper.ConvertCameraTypeToNodeType(
          resource.DetailType
        );
      }
      promiseArr.push(this._business.addRegionNode(regionNode));
    }
    let res = await Promise.all(promiseArr);
    console.log(res);
    if (res) {
      this._toastrService.success('创建成功');

      let chunked = [];
      for (let i = 0; i < this.dataSource.length; i++) {
        let data = this.dataSource[i];
        if (!this.selection.isSelected(data)) {
          chunked.push(data);
        }
      }
      this.dataSource = chunked;

      this.selection.clear();

      this.load.emit();
    }
  }
  async deleteRegionNode() {
    let promiseArr: Promise<any>[] = [];

    if (!this.treeNodes.length) {
      this._toastrService.error('无监控点可删除');
      return;
    }
    for (let i = 0; i < this.treeNodes.length; i++) {
      let node = this.treeNodes[i];
      let rawData = node.RawData;

      if (rawData instanceof RegionNode) {
        promiseArr.push(
          this._business.deleteRegionNode(rawData.RegionId, rawData.Id)
        );
      }
    }
    if (promiseArr.length) {
      let res = await Promise.all(promiseArr);
      if (res) {
        this._toastrService.success('删除成功');
        this.treeNodes = [];
        this.load.emit();
      }
    } else {
      this._toastrService.error('无监控点可删除');
    }
  }

  private _updateDataSource() {
    console.time('label');

    let arr = Array.from(this.allResource);
    for (let i = 0; i < this.rawNodes.length; i++) {
      let node = this.rawNodes[i];
      if (node.RawData instanceof CameraRegionNode) {
        let camera = node.RawData.camera;
        if (camera) {
          // console.log(camera);
          let index = arr.findIndex((resource) => resource.Id == camera!.Id);
          if (index != -1) {
            arr.splice(index, 1);
          }
        }
      }
    }
    console.log('sdffffffffffff', arr);
    this.dataSource = arr;
    console.timeEnd('label');
  }
}

enum MatchState {
  Add = 0,
  Delete = 1,
}
