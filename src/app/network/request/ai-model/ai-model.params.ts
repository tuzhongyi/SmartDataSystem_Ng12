import { AIModelType } from 'src/app/enum/ai-model-type.enum';
import { CameraDeviceType } from 'src/app/enum/device-type.enum';
import { PagedParams } from '../IParams.interface';

export class GetAIModelsParams extends PagedParams {
  /**	String[]	模型ID	O */
  ModelIds?: string;
  /**	String[]	数据集ID	O */
  DataSetIds?: string[];
  /**	String	应用类型，G3、G5	O */
  TransformType?: CameraDeviceType;
  /**	String	模型类型：AIOP	O */
  ModelType?: AIModelType;
  /**	String	模型名称，支持LIKE	O */
  ModelName?: string;
}
