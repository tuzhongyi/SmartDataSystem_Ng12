import { Component, OnInit } from '@angular/core';
import { time } from 'console';
import { TreeConverter } from 'src/app/converter/tree.converter';
import { CameraAIModel } from 'src/app/network/model/camera-ai.model';
import { AIModelTreeBusiness } from './ai-model-tree.business';
import { AIModelTreeConverter } from '../../../converter/ai-model-tree.converter';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { AIModelNestNode } from 'src/app/view-model/ai-model-nest-node.model';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { AIModelFlatNode } from 'src/app/view-model/ai-model-flat-node.model';
import { BehaviorSubject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'howell-ai-model-tree',
  templateUrl: './ai-model-tree.component.html',
  styleUrls: ['./ai-model-tree.component.less'],
  providers: [
    AIModelTreeBusiness,
    AIModelTreeConverter
  ]
})
export class AIModelTreeComponent implements OnInit {

  private _flatNodeMap = new Map<string, AIModelFlatNode>();
  private _transformer = (nestNode: AIModelNestNode, level: number) => {
    const existingNode = this._flatNodeMap.get(nestNode.id);

    if (existingNode) {
      existingNode.name = nestNode.name;
      existingNode.expandable = nestNode.hasChild;
      return existingNode;
    }
    const flatNode = new AIModelFlatNode();
    flatNode.id = nestNode.id;
    flatNode.name = nestNode.name;
    flatNode.level = level;
    flatNode.value = nestNode.value;
    flatNode.modelValue = nestNode.modelValue;
    flatNode.expandable = nestNode.hasChild;
    flatNode.parentId = nestNode.parentId;
    flatNode.iconClass = nestNode.iconClass;
    flatNode.rawData = nestNode.rawData;

    if (nestNode.parentId) {
      let parentFlatNode = this._flatNodeMap.get(nestNode.parentId) ?? null;
      flatNode.parentNode = parentFlatNode;
    }

    this._flatNodeMap.set(flatNode.id, flatNode);
    return flatNode;
  };
  private _getLevel = (node: AIModelFlatNode) => node.level;
  private _isExpandable = (node: AIModelFlatNode) => node.expandable;
  private _getChildren = (node: AIModelNestNode) => node.childrenChange;
  private _hasChild = (index: number, node: AIModelFlatNode) => node.expandable;
  private dataChange = new BehaviorSubject<AIModelNestNode[]>([]);
  private _nestedNodeMap = new Map<string, AIModelNestNode>();
  private _currentNode: AIModelFlatNode | null = null;


  private _treeFlattener: MatTreeFlattener<AIModelNestNode, AIModelFlatNode>;

  private _cameraAIModel?: CameraAIModel;



  treeControl: FlatTreeControl<AIModelFlatNode>;
  dataSource: MatTreeFlatDataSource<AIModelNestNode, AIModelFlatNode>;
  // 一定要返回对象
  trackBy = (index: number, node: AIModelFlatNode) => node;
  selection!: SelectionModel<AIModelFlatNode>;// 保存选中节点


  // 高亮显示选中节点
  highLight = (node: AIModelFlatNode) => {
    return this.selection.isSelected(node);
  };


  constructor(private _business: AIModelTreeBusiness, private _converter: AIModelTreeConverter) {
    this._treeFlattener = new MatTreeFlattener(
      this._transformer,
      this._getLevel,
      this._isExpandable,
      this._getChildren
    )

    this.treeControl = new FlatTreeControl<AIModelFlatNode>(
      this._getLevel,
      this._isExpandable
    );

    this.dataSource = new MatTreeFlatDataSource<AIModelNestNode, AIModelFlatNode>(
      this.treeControl,
      this._treeFlattener
    );

    this.dataChange.subscribe((data) => {
      this.dataSource.data = data;
    });
    this.selection = new SelectionModel<AIModelFlatNode>();
  }

  async ngOnInit() {
    this._cameraAIModel = await this._business.getAIModel("98f7956d19054d6590392fbd888ac59e")
    // console.log(this._cameraAIModel)

    let res = this._converter.recurseToNestTreeNode(this._cameraAIModel.ModelDTO!.Labels)
    // console.log(res)
    this.dataChange.next(res);

    // console.log(this._flatNodeMap)

  }
  selectNode(node: AIModelFlatNode) {
    this.selection.toggle(node);
  }

}
