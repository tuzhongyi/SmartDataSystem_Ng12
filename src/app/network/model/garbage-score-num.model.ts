/*
 * @Author: pmx
 * @Date: 2022-11-03 16:51:23
 * @Last Modified by:   pmx
 * @Last Modified time: 2022-11-03 16:51:23
 */
import { VehicleScore } from 'src/app/enum/vehicle-score.enum';

// 垃圾评价次数
export class GarbageScoreNumber {
  // 分类评分
  Score!: VehicleScore;

  // 次数
  Number!: number;
}
