import { Injectable } from '@angular/core';
import { IConverter } from '../common/interfaces/converter.interface';
import { OnlineStatus } from '../enum/online-status.enum';
import { AICamera } from '../network/model/ai-camera.model';
import { AICameraRequestService } from '../network/request/ai-camera/ai-camera.service';
import { AICameraModelManageModel } from '../view-model/ai-camera-model-manage.model';
import { AbstractCommonModelConverter } from './common-model.converter';

type AICameraModelManageSource = AICamera;

@Injectable({
  providedIn: 'root',
})
export class AICameraModelManageConverter extends AbstractCommonModelConverter<AICameraModelManageModel> {
  Convert(source: AICameraModelManageSource) {
    if (source instanceof AICamera) {
      return this._fromAICamera(source);
    }
    throw new Error('Error');
  }

  private _fromAICamera(item: AICamera) {
    let model = new AICameraModelManageModel();
    model.Id = item.Id;
    model.Name = item.Name;
    model.OnlineStatus = item.OnlineStatus ?? OnlineStatus.Offline;
    model.AIModels = [];
    model.Labels = item.Labels ?? [];
    return model;
  }
}
