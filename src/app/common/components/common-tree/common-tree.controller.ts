import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { CommonNestNode } from 'src/app/view-model/common-nest-node.model';
export class CommonTreeController {
  control: FlatTreeControl<CommonFlatNode>;
  trackBy = (index: number, node: CommonFlatNode) => node; //必须返回node
  dataSource: MatTreeFlatDataSource<CommonNestNode, CommonFlatNode>;
  constructor() {
    this._treeFlattener = new MatTreeFlattener(
      this._transformer,
      this._getLevel,
      this._isExpandable,
      this._getChildren
    );

    this.control = new FlatTreeControl<CommonFlatNode>(
      this._getLevel,
      this._isExpandable
    );

    this.dataSource = new MatTreeFlatDataSource<CommonNestNode, CommonFlatNode>(
      this.control,
      this._treeFlattener
    );
  }
  private _treeFlattener: MatTreeFlattener<CommonNestNode, CommonFlatNode>;
  flatNodeMap = new Map<string, CommonFlatNode>();

  private _transformer = (
    nestNode: CommonNestNode,
    level: number
  ): CommonFlatNode => {
    const existingNode = this.flatNodeMap.get(nestNode.Id);

    // 为了保证加载子节点时，原节点信息不丢失
    if (existingNode) {
      existingNode.Name = nestNode.Name;
      existingNode.Expandable = nestNode.HasChildren;
      existingNode.RawData = nestNode.RawData;
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
      let ParentNode = this.flatNodeMap.get(nestNode.ParentId);
      flatNode.ParentNode = ParentNode;
    }
    this.flatNodeMap.set(flatNode.Id, flatNode);
    return flatNode;
  };
  private _getLevel = (node: CommonFlatNode) => node.Level;
  private _isExpandable = (node: CommonFlatNode) => node.Expandable;
  private _getChildren = (node: CommonNestNode) => node.childrenChange;
}
