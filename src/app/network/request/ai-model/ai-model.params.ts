import { AIModelTransformType } from 'src/app/enum/transform-type.enum';

export class GetAIModelsParams {
  PageIndex?: number;
  PageSize?: number;
  ModelIds?: string[];
  DataSetIds?: string[];
  TransformType?: AIModelTransformType;
  ModelType?: string;
  ModelName?: string;
}
