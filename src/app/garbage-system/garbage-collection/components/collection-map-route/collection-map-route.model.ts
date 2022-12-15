import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';

export interface ICollectionMapRouteBusiness {
  src: string;
  init(iframe: HTMLIFrameElement): void;
  load(source: GarbageVehicle): Promise<boolean>;
}
