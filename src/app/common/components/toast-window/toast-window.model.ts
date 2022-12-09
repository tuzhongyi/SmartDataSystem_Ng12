import { Type } from '@angular/core';
import { IModel } from 'src/app/network/model/model.interface';

export interface IToastWindowData extends IModel {
  [key: string]: any;
}

export interface IToastWindowEmitModel {
  ComponentTypeExpression?: Type<any>;
  Data: IToastWindowData;
}
