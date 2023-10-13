import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RoutePath } from 'src/app/app-routing.path';
import {
  GlobalStorageService,
  SystemType,
} from 'src/app/common/service/global-storage.service';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { User } from 'src/app/network/model/user.model';
import { AccountOperationDisplay } from './account-operation.model';
import { AccountOperationService } from './account-operation.service';

@Component({
  selector: 'app-account-operation',
  templateUrl: './account-operation.component.html',
  styleUrls: ['./account-operation.component.less'],
  providers: [AccountOperationService],
})
export class AccountOperationComponent implements OnInit {
  @Input() hasGuide: boolean = false;
  @Output() changePassword: EventEmitter<void> = new EventEmitter();
  @Output() bindMobile: EventEmitter<void> = new EventEmitter();
  @Output() guide: EventEmitter<void> = new EventEmitter();

  constructor(
    private session: SessionStorageService,
    private local: LocalStorageService,
    public global: GlobalStorageService,
    private cookie: CookieService,
    private router: Router,
    private service: AccountOperationService
  ) {
    this.user = this.local.user;
  }
  user: User;
  userName: string = '';
  display = new AccountOperationDisplay();
  SystemType = SystemType;

  ngOnInit(): void {
    let userName = this.cookie.get('userName');
    if (!userName) {
      this.router.navigateByUrl(RoutePath.login);
      return;
    }
    userName = atob(userName);

    let res = userName.match(
      /[a-zA-Z0-9+/=]{32}(?<userName>\w*)[a-zA-Z0-9+/=]{32}/
    )!;

    userName = res.groups!['userName'];

    this.userName = userName;

    this.display.changePassword =
      this.global.defaultDivisionType === DivisionType.Committees;
    this.display.bindMobile =
      this.global.defaultDivisionType === DivisionType.Committees;
  }
  logoutHandler() {
    this.session.clear();
    this.local.clear();
    this.global.destroy();
    this.router.navigateByUrl('/login');
    this.service.clear();
    // if (this._cookieService.check('savePassWord')) {
    //   let savePassWord = JSON.parse(this._cookieService.get('savePassWord'));
    //   if (!savePassWord) {
    //     this._cookieService.deleteAll('/');
    //   }
    // }
  }
  navigateToHelp() {
    let index = 1;
    if (this.global.defaultResourceType === UserResourceType.Committees) {
      index = 2;
    }
    window.open(`/help/${index}/help.html`);
  }
  onpasswordchang(event: Event) {
    this.changePassword.emit();
  }
  onmobilebind(event: Event) {
    this.bindMobile.emit();
  }
  toGarbage() {
    this.router.navigateByUrl(RoutePath.garbage_system);
  }
  toVehicle() {
    this.router.navigateByUrl(RoutePath.garbage_vehicle);
  }
  toguide() {
    this.guide.emit();
  }
}
