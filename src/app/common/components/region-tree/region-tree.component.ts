import { SelectionChange } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { Region } from 'src/app/network/model/region';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { CommonNestNode } from 'src/app/view-model/common-nest-node.model';
import { Deduplication } from '../../tools/deduplication';
import { CommonTreeComponent } from '../common-tree/common-tree.component';
import { RegionTreeBusiness } from './region-tree.business';

@Component({
  selector: 'howell-region-tree',
  templateUrl: './region-tree.component.html',
  styleUrls: ['./region-tree.component.less'],
  providers: [
    RegionTreeBusiness
  ]
})
export class RegionTreeComponent implements OnInit {

  private _condition: string | Symbol = Symbol.for('REGION-TREE');
  private _searchGuards: string[] = ['区域'];
  private _excludeGuards: string[] = [];

  dataSubject = new BehaviorSubject<CommonNestNode[]>([]);
  dataSource: CommonNestNode[] = [];
  holdStatus = true;

  @Input() showSearchBar = true;

  // 默认选中列表
  private _defaultIds: string[] = []
  @Input()
  set defaultIds(ids: string[]) {
    // 排除空字符串
    this._defaultIds = ids.filter(id => id);
  }
  get defaultIds() {
    return this._defaultIds;
  }

  @Output() selectTreeNode: EventEmitter<CommonFlatNode<Region>[]> = new EventEmitter<CommonFlatNode<Region>[]>();


  @ViewChild(CommonTreeComponent) tree?: CommonTreeComponent;


  constructor(private _business: RegionTreeBusiness, private _toastrService: ToastrService) {
    this._excludeGuards = Deduplication.generateExcludeArray(this._searchGuards)
  }

  ngOnInit(): void {
    this._init();
  }

  private async _init() {
    this.dataSource = await this._business.init();
    // console.log(this.dataSource)
    this.defaultIds = [this.dataSource[0].Id]
    this.dataSubject.next(this.dataSource)
  }
  selectTreeNodeHandler(change: SelectionChange<CommonFlatNode<any>>) {
    let nodes = change.source.selected;
    console.log('选中节点', nodes)

    this.selectTreeNode.emit(nodes);
  }


  async searchEventHandler(condition: string) {
    console.log('搜索字段', condition);
    if (this._condition == condition && this._condition != '') {
      this._toastrService.warning('重复搜索相同字段');
      return;
    }
    if (this._excludeGuards.includes(condition)) {
      this._toastrService.warning('关键字不能是: ' + condition);
      return;
    }

    this._condition = condition;

    let res = await this._business.searchNode(condition);
    console.log(res)
    if (res && res.length) {
      this._toastrService.success('操作成功');
      this.dataSource = res;
      this.defaultIds = [this.dataSource[0].Id]
      this.dataSubject.next(res);
      if (condition != '') {
        this.tree?.expandAll()
      } else {
        this.tree?.reset();
        this.tree?.collapseAll()
      }
    } else {
      this._toastrService.warning('无匹配结果');
    }

  }
}
