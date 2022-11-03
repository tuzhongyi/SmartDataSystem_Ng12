import { TrashCanType } from 'src/app/enum/trashcan-type.enum';

export class GarbageWeight {
  // 垃圾桶类型
  CanType!: TrashCanType;

  // 重量，单位：KG
  Weight!: number;
}
