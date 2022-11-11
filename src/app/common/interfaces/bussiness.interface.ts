import { EventEmitter } from '@angular/core';
import { IConverter, IPromiseConverter } from './converter.interface';
import { ISubscription } from './subscribe.interface';

export interface IBusiness<IModel, IViewModel> {
  Converter?:
    | IConverter<IModel, IViewModel>
    | IPromiseConverter<IModel, IViewModel>;
  subscription?: ISubscription;
  loading?: EventEmitter<void>;
  load(...args: any): Promise<IViewModel>;
  getData(...args: any): Promise<IModel>;
}

export interface ICreate<T> {
  create(...args: any[]): Promise<T>;
}
export interface IUpdate<T> {
  update(...args: any[]): Promise<T>;
}
export interface IDelete<T> {
  delete(...args: any[]): Promise<T>;
}
