import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';

export class DaPuQiaoMainEventLevelArgs {
  divisionId?: string;
  unit: TimeUnit = TimeUnit.Day;
}

export class DaPuQiaoMainEventLevelModel {
  items: LevelItem[] = [
    new LevelItem(EventType.GarbageDrop, '一级事件'),
    new LevelItem(EventType.GarbageDropTimeout, '二级事件'),
    new LevelItem(EventType.GarbageDropSuperTimeout, '三级事件'),
  ];
}

export class LevelItem {
  constructor(key: number, name: string) {
    this.key = key;
    this.name = name;
  }
  key: number;
  value = 0;
  name: string;
}
