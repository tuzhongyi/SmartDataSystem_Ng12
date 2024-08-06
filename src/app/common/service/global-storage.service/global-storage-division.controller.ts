import { EventEmitter } from '@angular/core';
import { IDivision } from 'src/app/network/model/garbage-station/division.model';
import { EnumTool } from '../../tools/enum-tool/enum.tool';
import { wait } from '../../tools/tool';
import { LocalStorageService } from '../local-storage.service';

export class GlobalStorageDivisionController {
  change = new EventEmitter<IDivision>();
  private _default!: IDivision;
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
    return this._default;
  }
  private set default(v: IDivision) {
    this._default = v;
  }

  private _selected!: IDivision;
  public get selected(): IDivision {
    return this._selected;
  }
  private set selected(v: IDivision) {
    this._selected = v;
    this.change.emit(v);
  }

  promise = new GlobalStorageDivisionPromiseController(this.localStorage);

  constructor(private localStorage: LocalStorageService) {}

  setSelected(v: IDivision) {
    this.selected = v;
  }
  setDefault(v: IDivision) {
    this.default = v;
    this.selected = v;
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
        wait(
          () => {
            return !!this.localStorage.user;
          },
          () => {
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
          }
        );
      }
    });
  }
}
