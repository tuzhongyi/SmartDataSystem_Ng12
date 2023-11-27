import { IParams } from '../../../IParams.interface';

export class BatchCopyRequest implements IParams {
  /**	String[]	资源ID列表	0	*/ ResourceIds?: string[];
  /**	Boolean	是否删除已存在的数据，	0	*/ DeleteExisted?: boolean;
}
