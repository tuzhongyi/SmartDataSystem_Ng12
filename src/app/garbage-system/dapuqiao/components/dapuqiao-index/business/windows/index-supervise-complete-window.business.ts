import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { ImageControlModel } from 'src/app/view-model/image-control.model';
import { DapuqiaoMainSuperviseCompleteImageArgs } from '../../../dapuqiao-main-supervise-complete/dapuqiao-main-supervise-complete.model';
import { IndexImageWindowBusiness } from './index-image-window.business';

@Injectable()
export class IndexSuperviseCompleteWindowBusiness extends WindowViewModel {
  constructor(private image: IndexImageWindowBusiness) {
    super();
  }
  eventId?: string;
  style = {
    width: '60%',
    height: '60%',
    top: '56%',
  };
  onclose() {
    this.show = false;
  }
  onimage(args: DapuqiaoMainSuperviseCompleteImageArgs) {
    this.image.array.index = args.index;
    let models = args.model.urls.map((url, i) => {
      let img = new ImageControlModel();
      img.name = url.name ?? '';
      img.src = new Promise((x) => {
        x(url.url);
      });
      img.index = i;
      return img;
    });
    this.image.array.manualcapture = false;
    this.image.array.models = models;
    this.image.array.show = true;
  }
}
