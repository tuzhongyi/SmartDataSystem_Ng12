import { CameraDeviceType } from 'src/app/enum/device-type.enum';

export class GetAIModelsParams {
  PageIndex?: number;
  PageSize?: number;
  ModelIds?: string[];
  DataSetIds?: string[];
  TransformType?: CameraDeviceType;
  ModelType?: string;
  ModelName?: string;
}
