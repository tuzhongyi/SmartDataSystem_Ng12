import { TreeSourceType } from 'src/app/aiop-system/components/ai-garbage-station/ai-garbage-station-region-tree/ai-garbage-station-region-tree.model';
import { CommonNestNode } from 'src/app/view-model/common-nest-node.model';

export class TreeTool {
  static toArray(datas: CommonNestNode<TreeSourceType>[]) {
    let result: CommonNestNode<TreeSourceType>[] = [];
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      result.push(data);
      if (data.HasChildren) {
        let children = this.toArray(data.childrenChange.getValue());
        result = [...result, ...children];
      }
    }
    return result;
  }
}
