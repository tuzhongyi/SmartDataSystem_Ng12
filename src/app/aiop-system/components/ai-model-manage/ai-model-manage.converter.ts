import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { CameraAIModel } from '../../../network/model/camera-ai.model';
import { AIModelManageModel } from '../../../view-model/ai-model-manage.model';
import Conf from 'src/assets/json/ai-icon.json';
import {
  AbstractCommonModelConverter,
  CommonModelSource,
} from '../../../converter/common-model.converter';

const imgBase = 'assets/img/ai-model';
const icons: any = Conf;
@Injectable()
export class AIModelManageConverter extends AbstractCommonModelConverter<AIModelManageModel> {
  constructor(private _datePipe: DatePipe) {
    super();
  }
  Convert(source: CommonModelSource) {
    if (source instanceof CameraAIModel) {
      return this._fromCameraAIModel(source);
    }
    throw new Error('Error');
  }

  private _fromCameraAIModel(item: CameraAIModel) {
    let model = new AIModelManageModel();
    model.Id = item.Id;
    model.Name = item.ModelName ?? '-';
    model.ModelType = item.ModelType;
    model.TransformType = item.TransformType;
    model.Version = item.Version;
    model.LabelIcon = imgBase + '/' + icons[item.Label];
    model.UpdateTime =
      this._datePipe.transform(item.UpdateTime, 'yyyy-MM-dd hh:mm') ?? '';
    return model;
  }
}

type Icon = typeof Conf;
type Label = keyof Icon;

function getIcon<T, M extends keyof T>(icons: T, key: M) {
  return icons[key];
}

// getIcon(Conf, '11');
