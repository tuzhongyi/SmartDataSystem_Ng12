import { ImageControlModel } from 'src/app/view-model/image-control.model';

export class ElectricBikeAlarmModel<T = any> {
  data?: T;
  id: string = '';
  name: string = '';
  type: string = '';
  date: string = '';
  images?: ImageControlModel[];
}
