import { formatDate } from '@angular/common';

export class UrlTool {
  static get(host: string, port: number, path: string = '') {
    let protocol = document.location.protocol;
    if (protocol.indexOf(':') < 0) {
      protocol += ':';
    }

    if (path.indexOf('/') !== 0 || path.indexOf('\\') !== 0) {
      path = '/' + path;
    }

    return `${protocol}//${host}:${port}${path}`;
  }

  static fromLocation(path: string = '') {
    let protocol = location.protocol;
    if (!protocol.includes(':')) {
      protocol += ':';
    }
    let port = '';
    if (location.port) {
      port = ':' + location.port;
    }
    return `${protocol}//${location.hostname}${port}${path}`;
  }

  static set(
    url: string,
    path: string,
    params?: string | { [key: string]: string }
  ) {
    url += path;
    if (params) {
      if (url.indexOf('?') < 0) {
        url += '?';
      } else {
        url += '&';
      }
      if (typeof params === 'string') {
        url += params;
      } else {
        let index = 0;
        for (let key in params) {
          if (index > 0) {
            url += '&';
          }
          url += `${key}=${params[key]}`;
          index++;
        }
      }
    }
    return url;
  }

  static get amap() {
    let date = formatDate(new Date(), 'yyyyMMddHHmmss', 'en');
    return this.fromLocation(`/amap/map_ts.html?v=${date}`);
  }
  static get amap2d() {
    let date = formatDate(new Date(), 'yyyyMMddHHmmss', 'en');
    return this.fromLocation(`/amap/map_ts.html?maptype=2D&v=${date}`);
  }
}
