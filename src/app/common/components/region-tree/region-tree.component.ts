import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { Deduplication } from '../../tools/deduplication';
import { CommonTree } from '../common-tree/common-tree';
import { CommonTreeComponent } from '../common-tree/common-tree.component';
import { RegionTreeBusiness } from './region-tree.business';

@Component({
  selector: 'howell-region-tree',
  templateUrl: './region-tree.component.html',
  styleUrls: ['./region-tree.component.less'],
  providers: [RegionTreeBusiness],
})
export class RegionTreeComponent extends CommonTree implements OnInit {
  private _condition: string = '';
  private _searchGuards: string[] = ['区域'];
  private _excludeGuards: string[] = [];

  @Input() holdStatus = true;

  @Input() showSearchBar = true;

  // 第一个节点被选中
  @Input() selectOnFirst = true;

  // 默认选中列表
  private _defaultIds: string[] = [];
  @Input()
  set defaultIds(ids: string[]) {
    // 排除空字符串
    this._defaultIds = ids.filter((id) => id);
  }
  get defaultIds() {
    return this._defaultIds;
  }

  @Output() selectTreeNode: EventEmitter<CommonFlatNode[]> = new EventEmitter<
    CommonFlatNode[]
  >();

  @ViewChild(CommonTreeComponent) tree?: CommonTreeComponent;

  constructor(
    private _business: RegionTreeBusiness,
    private _toastrService: ToastrService
  ) {
    super();
    this._excludeGuards = Deduplication.generateExcludeArray(
      this._searchGuards
    );
  }

  ngOnInit(): void {
    this._init();
  }

  private async _init() {
    this._nestedNodeMap = this._business.nestedNodeMap;

    let res = await this._business.init(this._condition);
    if (res.length > 0 && this.selectOnFirst) this.defaultIds = [res[0].Id];
    this.dataSubject.next(res);
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
    // console.log(res)
    if (res && res.length) {
      this._toastrService.success('操作成功');
      if (res.length && this.selectOnFirst) this.defaultIds = [res[0].Id];
      this.dataSubject.next(res);
      if (condition != '') {
        this.tree?.expandAll();
      } else {
        this.tree?.reset();
        this.tree?.collapseAll();
      }
    } else {
      this._toastrService.warning('无匹配结果');
    }
  }
  setDefault() {
    if (this.dataSubject.value.length)
      this.defaultIds = [this.dataSubject.value[0].Id];
  }
}
