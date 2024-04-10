import { BehaviorSubject } from 'rxjs';

export class AIModelNestNode<T = any> {
  id!: string;
  name!: string;
  value!: string;
  modelValue!: string;
  iconClass!: string;
  hasChild!: boolean;
  parentId?: string;
  childrenChange!: BehaviorSubject<AIModelNestNode<T>[]>;
  rawData?: T;
}

export class AIModelFlatNode<T = any> {
  id!: string;
  name!: string;
  level!: number;
  iconClass!: string;
  value!: string;
  modelValue!: string;
  expandable!: boolean;
  parentId?: string;
  parentNode?: AIModelFlatNode<T>;
  rawData?: T;
}

export interface NodeChangeArgs<T = any> {
  node: AIModelFlatNode<T>;
  value: string;
}
