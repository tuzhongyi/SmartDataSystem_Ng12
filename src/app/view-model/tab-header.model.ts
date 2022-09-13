import { ClassConstructor } from 'class-transformer';

export class TabHeaderModel {
  constructor(
    public title: string,
    public dynamicComponent: ClassConstructor<any>
  ) {}
}
