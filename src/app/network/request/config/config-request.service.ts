import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '../../model/garbage-station/config.interface';

@Injectable({
  providedIn: 'root',
})
export class ConfigRequestService {
  constructor(private http: HttpClient) {}

  getAIIcons() {
    return this.http.get<any>('assets/ai-icon.json');
  }

  getMQTT() {
    return this.http.get<{ Port: number; Username: string; Password: string }>(
      'assets/mqtt.json'
    );
  }

  getVideo() {
    return this.http.get<{ beforeInterval: number; afterInterval: number }>(
      'assets/video.json'
    );
  }
  private config?: Config;
  async getConfig() {
    if (this.config) {
      return this.config;
    }
    let observable = this.http.get<Config>('assets/configs/config.json');
    this.config = await observable.toPromise();
    return this.config;
  }

  xls(name: string) {
    return this.http.get('assets/' + name, {
      responseType: 'arraybuffer',
    });
  }
}
