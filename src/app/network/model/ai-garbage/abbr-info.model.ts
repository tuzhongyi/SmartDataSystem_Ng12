import { Type } from 'class-transformer';
import 'reflect-metadata';
import { IdModel } from '../model.model';
import { PagedList } from '../page_list.model';

export class AIGarbageAbbrInfo extends IdModel {
  /**	String	名称	O	*/
  Name?: string;
}
export class PagedListAIGarbageAbbrInfo extends PagedList<AIGarbageAbbrInfo> {
  @Type(() => AIGarbageAbbrInfo)
  Data!: AIGarbageAbbrInfo[];
}
