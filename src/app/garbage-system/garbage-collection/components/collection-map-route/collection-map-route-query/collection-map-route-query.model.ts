import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import { IdNameModel } from 'src/app/network/model/model.interface';

export class CollectionMapRouteDevice<T extends IdNameModel = any> {
  id: string = '';
  name: string = '';
  data?: T;
}
export class CollectionMapRouteConfig {
  close: boolean = true;
}
export class CollectionMapRouteQueryArgs {
  date: Date = new Date();
  model?: IdNameModel;
}
export class CollectionMapRouteQuery {
  duration!: Duration;
  model!: IdNameModel;
}
