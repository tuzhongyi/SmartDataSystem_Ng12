import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { RetentionType } from 'src/app/enum/retention-type.enum';
import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';
import { RankModel } from 'src/app/view-model/rank.model';

export class RetentionRankConverter
  implements IConverter<DivisionNumberStatistic[], RankModel[]>
{
  Convert(input: DivisionNumberStatistic[], type: RetentionType): RankModel[] {
    let array = [];
    for (let i = 0; i < input.length; i++) {
      const item = this.divisionConvert(input[i], type);
      array.push(item);
    }
    return array;
  }

  divisionConvert(
    input: DivisionNumberStatistic,
    type: RetentionType
  ): RankModel {
    let obj = new RankModel(input);
    obj.name = input.Name;
    obj.id = input.Id;

    switch (type) {
      case RetentionType.RetentionTime:
        obj.value = (input.CurrentGarbageTime ?? 0) >> 0;
        obj.statistic = this.transformTime(obj.value);
        break;
      case RetentionType.RetentionStationNumber:
        obj.value = (input.GarbageDropStationNumber ?? 0) >> 0;
        obj.statistic = obj.value.toString();
        obj.unit = '个';
        break;
      default:
        break;
    }
    return obj;
  }
  private transformTime(time: number) {
    let hour = Math.floor(time / 60);
    let minute = time - hour * 60;
    let res = hour == 0 ? minute + '分钟' : hour + '小时' + minute + '分钟';
    return res;
  }
}
