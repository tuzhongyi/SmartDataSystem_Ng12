import { BehaviorSubject } from "rxjs";

export class AIModelNestNode {
  id!: string;
  name!: string;
  value!: string;
  modelValue!: string;
  iconClass!: string;
  hasChild!: boolean;
  parentId!: string | null;
  childrenChange!: BehaviorSubject<AIModelNestNode[]>;
  rawData?: any;

}