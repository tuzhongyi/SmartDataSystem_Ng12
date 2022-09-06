import { SelectionChange, SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { CommonNestNode } from 'src/app/view-model/common-nest-node.model';

@Component({
  selector: 'howell-common-tree',
  templateUrl: './common-tree.component.html',
  styleUrls: ['./common-tree.component.less']
})
export class CommonTreeComponent implements OnInit, OnChanges {

  SelectStrategy = SelectStrategy

  _flatNodeMap = new Map<string, CommonFlatNode>();
  private _currentNode: CommonFlatNode | null = null;

  private _transformer = (nestNode: CommonNestNode, level: number): CommonFlatNode => {

    const existingNode = this._flatNodeMap.get(nestNode.Id);


    // 为了保证加载子节点时，原节点信息不丢失
    if (existingNode) {
      existingNode.Name = nestNode.Name;
      existingNode.Expandable = nestNode.HasChildren;
      existingNode.RawData = nestNode.RawData
      return existingNode;
    }

    const flatNode = new CommonFlatNode();
    flatNode.Id = nestNode.Id;
    flatNode.Name = nestNode.Name;
    flatNode.Level = level;
    flatNode.Expandable = nestNode.HasChildren;
    flatNode.ParentId = nestNode.ParentId;
    flatNode.IconClass = nestNode.IconClass;
    flatNode.RawData = nestNode.RawData;
    flatNode.hideArrow = nestNode.hideArrow;
    flatNode.ButtonIconClasses = nestNode.ButtonIconClasses;

    if (nestNode.ParentId) {
      let ParentNode = this._flatNodeMap.get(nestNode.ParentId) ?? null;
      flatNode.ParentNode = ParentNode;
    }
    this._flatNodeMap.set(flatNode.Id, flatNode);
    return flatNode;
  };
  private _getLevel = (node: CommonFlatNode) => node.Level;
  private _isExpandable = (node: CommonFlatNode) => node.Expandable;
  private _getChildren = (node: CommonNestNode) => node.childrenChange;
  private _treeFlattener: MatTreeFlattener<CommonNestNode, CommonFlatNode>;



  treeControl: FlatTreeControl<CommonFlatNode>;
  trackBy = (index: number, node: CommonFlatNode) => node;//必须返回node
  dataSource: MatTreeFlatDataSource<CommonNestNode, CommonFlatNode>;
  selection!: SelectionModel<CommonFlatNode>;// 保存选中节点


  highLight = (node: CommonFlatNode) => {
    if (this.selectStrategy == SelectStrategy.Single) {
      return this.selection.isSelected(node);
    } else if (this.selectStrategy == SelectStrategy.Multiple) {
      // 仅当前点击的高亮，其他节点状态通过checkbox体现
      return this._currentNode && this._currentNode.Id == node.Id;

    }
    return false;
  };

  @Input()
  dataSubject = new BehaviorSubject<CommonNestNode[]>([]);

  // 当前节点选中后，再次点击不会取消选中，但是点击其他节点会取消当前节点选中
  @Input() holdStatus: boolean = false;


  @Input('selectStrategy')
  selectStrategy = SelectStrategy.Single;// 单选或多选


  // 默认选中列表
  private _defaultIds: string[] = []
  @Input()
  set defaultIds(ids: string[]) {
    // 排除空字符串
    this._defaultIds = ids;//ids.filter(id => id);
  }
  get defaultIds() {
    return this._defaultIds;
  }

  @Input() showButtonIcon = false;



  @Output() loadChildrenEvent = new EventEmitter<CommonFlatNode>();
  @Output() selectTreeNode: EventEmitter<SelectionChange<CommonFlatNode>> = new EventEmitter<SelectionChange<CommonFlatNode>>();
  @Output() defaultIdsChange = new EventEmitter<string[]>();
  @Output() buttonIconClickEvent = new EventEmitter<CommonFlatNode>();

  constructor() {

    this._treeFlattener = new MatTreeFlattener(
      this._transformer,
      this._getLevel,
      this._isExpandable,
      this._getChildren
    );

    this.treeControl = new FlatTreeControl<CommonFlatNode>(
      this._getLevel,
      this._isExpandable
    );

    this.dataSource = new MatTreeFlatDataSource<CommonNestNode, CommonFlatNode>(
      this.treeControl,
      this._treeFlattener
    );


  }

  ngOnInit(): void {
    if (this.selectStrategy == SelectStrategy.Single) {
      this.selection = new SelectionModel<CommonFlatNode>();
    } else {
      this.selection = new SelectionModel<CommonFlatNode>(true);
    }
    this.selection.changed.subscribe((change) => {
      this.selectTreeNode.emit(change);

    });

    this.dataSubject.subscribe((data) => {
      // console.log('树数据', data)
      this.dataSource.data = data;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    // 动态设置默认Id时
    if ('defaultIds' in changes) {
      this.setDefaultNodes();
    }
  }
  buttonIconClick(node: CommonFlatNode, index: number, e: Event) {
    node.CurrentButtonIcon = index;
    this.buttonIconClickEvent.emit(node);
  }
  singleSelectNode(node: CommonFlatNode) {
    // 如果当前节点正被选中，则再次点击当前节点，不会取消选中，一般用于编辑节点状态时
    if (this.holdStatus) {
      if (this.selection.isSelected(node)) {
        return;
      }
    }
    this.selection.toggle(node);

  }
  multipleSelectNode(node: CommonFlatNode) {

    if (this.holdStatus) {
      if (this.selection.isSelected(node)) {
        return;
      }
    }

    // 处理当前节点
    this.selection.toggle(node);
    this._currentNode = node;

    // 更改后代节点状态
    this.checkAllDescendants(node);

    // 更改父节点状态
    this._checkAllParentsSelection(node);
  }
  loadChildren(node: CommonFlatNode) {
    if (this.treeControl.isExpanded(node)) {
      this.loadChildrenEvent.emit(node)
    }
  }


  /**
  *  当前节点的所有后代节点部分被选中，但不能全被选中，则显示 indetermindate 状态(优先级比checked状态低)
  * @param node
  * @returns
  */
  descendantsPartiallySelected(node: CommonFlatNode) {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some((child) =>
      this.selection.isSelected(child)
    );
    return result && !this._descendantAllSelected(node);
  }



  /**
 *
 * @param node
 * @returns
 * @description 当前节点所有后代节点都被选中
 */
  private _descendantAllSelected(node: CommonFlatNode) {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every((child) => this.selection.isSelected(child));
    return descAllSelected;
  }



  private _checkAllParentsSelection(node: CommonFlatNode) {
    let parent: CommonFlatNode | null = this._getParentNode(node);
    while (parent) {
      this._checkRootNodeSelection(parent);
      parent = this._getParentNode(parent);
    }
  }
  /**
   *
   * @param node
   * @description 节点从选中状态变成未选中状态，条件是任意后代节点未选中
   * @description 节点从未选中状态变成选中状态，条件是所有后代节点都选中
   */
  private _checkRootNodeSelection(node: CommonFlatNode) {
    const nodeSelected = this.selection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every((child) => this.selection.isSelected(child));

    if (nodeSelected && !descAllSelected) {
      this.selection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.selection.select(node);
    }
  }
  private _getParentNode(node: CommonFlatNode) {
    if (node.ParentId) {
      return this._flatNodeMap.get(node.ParentId)!;
    }

    return null;
  }

  setDefaultNodes() {
    if (this.defaultIds.length == 0) return;
    if (this.selectStrategy == SelectStrategy.Single) {
      this.defaultIds.length = 1;
    }

    let len = this.defaultIds.length;

    let res: string[] = [];
    for (let i = 0; i < len; i++) {
      let id = this.defaultIds.shift();// 会改变数组长度
      if (id) {
        let node = this._flatNodeMap.get(id);
        if (node) {
          // 最顶层节点，则直接选中状态
          if (!node.ParentId) {
            this.selection.select(node)
          } else {
            // 上层节点为打开状态,否则没有打开树，就抛选中事件不合逻辑
            let parentNode = this._flatNodeMap.get(node.ParentId);
            if (parentNode && this.treeControl.isExpanded(parentNode)) {
              this.selection.select(node)
            } else {
              res.push(id)
            }
          }
        } else {
          // 还没有拉取到该节点
          res.push(id)
        }
      }
    }
    // 循环结束后，留下的都是没有匹配到的节点
    this.defaultIds = res;
    if (len !== this.defaultIds.length) this.defaultIdsChange.emit(this.defaultIds)
  }

  /**
   * 
   * 给外部组件调用的接口 
   * 
   */
  expandNodeRecursively(nodes: CommonNestNode[], depth: number) {
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];
      let flatNode = this._flatNodeMap.get(node.Id);
      if (flatNode && flatNode.Level < depth) {
        this.treeControl.expand(flatNode)
        this.expandNodeRecursively(node.childrenChange.value, depth)
      } else {
        break;
      }
    }
  }

  /**
   * 如果当前节点选中，则所有子节点被选中
   * 如果当前节点取消选中，则所有子节点取消选中
   */
  checkAllDescendants(node: CommonFlatNode) {
    const descendants = this.treeControl.getDescendants(node);
    if (descendants.length > 0 && this.selection.isMultipleSelection()) {
      this.selection.isSelected(node)
        ? this.selection.select(...descendants)
        : this.selection.deselect(...descendants);
    }
  }
  /**搜索成功时,打开/关闭树 */
  expandAll() {
    this.treeControl.expandAll()
  }
  collapseAll() {
    this.treeControl.collapseAll()
  }
  deleteNode(node: CommonFlatNode) {
    this.selection.deselect(node);
    this._flatNodeMap.delete(node.Id)
  }


  toggleSelect(ids: string[], clear?: boolean) {
    // this.selection.clear();
    if (clear) this.selection.clear();
    for (let i = 0; i < ids.length; i++) {
      let id = ids[i];
      let flatNode = this._flatNodeMap.get(id);
      if (flatNode) {
        this.multipleSelectNode(flatNode)
      }
    }
  }
  reset() {
    this._currentNode = null;
    this.selection.clear()
  }

}
