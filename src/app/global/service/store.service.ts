import { EventEmitter, Injectable } from '@angular/core';
import { DivisionType } from 'src/app/enum/division_type.enum';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  statusChange = new EventEmitter();

  private _divisionId: string = '';
  private _divisionType: DivisionType = DivisionType.None;

  set divisionId(id: string) {
    this._divisionId = id;
  }
  get divisionId(): string {
    return this._divisionId;
  }
  set divisionType(type: DivisionType) {
    this._divisionType = type;
  }
  get divisionType() {
    return this._divisionType;
  }

  constructor() {}
  
}
