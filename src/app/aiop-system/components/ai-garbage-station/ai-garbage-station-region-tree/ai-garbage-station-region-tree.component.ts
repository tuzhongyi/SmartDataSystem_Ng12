import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonTree } from 'src/app/common/components/common-tree/common-tree';
import { CommonTreeComponent } from 'src/app/common/components/common-tree/common-tree.component';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { AIGarbageRegionTreeBusiness } from './ai-garbage-station-region-tree.business';
import { AIGarbageStationRegionTreeConverter } from './ai-garbage-station-region-tree.converter';
import { AIGarbageRegionTreeService } from './ai-garbage-station-region-tree.service';
@Component({
  selector: 'hw-ai-garbage-station-region-tree',
  templateUrl: './ai-garbage-station-region-tree.component.html',
  providers: [
    AIGarbageRegionTreeService,
    AIGarbageStationRegionTreeConverter,
    AIGarbageRegionTreeBusiness,
  ],
})
export class AIGarbageRegionTreeComponent extends CommonTree implements OnInit {
  private _condition: string = '';

  @Input()
  selectStrategy = SelectStrategy.Multiple;

  // 默认选中列表
  @Input()
  defaultIds: string[] = [];
  @Input() onlyDivisionNode: boolean = true;

  @Input() showSearchBar = true;

  @Output() selectTreeNode: EventEmitter<CommonFlatNode[]> = new EventEmitter<
    CommonFlatNode[]
  >();

  @ViewChild(CommonTreeComponent) override tree?: CommonTreeComponent;

  constructor(
    private _business: AIGarbageRegionTreeBusiness,
    private _toastrService: ToastrService
  ) {
    super();
  }

  loaded: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void {
    this._init();
  }
  private async _init() {
    this._nestedNodeMap = this._business.nestedNodeMap;

    let res = await this._business.init(this._condition, this.onlyDivisionNode);
    this.dataSubject.next(res);
    this.loaded.emit();
  }
  async searchEventHandler(condition: string) {
    if (this._condition == condition && this._condition != '') {
      this._toastrService.warning('重复搜索相同字段');
      return;
    }

    this._condition = condition;

    let res = await this._business.searchNode(condition, this.onlyDivisionNode);
    if (res && res.length) {
      this._toastrService.success('操作成功');

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
}
