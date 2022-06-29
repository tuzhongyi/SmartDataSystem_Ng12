import { BehaviorSubject } from "rxjs";

export class AIModelNestNode<T = any> {
  id!: string;
  name!: string;
  value!: string;
  modelValue!: string;
  iconClass!: string;
  hasChild!: boolean;
  parentId!: string | null;
  childrenChange!: BehaviorSubject<AIModelNestNode<T>[]>;
  rawData?: T;
}