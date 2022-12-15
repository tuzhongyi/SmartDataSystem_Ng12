import { Type } from '@angular/core';

export class CommonStatisticCardModel {
  title!: string;
  content!: string;
  componentExpression: Type<any> | null = null;

  constructor() {}
}
