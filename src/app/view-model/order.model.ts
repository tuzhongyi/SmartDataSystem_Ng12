import { OrderType } from '../enum/order-type.enum';

export class OrderModel {
  constructor(name: string, type: OrderType) {
    this.type = type;
    this.name = name;
  }
  type: OrderType;
  name: string;
}
