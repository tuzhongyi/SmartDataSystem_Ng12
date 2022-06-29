import { Component, Input, OnInit } from '@angular/core';
import { time } from 'console';
import { TreeConverter } from 'src/app/converter/tree.converter';
import {
  CameraAIModel,
  CameraAIModelDTOLabel,
  EnumValue,
} from 'src/app/network/model/camera-ai.model';
import { AIModelTreeBusiness } from './ai-model-tree.business';
import { AIModelTreeConverter } from '../../../converter/ai-model-tree.converter';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
  MatTreeNestedDataSource,
} from '@angular/material/tree';
import { AIModelNestNode } from 'src/app/view-model/ai-model-nest-node.model';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { AIModelFlatNode } from 'src/app/view-model/ai-model-flat-node.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';

type rawDataType = CameraAIModelDTOLabel | EnumValue;

@Component({
  selector: 'howell-ai-model-tree',
  templateUrl: './ai-model-tree.component.html',
  styleUrls: ['./ai-model-tree.component.less'],
  providers: [AIModelTreeBusiness, AIModelTreeConverter],
})
export class AIModelTreeComponent implements OnInit {
  private _flatNodeMap = new Map<string, AIModelFlatNode<rawDataType>>();
  private _transformer = (
    nestNode: AIModelNestNode<rawDataType>,
    level: number
  ) => {
    const flatNode = new AIModelFlatNode<rawDataType>();
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
  private _getLevel = (node: AIModelFlatNode<rawDataType>) => node.level;
  private _isExpandable = (node: AIModelFlatNode<rawDataType>) =>
    node.expandable;
  private _getChildren = (node: AIModelNestNode<rawDataType>) =>
    node.childrenChange;
  private _hasChild = (index: number, node: AIModelFlatNode<rawDataType>) =>
    node.expandable;
  private dataChange = new BehaviorSubject<AIModelNestNode[]>([]);
  private _nestedNodeMap = new Map<string, AIModelNestNode>();
  private _currentNode: AIModelFlatNode<rawDataType> | null = null;

  private _treeFlattener: MatTreeFlattener<
    AIModelNestNode<rawDataType>,
    AIModelFlatNode<rawDataType>
  >;
  private _aiModelLabels: CameraAIModelDTOLabel[] = [];

  treeControl: FlatTreeControl<AIModelFlatNode<rawDataType>>;
  dataSource: MatTreeFlatDataSource<
    AIModelNestNode<rawDataType>,
    AIModelFlatNode<rawDataType>
  >;
  trackBy = (index: number, node: AIModelFlatNode<rawDataType>) => node;
  selection!: SelectionModel<AIModelFlatNode<rawDataType>>; // 保存选中节点
  // 高亮显示选中节点
  highLight = (node: AIModelFlatNode<rawDataType>) => {
    return this.selection.isSelected(node);
  };

  @Input()
  modelLabelsSubject = new BehaviorSubject<CameraAIModelDTOLabel[]>([]);

  constructor(
    private _business: AIModelTreeBusiness,
    private _converter: AIModelTreeConverter
  ) {
    this._treeFlattener = new MatTreeFlattener(
      this._transformer,
      this._getLevel,
      this._isExpandable,
      this._getChildren
    );

    this.treeControl = new FlatTreeControl<AIModelFlatNode<rawDataType>>(
      this._getLevel,
      this._isExpandable
    );

    this.dataSource = new MatTreeFlatDataSource<
      AIModelNestNode<rawDataType>,
      AIModelFlatNode<rawDataType>
    >(this.treeControl, this._treeFlattener);

    this.dataChange.subscribe((data) => {
      this.dataSource.data = data;
    });
    this.selection = new SelectionModel<AIModelFlatNode<rawDataType>>();
  }

  async ngOnInit() {
    this.modelLabelsSubject.subscribe((data) => {
      this._aiModelLabels = data;
      let res = this._converter.recurseToNestTreeNode(data);
      this.dataChange.next(res);
    });
  }
  selectNode(node: AIModelFlatNode<CameraAIModelDTOLabel>) {
    if (this.selection.isSelected(node)) return;
    this.selection.toggle(node);
  }
  click() {
    console.log(this._flatNodeMap);
  }
  touchSpinChange(data: string, node: AIModelFlatNode<rawDataType>) {
    // console.log('touchSpinChange', data)
    node.modelValue = data;
    if (node.rawData instanceof CameraAIModelDTOLabel) {
      node.rawData.LabelModelValue = data;
    } else if (node.rawData instanceof EnumValue) {
      node.rawData.ModelValue = +data;
    }
    // 虽然修改的是对象，显式提示数据更新
    this.modelLabelsSubject.next(this._aiModelLabels);
  }
}
