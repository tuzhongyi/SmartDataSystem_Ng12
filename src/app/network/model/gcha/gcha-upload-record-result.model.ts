import { IIdModel } from '../model.interface';

/**	UploadRecordResult(上传记录结果)	*/
export class GCHAUploadRecordResult implements IIdModel {
  /**	String	记录ID	M	*/
  Id!: string;
  /**	Boolean	结果：true：成功，false：失败	M	*/
  Result!: boolean;
}
