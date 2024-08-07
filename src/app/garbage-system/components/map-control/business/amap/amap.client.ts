import { EventEmitter, Injectable } from '@angular/core';
import { wait2 } from 'src/app/common/tools/tool';
import { UrlTool } from 'src/app/common/tools/url-tool/url.tool';
import { AMapDataSource } from './amap-data-source';

@Injectable()
export class AMapClient {
  get src() {
    return UrlTool.amap;
  }
  public get client(): Promise<CesiumMapClient> {
    return new Promise((resolve) => {
      wait2(() => {
        return this.isloaded && !!this._client;
      }).then(() => {
        resolve(this._client!);
      });
    });
  }
  public get controller(): Promise<CesiumDataController.Controller> {
    return new Promise((resolve) => {
      wait2(() => {
        return this.isloaded && !!this._controller;
      }).then(() => {
        resolve(this._controller!);
      });
    });
  }
  loaded: EventEmitter<void> = new EventEmitter();
  source: AMapDataSource = new AMapDataSource();

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
