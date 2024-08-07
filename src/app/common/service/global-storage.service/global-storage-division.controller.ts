import { EventEmitter } from '@angular/core';
import { IDivision } from 'src/app/network/model/garbage-station/division.model';
import { EnumTool } from '../../tools/enum-tool/enum.tool';
import { wait2 } from '../../tools/tool';
import { LocalStorageService } from '../local-storage.service';

export class GlobalStorageDivisionController {
  change = new EventEmitter<IDivision>();

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
    this.change.emit(v);
  }

  clear() {
    this._default = undefined;
    this._selected = undefined;
  }

  init(v: IDivision) {
    if (this._default && this._default.Id === v.Id) return;
    this._default = v;
    this.select(v);
  }
}
