import { Transform, Type } from 'class-transformer';
import { IIdModel } from '../model.interface';

import { PagedList } from '../page_list.model';
import { transformDateTime } from '../transform.model';
import { AIGarbageBuilding } from './building.model';
import { AIGarbageStation } from './garbage-station.model';

export class AIGarbageRegion implements IIdModel {
  Id!: string;
  /**	String	名称	O	*/
  Name!: string;
  /**	String	区划ID，街道	O	*/
  DivisionId?: string;
  /**	String	区划名称，街道名称	O	*/
  DivisionName?: string;
  /**	Building[]	楼栋列表	O	*/
  @Type(() => AIGarbageBuilding)
  Buildings?: AIGarbageBuilding[];
  /**	GarbageStation[]	垃圾厢房列表	O	*/
  @Type(() => AIGarbageStation)
  GarbageStations?: AIGarbageStation[];
  /**	DateTime	创建时间	O	*/
  @Transform(transformDateTime)
  CreationTime?: Date;
  /**	DateTime	变更时间	O	*/
  @Transform(transformDateTime)
  UpdateTime?: Date;
}

export class PagedListAIGarbageRegion extends PagedList<AIGarbageRegion> {
  @Type(() => AIGarbageRegion)
  Data!: AIGarbageRegion[];
}
