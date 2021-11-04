import { DisposalCountModel } from '../view-model/disposal_count.model';

export interface IDisposalCountConverter {
  toDisposalCount<T>(data: T[], ...res: any[]): DisposalCountModel[];
}
