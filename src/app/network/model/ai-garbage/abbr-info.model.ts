import { Type } from 'class-transformer';
import 'reflect-metadata';
import { IIdModel } from '../model.interface';

import { PagedList } from '../page_list.model';

export class AIGarbageAbbrInfo implements IIdModel {
  Id!: string;
  /**	String	名称	O	*/
  Name?: string;
}
export class PagedListAIGarbageAbbrInfo extends PagedList<AIGarbageAbbrInfo> {
  @Type(() => AIGarbageAbbrInfo)
  Data!: AIGarbageAbbrInfo[];
}
