import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';
import { StoreService } from 'src/app/common/service/store.service';
import { AccountOperationDisplay } from './account-operation.model';

@Component({
  selector: 'app-account-operation',
  templateUrl: './account-operation.component.html',
  styleUrls: ['./account-operation.component.less'],
})
export class AccountOperationComponent implements OnInit {
  @Output()
  changePassword: EventEmitter<void> = new EventEmitter();
  @Output()
  bindMobile: EventEmitter<void> = new EventEmitter();

  constructor(
    private _sessionStorageService: SessionStorageService,
    private _localStorageService: LocalStorageService,
    private _store: StoreService,
    private _cookieService: CookieService,
    private _router: Router
  ) {}

  userName: string = '';
  display = new AccountOperationDisplay();

  ngOnInit(): void {
    let userName = this._cookieService.get('userName');
    userName = atob(userName);

    let res = userName.match(
      /[a-zA-Z0-9+/=]{32}(?<userName>\w*)[a-zA-Z0-9+/=]{32}/
    )!;

    userName = res.groups!['userName'];

    this.userName = userName;

    this.display.changePassword =
      this._store.divisionType === DivisionType.Committees;
    this.display.bindMobile =
      this._store.divisionType === DivisionType.Committees;
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
  onpasswordchang(event: Event) {
    this.changePassword.emit();
  }
  onmobilebind(event: Event) {
    this.bindMobile.emit();
  }
}
