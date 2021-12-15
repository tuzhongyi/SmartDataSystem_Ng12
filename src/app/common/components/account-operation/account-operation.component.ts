import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LocalStorageService } from 'src/app/global/service/local-storage.service';
import { SessionStorageService } from 'src/app/global/service/session-storage.service';

@Component({
  selector: 'app-account-operation',
  templateUrl: './account-operation.component.html',
  styleUrls: ['./account-operation.component.less'],
})
export class AccountOperationComponent implements OnInit {
  userName: string = '';
  constructor(
    private _sessionStorageService: SessionStorageService,
    private _localStorageService: LocalStorageService,
    private _cookieService: CookieService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    let userName = this._cookieService.get('userName');
    userName = atob(userName);

    let res = userName.match(
      /[a-zA-Z0-9+/=]{32}(?<userName>\w*)[a-zA-Z0-9+/=]{32}/
    )!;

    userName = res.groups!['userName'];

    this.userName = userName;
  }
  logoutHandler() {
    this._sessionStorageService.clear();
    this._localStorageService.clear();
    this._cookieService.deleteAll('/');
    this._router.navigateByUrl('/login');
  }
  navigateToHelp() {
    window.open('http://garbage01.51hws.com/help/help.html');
  }
}
