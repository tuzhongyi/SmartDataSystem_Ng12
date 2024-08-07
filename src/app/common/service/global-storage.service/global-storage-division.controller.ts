import { EventEmitter } from '@angular/core';
import { IDivision } from 'src/app/network/model/garbage-station/division.model';
import { EnumTool } from '../../tools/enum-tool/enum.tool';
import { wait2 } from '../../tools/tool';
import { LocalStorageService } from '../local-storage.service';

export class GlobalStorageDivisionController {
  change = new EventEmitter<IDivision>();
  private _default?: IDivision;
  public get default(): IDivision {
    if (!this._default) {
      let user = this.localStorage.user;
      let resource =
        user.Resources && user.Resources.length > 0
          ? user.Resources[0]
          : undefined;
      if (resource) {
        this._default = {
          Id: resource.Id,
          Name: resource.Name,
          DivisionType: EnumTool.resource.to.division(resource.ResourceType),
        };
      }
    }
    return this._default!;
  }
  private set default(v: IDivision) {
    this._default = v;
  }

  private _selected?: IDivision;
  public get selected(): IDivision {
    return this._selected!;
  }
  private set selected(v: IDivision) {
    this._selected = v;
    this.change.emit(v);
  }

  promise: GlobalStorageDivisionPromiseController;

  constructor(private localStorage: LocalStorageService) {
    this.promise = new GlobalStorageDivisionPromiseController(
      this.localStorage
    );
  }

  select(v: IDivision) {
    this.selected = v;
    this.promise.select(v);
  }
  init(v: IDivision) {
    if (this.default) return;
    this.default = v;
    this.selected = v;
  }
  clear() {
    this._default = undefined;
    this._selected = undefined;
    this.promise.clear();
  }
}

class GlobalStorageDivisionPromiseController {
  constructor(private localStorage: LocalStorageService) {}

  private _default?: IDivision;
  get default() {
    return new Promise<IDivision>((resolve, reject) => {
      if (this._default) {
        resolve(this._default);
      } else {
        wait2(() => {
          return !!this.localStorage.user;
        }).then((x) => {
          let user = this.localStorage.user;
          let resource =
            user.Resources && user.Resources.length > 0
              ? user.Resources[0]
              : undefined;

          if (resource) {
            this._default = {
              Id: resource.Id,
              Name: resource.Name,
              DivisionType: EnumTool.resource.to.division(
                resource.ResourceType
              ),
            };
            resolve(this._default);
          } else {
            reject(new Error('resource of user is null'));
          }
        });
      }
    });
  }

  private _selected?: IDivision;
  get selected() {
    return new Promise<IDivision>((resolve) => {
      if (this._selected) {
        resolve(this._selected);
      } else if (this._default) {
        this._selected = this._default;
        resolve(this._selected);
      } else {
        wait2(() => {
          return !!this._selected;
        }).then((x) => {
          if (this._selected) {
            resolve(this._selected);
          }
        });
        this.default.then((x) => {
          this._selected = x;
          resolve(this._selected);
        });
      }
    });
  }

  select(v: IDivision) {
    this._selected = v;
  }

  clear() {
    this._default = undefined;
    this._selected = undefined;
  }
}
