export class AIModelFlatNode {
  id!: string;
  name!: string;
  level!: number;
  iconClass!: string;
  value!: string;
  modelValue!: string;
  expandable!: boolean;
  parentId!: string | null;
  parentNode!: AIModelFlatNode | null;
  rawData?: any;
}