import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, isObservable, Observable, of, ReplaySubject } from "rxjs";

export class TableDataSource extends DataSource<any> {
  private _dataStream = new BehaviorSubject<any[]>([]);

  constructor(initialData: any[]) {
    super();
    this.setData(initialData);
  }
  connect(): Observable<any[]> {
    return this._dataStream
  }
  disconnect() {

  }
  setData(value: any[]) {
    this._dataStream.next(value)
  }
  getData() {
    return this._dataStream.getValue();
  }
  isEmpty() {
    return !this._dataStream.value.length;
  }

}
