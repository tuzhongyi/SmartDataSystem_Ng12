import { EventEmitter, Injectable } from '@angular/core';
import { wait } from 'src/app/common/tools/tool';
import { UrlTool } from 'src/app/common/tools/url-tool/url.tool';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';

@Injectable()
export class DeployAMapClient {
  constructor() {}
  get src() {
    return UrlTool.amap;
  }
  public get client(): Promise<CesiumMapClient> {
    return new Promise((resolve) => {
      wait(
        () => {
          return this.isloaded && !!this._client;
        },
        () => {
          resolve(this._client!);
        }
      );
    });
  }
  public get controller(): Promise<CesiumDataController.Controller> {
    return new Promise((resolve) => {
      wait(
        () => {
          return this.isloaded && !!this._controller;
        },
        () => {
          resolve(this._controller!);
        }
      );
    });
  }
  loaded: EventEmitter<void> = new EventEmitter();
  source: {
    station: GarbageStation[];
  } = {
    station: [],
  };

  init(iframe: HTMLIFrameElement) {
    this._client = new CesiumMapClient(iframe);
    this._client.Events.OnLoaded = () => {
      this._controller = this._client?.DataController;
      this.isloaded = true;
      this.loaded.emit();
    };
  }

  private _client?: CesiumMapClient;
  private _controller?: CesiumDataController.Controller;
  private isloaded = false;
}
