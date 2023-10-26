import { CollectionPointScore } from 'src/app/enum/collection-point-score.enum';

/**	垃圾评价次数	*/
export class GarbageScoreNumber {
  /**	Int32	分类评分：1-差评，2-中评，3-好评	M	*/
  Score!: CollectionPointScore;
  /**	Int32	次数	M	*/
  Number!: number;
}
