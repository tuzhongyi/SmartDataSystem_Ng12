import { HttpParams } from '@angular/common/http';
import * as fs from 'file-saver';
import { HowellAuthHttpService } from './howell-auth-http.service';
export class ExcelService {
  constructor(private service: HowellAuthHttpService, private url: string) {}
  post(file: any, params?: any): Promise<string> {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.addEventListener('loadend', () => {
        let p = new HttpParams({ fromObject: params });
        this.service
          .post<any, string>(this.url, reader.result, p)
          .toPromise()
          .then((x) => {
            resolve(x);
          })
          .catch((x) => {
            if (x.status === 200) {
              resolve(x.text);
              return;
            }
            reject(x);
          });
      });
    });
  }
  get(filename: string, params?: any) {
    let p = new HttpParams({ fromObject: params });
    return this.service
      .getStream(this.url, p)
      .toPromise()
      .then((data) => {
        let suffix = 'xlsx';
        let blob = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        fs.saveAs(blob, `${filename}.${suffix}`);
      });
  }
}
