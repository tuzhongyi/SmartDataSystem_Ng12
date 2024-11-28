import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';
import { HowellResponse } from '../model/howell-response.model';
import { DigestResponse } from './auth/digest-response.model';
import { Digest } from './digest';

@Injectable({
  providedIn: 'root',
})
export class HowellAuthHttpService {
  constructor(
    private http: HttpClient,
    private session: SessionStorageService
  ) {}

  public postBase64String(
    url: string,
    base64: string,
    params?: HttpParams
  ): Observable<Blob> {
    const myHeaders = this.generateHttpHeader('POST', url);
    const head = new HttpHeaders({
      Authorization: myHeaders.get('Authorization') || '',
      'Content-Type': 'application/json',
      Accept: 'text/plain',
    });
    return this.http.post(url, base64, {
      headers: head,
      params: params,
      responseType: 'blob',
    });
  }

  public putBase64String<T>(
    url: string,
    base64: string,
    params?: HttpParams
  ): Observable<T> {
    const myHeaders = this.generateHttpHeader('PUT', url);
    const head = new HttpHeaders({
      Authorization: myHeaders.get('Authorization') || '',
      'Content-Type': 'text/plain',
      Accept: 'text/plain',
    });
    return this.http.put<T>(url, base64, {
      headers: head,
      params: params,
      responseType: 'json',
    });
  }

  public getStream(url: string, params?: HttpParams): Observable<Blob> {
    const myHeaders = this.generateHttpHeader('GET', url);
    const head = new HttpHeaders({
      Authorization: myHeaders.get('Authorization') || '',
      'Content-Type': 'application/json',
      Accept: 'text/plain',
    });
    return this.http.get(url, {
      headers: head,
      params: params,
      responseType: 'blob',
    });
  }

  public getHowellResponse<T = any, R = HowellResponse<T>>(
    url: string,
    params?: HttpParams
  ): Observable<R> {
    return this.get<R>(url, params);
  }

  public get<R>(url: string, params?: HttpParams) {
    const myHeaders = this.generateHttpHeader('GET', url);
    const httpOptions = {
      headers: myHeaders,
      params: params,
    };
    return this.http.get<R>(url, httpOptions);
  }

  public getString(url: string, params?: HttpParams): Observable<string> {
    const myHeaders = this.generateHttpHeader('GET', url);
    const httpOptions = {
      headers: myHeaders,
      params: params,
    };
    return this.http.get<string>(url, httpOptions);
  }

  public getCache<T = any, R = T>(url: string, params?: HttpParams) {
    const myHeaders = this.getHttpHeaders('GET', url);
    const httpOptions = {
      'Cache-Control': 'max-age=' + 60 * 30,
      headers: myHeaders,
      params: params,
    };
    return this.http.get<R>(url, httpOptions);
  }

  post<T = any, R = any>(
    url: string,
    model?: T,
    params?: HttpParams
  ): Observable<R> {
    const myHeaders = this.generateHttpHeader('POST', url);
    const httpOptions = {
      headers: myHeaders,
      params: params,
    };
    return this.http.post<R>(url, model, httpOptions);
  }

  public howellPost<T = any, R = HowellResponse<T>>(
    url: string,
    model?: T,
    params?: HttpParams
  ): Observable<R> {
    return this.post<T, R>(url, model, params);
  }

  public postBinaryData<T>(url: string, data: BinaryData) {
    const myHeaders = this.generateHttpHeader('POST', url);
    myHeaders.set('Content-Type', 'application/octet-stream');
    const httpOptions = {
      headers: myHeaders,
    };
    return this.http.post<T>(url, data, httpOptions);
  }

  public postReturnString<T = any>(
    url: string,
    model?: T,
    params?: HttpParams
  ): Observable<string> {
    // const myHeaders = this.getHttpHeaders('POST', url);
    const myHeaders = this.generateHttpHeader('POST', url);
    const httpOptions = {
      headers: myHeaders,
      params: params,
    };
    return this.http.post<string>(url, model, httpOptions);
  }

  public postString<T = any, R = HowellResponse<T>>(
    url: string,
    base64: string,
    params?: HttpParams
  ): Observable<R> {
    const myHeaders = this.getHttpHeaders('POST', url);

    const httpOptions = {
      headers: myHeaders,
      params: params,
      'Content-Type': 'text/plain',
    };
    return this.http.post<R>(url, base64, httpOptions);
  }

  public put<T = any, R = any>(url: string, model: T, params?: HttpParams) {
    const myHeaders = this.generateHttpHeader('PUT', url);
    const httpOptions = {
      headers: myHeaders,
      params: params,
    };
    return this.http.put<R>(url, model, httpOptions);
  }

  public howellPut<T = any, R = HowellResponse<T>>(
    url: string,
    model: T,
    params?: HttpParams
  ): Observable<R> {
    return this.put<T, R>(url, model, params);
  }

  delete<R = any>(url: string): Observable<R> {
    const myHeaders = this.generateHttpHeader('DELETE', url);
    const httpOptions = {
      headers: myHeaders,
    };
    return this.http.delete<R>(url, httpOptions);
  }

  public howellDelete<T = any, R = HowellResponse<T>>(
    url: string
  ): Observable<R> {
    return this.delete<R>(url);
  }

  public auth(
    url: string,
    httpHeaders: HttpHeaders
  ): Observable<HowellResponse<any>> {
    const httpOptions = {
      headers: httpHeaders,
    };
    return this.http.get<any>(url, httpOptions);
  }

  downloadFile(
    url: string,
    percent: (percent: number) => void,
    completely: (completely: boolean) => void
  ) {
    const req = new HttpRequest('GET', url, {
      reportProgress: true,
    });

    this.http.request(req).subscribe((event: any) => {
      // Via this API, you get access to the raw event stream.
      // Look for download progress events.
      if (event.type === HttpEventType.DownloadProgress) {
        // This is an download progress event. Compute and show the % done:
        const percentDone = Math.round((100 * event.loaded) / event.total);
        percent(percentDone);
        // console.log(`File is ${percentDone}% downloaded.`);
      } else if (event instanceof HttpResponse) {
        completely(true);
        // console.log('File is completely downloaded!');
      }
    });
  }

  //获取已授权的头部
  getHttpHeaders(method: string, uri: string) {
    let digest = new Digest();
    // user = new SessionUser();
    var challenge = digest.parseServerChallenge();

    return digest.generateRequestHeader(
      this.session.nc,
      challenge,
      '1',
      '1',
      method,
      uri
    );
  }

  generateHttpHeader(method: string, uri: string) {
    let challenge = plainToClass(DigestResponse, this.session.challenge);
    let username = this.session.username;
    let password = this.session.password;
    let authHeader = challenge.ToString(
      method,
      uri,
      username,
      password,
      this.session.nc
    );
    return new HttpHeaders({
      Authorization: authHeader,
      'X-WebBrowser-Authentication': 'Forbidden',
    });
  }
}
