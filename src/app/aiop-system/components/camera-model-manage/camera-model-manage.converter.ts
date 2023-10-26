import { Injectable } from '@angular/core';
import { CameraAIModel } from 'src/app/network/model/garbage-station/camera-ai.model';
import { AbstractCommonModelConverter } from '../../../converter/common-model.converter';
import { OnlineStatus } from '../../../enum/online-status.enum';
import { AICamera } from '../../../network/model/garbage-station/ai-camera.model';
import {
  CameraAIModelManageModel,
  CameraManageModel,
} from './camera-model-manage.model';

import { AiIconConfig } from 'src/app/common/models/ai-icon.config';
import Conf from 'src/assets/json/ai-icon.json';

type AICameraModelManageSource = AICamera | CameraAIModel;

@Injectable()
export class AICameraModelManageConverter extends AbstractCommonModelConverter<
  CameraManageModel | CameraAIModelManageModel
> {
  imgBase = 'assets/img/ai-model';
  icons: AiIconConfig = Conf;

  Convert(source: AICameraModelManageSource) {
    if (source instanceof AICamera) {
      return this._fromCamera(source);
    } else if (source instanceof CameraAIModel) {
      return this._fromCameraAIModel(source);
    }

    throw new Error('Error');
  }

  private _fromCamera(item: AICamera) {
    let model = new CameraManageModel<AICamera>();
    model.Id = item.Id;
    model.Name = item.Name;
    model.OnlineStatus = item.OnlineStatus ?? OnlineStatus.Offline;
    model.AIModels = [];
    model.Labels = item.Labels ?? [];

    model.RawData = item;
    return model;
  }

  private _fromCameraAIModel(item: CameraAIModel) {
    let model = new CameraAIModelManageModel();
    model.Id = item.Id;
    model.Name = item.ModelName ?? '-';
    model.LabelIcon = this.imgBase + '/' + this.icons[item.Label];

    model.RawData = item;

    return model;
  }
}
