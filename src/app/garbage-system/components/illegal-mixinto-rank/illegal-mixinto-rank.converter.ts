import { EventType } from 'src/app/enum/event-type.enum';
import { RankModel } from 'src/app/view-model/rank.model';
import { NumberStatisticModel } from './illegal-mixinto-rank.model';

export class IllegalMixintoRankConverter {
  itemConvert(input: NumberStatisticModel, type: EventType): RankModel {
    let model = new RankModel(input, type);
    model.id = input.Id ?? '';
    model.name = input.Name;
    if (input.EventNumbers) {
      let numbers = input.EventNumbers.find((x) => x.EventType === type);
      if (numbers) {
        model.value = numbers.DayNumber;
      }
      model.unit = '起';
      model.statistic = model.value.toString();
    }
    return model;
  }

  Convert(input: NumberStatisticModel[], type: EventType): RankModel[] {
    let array = new Array<RankModel>();
    for (let i = 0; i < input.length; i++) {
      const item = this.itemConvert(input[i], type);
      array.push(item);
    }
    return array;
  }
}
