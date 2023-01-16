import { Injectable } from '@angular/core';
import { IConverter } from '../../../common/interfaces/converter.interface';
import { OnlineStatus } from '../../../enum/online-status.enum';
import { AICamera } from '../../../network/model/ai-camera.model';
import { AICameraRequestService } from '../../../network/request/ai-camera/ai-camera.service';
import {
  CameraAIModelManageModel,
  CameraManageModel as CameraManageModel,
} from './camera-model-manage.model';
import { AbstractCommonModelConverter } from '../../../converter/common-model.converter';
import { CameraAIModel } from 'src/app/network/model/camera-ai.model';

import Conf from 'src/assets/json/ai-icon.json';
import { AiIconConfig } from 'src/app/common/models/ai-icon.config';

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
