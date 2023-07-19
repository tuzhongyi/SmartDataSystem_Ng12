import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { ImageControlModel } from 'src/app/view-model/image-control.model';

@Injectable()
export class CommitteesIndexImageArrayWindowBusiness extends WindowViewModel {
  style = {
    width: '64%',
    height: '64%',
    top: '56%',
    padding: '10px 20px',
  };

  models: ImageControlModel[] = [];
  current?: ImageControlModel;
  index: number = 0;

  get first() {
    return this.index === 0;
  }
  get last() {
    return this.index === this.models.length - 1;
  }

  onnext() {
    this.index++;
  }
  onprev() {
    this.index--;
  }
}
