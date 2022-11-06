/*
 * @Author: pmx 
 * @Date: 2022-11-06 14:50:26 
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-06 16:13:05
 */
import { Transform } from 'class-transformer';
import { CollectionPointClassification } from 'src/app/enum/collection-point.enum';
import { TrashCanType } from 'src/app/enum/trashcan-type.enum';
import { VehicleScore } from 'src/app/enum/vehicle-score.enum';
import { transformDateTime } from '../../model/transform.model';
import {
  IParams,
  PagedParams,
} from '../IParams.interface';

export class GetCollectionPointsParams extends PagedParams implements IParams {

  // 垃圾桶ID
  Ids?: string[];

  // 收运点地址
  Address?: string;

  // 所属区划ID
  DivisionIds?: string[];

  // 收运点名称
  Name?: string;

  // 收运点类型
  Classification?: CollectionPointClassification;

}

export class GetTrashCansParams extends PagedParams implements IParams {

  // 垃圾桶ID
  Ids?: string[];

  // 垃圾桶地址
  Address?: string;


  // 所属区划ID
  DivisionIds?: string[];

  // 垃圾桶名称
  Name?: string;

  // 垃圾桶编号
  No?: string;

  // 垃圾桶类型
  CanType?: TrashCanType;


  // 收运点ID
  CollectionPointIds?: string[];


}



export class GetCollectionPointNumberParams {



  // 所属区划ID
  DivisionIds?: string[];

  // 分类类型过滤列表
  Classifications?: CollectionPointClassification[];

}



export class GetCollectionPointScoreTopListParams extends PagedParams implements IParams {


  // 开始时间
  @Transform(transformDateTime)
  BeginTime!: Date;

  // 结束时间
  @Transform(transformDateTime)
  EndTime!: Date;

  // 分类评分
  Score!: VehicleScore

  // 所属区划ID列表
  DivisionIds?: string[];

  // 分类类型过滤列表
  Classifications?: CollectionPointClassification[];

  // 是否按时间倒序排列
  Desc?: boolean;


}


export class GetCollectionPointWeightTopListParams extends PagedParams implements IParams {


  // 开始时间
  @Transform(transformDateTime)
  BeginTime!: Date;

  // 结束时间
  @Transform(transformDateTime)
  EndTime!: Date;

  // 垃圾类型
  TrashCanType?: TrashCanType;

  // 所属区划ID列表
  DivisionIds?: string[];

  // 是否按时间倒序排列
  Desc?: boolean;


}