import { Transform } from 'class-transformer';
import { IdNameModel } from './model.interface';
import { transformDateTime } from './transform.model';
import { CameraImageUrl } from './url.model';

/** 垃圾任务 */
export class GarbageTask extends IdNameModel {
  /**	String	任务ID	M */
  Id!: string;
  /**	String	任务名称	M */
  Name!: string;
  /**	String	区划ID，居委级别	O */
  DivisionId?: string;
  /**	String	目的地ID	M */
  DestinationId!: string;
  /**	String	目的地名称	M */
  DestinationName!: string;
  /**	String	目的地地址	M */
  DestinationAddress!: string;
  /**	DateTime	任务发布时间	M */
  @Transform(transformDateTime)
  CreateTime!: Date;
  /**	DateTime	预计完成时间	M */
  @Transform(transformDateTime)
  EstimatedTime!: Date;
  /**	String	任务发布用户ID	M */
  PublisherId!: string;
  /**	String	任务发布用户名称	M */
  PublisherName!: string;
  /**	Int32	任务类型，1-垃圾滞留2-垃圾桶满溢	M */
  TaskType!: number;
  /**	Boolean	是否已完成	M */
  IsFinished!: boolean;
  /**	DateTime	处置完成时间	O */
  @Transform(transformDateTime)
  FinishTime?: Date;
  /**	String	处置描述	O */
  FinishDescription?: string;
  /**	Double	花费时间，单位：分钟	O */
  TakeTime?: number;
  /**	CameraImageUrl[]	任务现场图片ID、图片地址列表	O */
  SceneImageUrls?: CameraImageUrl[];
  /**	CameraImageUrl[]	处置完成后的现场照片ID	O */
  ProcessedImageUrls?: CameraImageUrl[];
}
