import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HowellAuthHttpService } from '../../request/howell-auth-http.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Digest } from '../../request/digest';
import { of } from 'rxjs/internal/observable/of';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formGroup = new FormGroup({
    uname: new FormControl('pmx'),
    upass: new FormControl('1212'),
  });
  constructor(private httpService: HowellAuthHttpService) {}

  ngOnInit(): void {}

  login() {
    this.auth();
  }
  auth() {
    return this.httpService
      .auth(
        '/howell/ver10/data_service/user_system/Users/Login/guangzhonglu',
        new HttpHeaders({ 'X-WebBrowser-Authentication': 'Forbidden' })
      )
      .pipe(catchError(this.handleLoginError<any>()))
      .toPromise();
  }
  handleLoginError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error.status == 403) {
        let header = error.headers as Headers,
          userUrl =
            '/howell/ver10/data_service/user_system/Users/Login/guangzhonglu';
        let digest = new Digest(
          header,
          '/howell/ver10/data_service/user_system/'
        );
        var challenge = digest.parseServerChallenge();
        let authHeader = digest.generateRequestHeader(
          1,
          challenge,
          'guangzhonglu',
          'yxotkccu7rc3ai1h',
          'GET',
          userUrl
        );

        this.httpService
          .auth(userUrl, authHeader)
          .pipe(catchError(this.handleLoginError2<any>()))
          .subscribe((result: User) => {
            if (result) {
              console.log(result);
              // sessionStorage.setItem('userid', );
            }
          });
      }
      return of(result as T);
    };
  }

  handleLoginError2<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error.status == 403) {
        console.log(403);
        // MessageBar.response_Error('账号或密码错误');
      }

      return of(result as T);
    };
  }
}
