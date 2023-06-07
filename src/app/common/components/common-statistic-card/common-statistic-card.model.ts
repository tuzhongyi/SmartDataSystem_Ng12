import { Type } from '@angular/core';
import { TrashCanType } from 'src/app/enum/trashcan-type.enum';

export class CommonStatisticCardModel {
  Title!: string;
  Content!: string;

  TitleStyle: Partial<CSSStyleDeclaration> = {};
  TitleCls: string = '';

  ContentStyle: Partial<CSSStyleDeclaration> = {};
  ContentCls: string = 'sky-blue-text2';

  componentExpression?: Type<any>;
  type?: TrashCanType;

  constructor() {}
}
