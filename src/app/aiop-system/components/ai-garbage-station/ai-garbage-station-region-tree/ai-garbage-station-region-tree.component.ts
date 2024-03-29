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
import { CommonNestNode } from 'src/app/view-model/common-nest-node.model';
import { AIGarbageRegionTreeBusiness } from './ai-garbage-station-region-tree.business';
import { AIGarbageStationRegionTreeConverter } from './ai-garbage-station-region-tree.converter';
import {
  AIGarbageRegionTreeArgs,
  TreeSourceType,
} from './ai-garbage-station-region-tree.model';
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
  @Input() selectStrategy = SelectStrategy.Single;

  // 默认选中列表
  @Input() defaultIds: string[] = [];

  @Input() showSearchBar = true;

  public get regionNode(): boolean {
    return this.args.showRegion;
  }
  @Input()
  public set regionNode(v: boolean) {
    this.args.showRegion = v;
  }

  public get deviceNode(): boolean {
    return this.args.showDevice;
  }
  @Input()
  public set deviceNode(v: boolean) {
    this.args.showDevice = v;
  }

  @Output() selectTreeNode: EventEmitter<CommonFlatNode[]> = new EventEmitter<
    CommonFlatNode[]
  >();

  @Output()
  loaded: EventEmitter<CommonNestNode<TreeSourceType>[]> = new EventEmitter();

  constructor(
    private business: AIGarbageRegionTreeBusiness,
    private converter: AIGarbageStationRegionTreeConverter,
    private toastr: ToastrService
  ) {
    super();
  }
  @ViewChild(CommonTreeComponent) tree?: CommonTreeComponent;
  inited = new EventEmitter();
  args = new AIGarbageRegionTreeArgs();

  ngOnInit(): void {
    if (this.deviceNode) {
      this.regionNode = true;
    }
    this.dataSubject.subscribe((res) => {
      this.loaded.emit(res);
    });
    this.init();
  }
  private async init() {
    this.nodes.clear();
    let datas = await this.business.load(this.args);
    let nodes = this.converter.buildNestTree<TreeSourceType>(datas);
    this.dataSubject.next(nodes);
  }
  async onsearch(name: string) {
    if (this.args.name == name && this.args.name != '') {
      this.toastr.warning('重复搜索相同字段');
      return;
    }

    this.args.name = name;
    this.nodes.clear();
    let datas = await this.business.load(this.args);
    if (datas && datas.length) {
      this.toastr.success('操作成功');
      let nodes = this.converter.buildNestTree<TreeSourceType>(datas);
      this.dataSubject.next(nodes);
      if (name != '') {
        this.tree?.expandAll();
      } else {
        this.tree?.reset();
        this.tree?.collapseAll();
      }
    } else {
      this.toastr.warning('无匹配结果');
    }
  }
}
