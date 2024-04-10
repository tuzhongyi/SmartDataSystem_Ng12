import { BehaviorSubject } from 'rxjs';
import {
  AIModelFlatNode,
  NodeChangeArgs,
} from 'src/app/common/components/ai-model-tree/ai-model-tree.model';
import { FileResult } from 'src/app/common/components/upload-control/upload-control.model';
import {
  CameraAIModelDTOLabel,
  EnumValue,
} from 'src/app/network/model/garbage-station/camera-ai.model';
import Icons from 'src/assets/json/ai-icon.json';

export class AIModelDetailsIconSelection {
  selected = {
    path: '',
    key: '',
  };
  path = 'assets/img/ai-model/';
  datas = Icons;
  show = false;
  private map = new Map(Object.entries(Icons));

  handel: any;

  select(key: string) {
    this.selected.key = key;
    this.selected.path = `${this.path}${this.map.get(key)}`;
    this.show = false;
  }

  close() {
    this.show = false;
  }

  open(e: Event) {
    e.stopImmediatePropagation();
    this.show = !this.show;
  }

  regist() {
    this.handel = this.close.bind(this);
    document.addEventListener('click', this.handel);
  }

  destroy() {
    if (this.handel) {
      document.removeEventListener('click', this.handel);
    }
  }
}
export class AIModelDetailsLabelSelection {
  subject = new BehaviorSubject<CameraAIModelDTOLabel[]>([]);
  private datas: CameraAIModelDTOLabel[] = [];

  load(datas: CameraAIModelDTOLabel[] = []) {
    this.datas = datas;
    this.subject.next(datas);
  }

  onchange(args: NodeChangeArgs) {
    if (args.node.rawData instanceof CameraAIModelDTOLabel) {
      let label = this.findLabel(args.node.id, this.datas);
      if (label) {
        label.LabelModelValue = args.value;
      }
    }
    if (args.node.rawData instanceof EnumValue) {
      let keys = args.node.id.split('_');
      let labelId = keys[0];
      let index = parseInt(keys[2]);
      let label = this.findLabel(labelId, this.datas);
      if (label && label.EnumValues) {
        label.EnumValues[index].ModelValue = parseInt(args.value);
      }
    }
  }

  getIds(node: AIModelFlatNode, ids: string[] = []) {
    ids.unshift(node.id);
    if (node.parentNode) {
      this.getIds(node.parentNode, ids);
    }
    return ids;
  }

  findLabel(
    id: string,
    datas: CameraAIModelDTOLabel[]
  ): CameraAIModelDTOLabel | undefined {
    let result: CameraAIModelDTOLabel | undefined = undefined;
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];

      if (id === data.LabelId) {
        return data;
      }
      if (data.Labels && data.Labels.length > 0) {
        result = this.findLabel(id, data.Labels);
        if (result) {
          return result;
        }
      }
    }
    return undefined;
  }
}

export class AIModelDetailsUploadModel {
  path = '';
  data?: string;
  onupload(data: FileResult) {
    this.data = data as string;
  }
}
