import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import {
  ImageControlModelArray,
  ImageControlModelPage,
} from 'src/app/view-model/image-control.model';
import { CommitteesIndexImageWindowBusiness } from './committees-image-window.business';

@Injectable()
export class CommitteesGarbageStationDropWindowBusiness extends WindowViewModel {
  constructor(private image: CommitteesIndexImageWindowBusiness) {
    super();
  }
  divisionId?: string;

  style = {
    height: '83.5%',
    width: '90%',
    transform: 'translate(-50%, -44.5%)',
  };

  onimage(model: ImageControlModelArray | ImageControlModelPage) {
    if (model instanceof ImageControlModelPage) {
      this.image.page.model = model;
      this.image.page.page = model.page;
      this.image.page.show = true;
    } else if (model instanceof ImageControlModelArray) {
      this.image.array.models = model.models;
      this.image.array.index = model.index;
      if (model.models && model.models.length > 0) {
        this.image.array.current = model.models[0];
      }
      this.image.array.show = true;
    } else {
    }
  }
}
