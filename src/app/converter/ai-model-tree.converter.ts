import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  CameraAIModelDTOLabel,
  EnumValue,
} from 'src/app/network/model/garbage-station/camera-ai.model';
import { AIModelNestNode } from '../view-model/ai-model-nest-node.model';

type AIModelTreeModel = CameraAIModelDTOLabel | EnumValue;
@Injectable()
export class AIModelTreeConverter {
  constructor() {}
  Convert(source: AIModelTreeModel, ...res: any[]) {
    if (source instanceof CameraAIModelDTOLabel) {
      return this._fromCameraAIModelDTOLabel(source);
    } else if (source instanceof EnumValue) {
      return this._fromEnumValue(source, ...res);
    }
    throw new Error('Method not implemented.');
  }
  recurseToNestTreeNode<T extends AIModelTreeModel>(
    data: T[],
    parentId: string | null = null
  ) {
    let res: AIModelNestNode[] = [];
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      if (item instanceof CameraAIModelDTOLabel) {
        let node = this.Convert(item);
        node.parentId = parentId;
        res.push(node);
        if (!item.IsLeaf && item.Labels) {
          let children = this.recurseToNestTreeNode(item.Labels, item.LabelId);
          node.childrenChange.next(children);
        } else if (item.IsLeaf && item.EnumValues) {
          let children = this.recurseToNestTreeNode(
            item.EnumValues,
            item.LabelId
          );
          node.childrenChange.next(children);
        }
      } else if (item instanceof EnumValue) {
        let node = this.Convert(item, parentId, i);
        node.parentId = parentId;
        res.push(node);
      }
    }
    return res;
  }

  private _fromCameraAIModelDTOLabel(item: CameraAIModelDTOLabel) {
    let node = new AIModelNestNode();
    node.id = item.LabelId;
    node.name = item.LabelName;
    node.value = item.LabelValue ?? '';
    // modelValue至少从1开始
    node.modelValue = Math.max(1, +(item.LabelModelValue ?? '')).toString();
    node.hasChild =
      !item.IsLeaf ||
      !!(item.IsLeaf && item.EnumValues && item.EnumValues.length > 0);
    node.iconClass = 'howell-icon-folder';
    node.childrenChange = new BehaviorSubject<AIModelNestNode[]>([]);
    node.rawData = item;
    return node;
  }
  private _fromEnumValue(item: EnumValue, ...res: any[]) {
    let node = new AIModelNestNode();
    let [parentId, index] = res;
    node.id = parentId + '_EnumValues_' + index;
    node.name = item.Description;
    node.value = item.Value.toString();
    // modelValue至少从1开始
    node.modelValue = Math.max(1, item.ModelValue).toString();
    node.hasChild = false;
    node.iconClass = 'howell-icon-file';
    node.childrenChange = new BehaviorSubject<AIModelNestNode[]>([]);
    node.rawData = item;
    return node;
  }
}
