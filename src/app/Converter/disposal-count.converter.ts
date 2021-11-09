import { DisposalCountModel } from '../view-model/disposal-count.model';

export interface DisposalCountConverter {
  toDisposalCount<T>(data: T[], ...res: any[]): DisposalCountModel[];
}
