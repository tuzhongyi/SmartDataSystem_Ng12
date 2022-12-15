import { Type } from '@angular/core';

export class CommonTabModel {
  constructor(public title: string, public componentExpression: Type<any>) {}
}
