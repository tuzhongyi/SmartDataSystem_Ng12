import { CollectionScore } from 'src/app/enum/collection-score.enum';

/**	垃圾评价次数	*/
export class GarbageScoreNumber {
  /**	Int32	分类评分：1-差评，2-中评，3-好评	M	*/
  Score!: CollectionScore;
  /**	Int32	次数	M	*/
  Number!: number;
}
