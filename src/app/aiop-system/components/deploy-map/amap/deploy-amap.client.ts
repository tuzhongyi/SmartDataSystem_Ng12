import { formatDate, PlatformLocation } from '@angular/common';
import { EventEmitter, Injectable } from '@angular/core';
import { wait } from 'src/app/common/tools/tool';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';

@Injectable()
export class DeployAMapClient {
  constructor(private location: PlatformLocation) {}
  get src() {
    const host = this.location.hostname;
    const port = this.location.port;
    const date = formatDate(new Date(), 'yyyyMMddHHmmss', 'en');
    return `http://${host}:${port}/amap/map_ts.html?v=${date}`;
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
