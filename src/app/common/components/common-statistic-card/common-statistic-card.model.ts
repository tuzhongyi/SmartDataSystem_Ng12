import { Type } from '@angular/core';

export class CommonStatisticCardModel {
  Title!: string;
  Content!: string;

  TitleStyle: Partial<CSSStyleDeclaration> = {};
  TitleCls: string = '';

  ContentStyle: Partial<CSSStyleDeclaration> = {};
  ContentCls: string = 'sky-blue-text2';

  componentExpression: Type<any> | null = null;

  constructor() {}
}
