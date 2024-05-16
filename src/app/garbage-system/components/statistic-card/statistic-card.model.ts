export class StatisticCardViewModel<T = any> {
  constructor(data: T) {
    this.data = data;
  }
  title: string = '';
  value: string = '0';
  style: any = {};
  class: string = '';
  data: T;
}
