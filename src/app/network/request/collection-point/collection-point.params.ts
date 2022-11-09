/*
 * @Author: pmx
 * @Date: 2022-11-06 14:50:26
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-09 09:54:35
 */
import { Transform } from 'class-transformer';
import { CollectionPointClassification } from 'src/app/enum/collection-point-classification.enum';
import { TrashCanType } from 'src/app/enum/trashcan-type.enum';
import { CollectionPointScore } from 'src/app/enum/collection-point-score.enum';
import { transformDateTime } from '../../model/transform.model';
import {
  IParams,
  PagedDurationParams,
  PagedParams,
} from '../IParams.interface';

export class GetCollectionPointParams extends PagedParams implements IParams {
  /**	String	垃圾桶ID	O */
  Ids?: string;
  /**	String	地址，LIKE	O */
  Address?: string;
  /**	String[]	区划ID	O */
  DivisionIds?: string[];
  /**	String	名称，LIKE	O */
  Name?: string;
  /**	Int32	收运点类型	O */
  Classification?: CollectionPointClassification;
}

export class GetTrashCansParams extends PagedParams implements IParams {
  /**	String	垃圾桶ID	O */
  Ids?: string;
  /**	String	地址，LIKE	O */
  Address?: string;
  /**	String[]	区划ID	O */
  DivisionIds?: string[];
  /**	String	名称，LIKE	O */
  Name?: string;
  /**	String	垃圾桶唯一编号	O */
  No?: string;
  /**	Int32	垃圾桶类型	O */
  CanType?: TrashCanType;
  /**	String[]	垃圾收运点ID	O */
  CollectionPointIds?: string[];
}

export class GetCollectionPointNumberParams implements IParams {
  /**	String[]	区划ID	O */
  DivisionIds?: string[];
  /**	Int32[]	分类类型过滤列表	O */
  Classifications?: CollectionPointClassification[];
}

export class GetCollectionPointScoreTopListParams
  extends PagedDurationParams
  implements IParams
{
  /**	Int32	分类评分：1-差评，2-中评，3-好评	M */
  Score!: CollectionPointScore;
  /**	String[]	区划ID	O */
  DivisionIds?: string[];

  /**
   *	Int32[]	分类类型过滤列表，不支持	O
   *  @deprecated
   */
  Classifications?: CollectionPointClassification[];
  /**	Boolean	是否倒序排列	O */
  Desc?: boolean;
}

export class GetCollectionPointWeightTopListParams
  extends PagedDurationParams
  implements IParams
{
  /**	Int32	垃圾类型	O */
  TrashCanType?: TrashCanType;
  /**	String[]	区划ID	O */
  DivisionIds?: string[];
  /**	Boolean	是否倒序排列	O */
  Desc?: boolean;
}
