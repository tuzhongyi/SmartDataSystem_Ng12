export class AIModelFlatNode<T = any> {
  id!: string;
  name!: string;
  level!: number;
  iconClass!: string;
  value!: string;
  modelValue!: string;
  expandable!: boolean;
  parentId!: string | null;
  parentNode!: AIModelFlatNode<T> | null;
  rawData?: T;
}