import { IIdModel } from '../model.interface';

export class CameraDailyAICount implements IIdModel {
  /**	String	记录ID	M	*/ Id!: string;
  /**	String	摄像机ID	M	*/ CameraId!: string;
  /**	String	摄像机名称	M	*/ CameraName!: string;
  /**	Date	日期	M	*/ Date!: Date;
  /**	Int32	事件数量	M	*/ Count!: number;
}
