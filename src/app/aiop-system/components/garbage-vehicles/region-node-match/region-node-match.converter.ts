import { Injectable } from '@angular/core';
import { mode } from 'crypto-js';
import {
  CommonModelConverter,
  CommonModelSource,
} from 'src/app/converters/common-model.converter';
import { Camera } from 'src/app/models/resource/camera.resource';
import { Resource } from 'src/app/models/resource/resource.model';
import { Language } from 'src/app/tools/language';
import { RegionNodeResourceModel } from './region-node-match.model';

@Injectable({
  providedIn: 'root',
})
export class RegionNodeResourceConverter extends CommonModelConverter<
  RegionNodeResourceModel,
  Resource
> {
  Convert(source: CommonModelSource, ...res: any[]) {
    if (source instanceof Camera) {
      return this._fromCamera(source);
    }
    throw new Error('Method not implemented.');
  }
  private _fromCamera(item: Camera) {
    let model = new RegionNodeResourceModel();
    model.Id = item.Id;
    model.Name = item.Name;
    model.ResourceType = item.ResourceType;
    model.DetailType = item.CameraType;
    model.DetailTypeName = Language.CameraType(item.CameraType);
    model.DetailIcon = Language.CameraIcon(item.CameraType);
    return model;
  }
}
