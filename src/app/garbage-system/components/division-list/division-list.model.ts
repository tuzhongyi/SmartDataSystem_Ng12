import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';
import { Division } from 'src/app/network/model/garbage-station/division.model';

export class DivisionListModel {
  current?: Division;
  children!: Promise<DivisionNumberStatistic[]>;
}
