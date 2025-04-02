export class GisMapDivision {
  areas!: [number, number][];
  center!: { lat: number; lon: number; height: number };
  id!: string;
  level!: number;
  model!: string;
  name!: string;
  parentId?: string;
  scale?: number;
  showBackground?: boolean;
  type!: string;
  url?: string;
}
