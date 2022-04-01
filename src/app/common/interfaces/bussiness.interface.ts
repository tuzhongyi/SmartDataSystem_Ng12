import { EventEmitter } from '@angular/core';
import { IConverter, IPromiseConverter } from './converter.interface';
import { ISubscription } from './subscribe.interface';

export interface IBusiness<IModel, IViewModel> {
  Converter:
    | IConverter<IModel, IViewModel>
    | IPromiseConverter<IModel, IViewModel>;
  subscription?: ISubscription;
  loading?: EventEmitter<void>;
  load(...args: any): Promise<IViewModel>;
  getData(...args: any): Promise<IModel>;
}