export class GisMapPoint {
  buildingId?: string;
  floorId?: string;
  id!: string;
  model!: string;
  name!: string;
  parentId!: string;
  position!: { lat: number; lon: number; height: number };
  scale?: number;
  type!: string;
  url?: string;
  villageId!: string;
}
