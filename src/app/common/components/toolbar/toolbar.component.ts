/*
 * @Author: pmx
 * @Date: 2021-09-15 16:02:14
 * @Last Modified by: pmx
 * @Last Modified time: 2021-10-08 16:21:15
 */
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { interval } from 'rxjs';

import zh from '@angular/common/locales/zh';
import { registerLocaleData } from '@angular/common';
import { ResizedEvent } from 'angular-resize-event';
import { SessionStorageService } from 'src/app/global/service/session-storage.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/global/service/local-storage.service';

registerLocaleData(zh, 'zh-CN');

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.less'],
})
export class ToolbarComponent implements OnInit {
  today: number = Date.now();

  divisionTitle: string = '';
  userName: string = '';

  @ViewChild('logout') logout!: ElementRef<HTMLDivElement>;

  @ViewChild('dropdown') dropdown!: ElementRef<HTMLDivElement>;

  @ViewChild('toolbar') toolbar!: ElementRef<HTMLDivElement>;

  @Input() showDropDown = false;

  constructor(
    private _render: Renderer2,
    private _sessionStorageService: SessionStorageService,
    private _localStorageService: LocalStorageService,

    private _cookieService: CookieService,
    private _router: Router
  ) {
    interval(1000).subscribe((n) => (this.today = Date.now()));
  }

  ngOnInit(): void {
    let userResource = this._localStorageService.userResource;
    // console.log(userResource);
    this.divisionTitle = userResource[0]['Name'] ?? '';
    let userName = this._cookieService.get('userName');
    // console.log(userName);
    userName = atob(userName);
    // console.log(userName);
    let res = userName.match(
      /[a-zA-Z0-9+/=]{32}(?<userName>\w*)[a-zA-Z0-9+/=]{32}/
    )!;
    // console.log(res);
    userName = res.groups!['userName'];
    // console.log(userName);
    this.userName = userName;
  }
  toggleDropDownHandler(e: MouseEvent) {
    this.showDropDown = !this.showDropDown;
    e.stopPropagation();

    this.showDropDownMenu();
  }
  /**
   * 如果有滚动条，则必须改成 offsetLeft和offsetParent
   */
  showDropDownMenu() {
    // console.log('show drop down menu');
    if (this.logout && this.dropdown) {
      let toolbarDiv = this.toolbar.nativeElement;
      let totalWidth = toolbarDiv.clientWidth;
      let dropDownDiv = this.dropdown.nativeElement;
      let w = 160; //dropDownDiv.clientWidth;
      let x = totalWidth - w;

      let logOutDiv = this.logout.nativeElement;
      let rect = logOutDiv.getBoundingClientRect();
      // console.log(rect);
      let offsetX = rect.left;
      let offsetY = rect.top + rect.height + 10;
      if (offsetX > x) {
        offsetX = x;
      }
      this._render.setStyle(
        this.dropdown.nativeElement,
        'transform',
        `translate(${offsetX}px,${offsetY}px)`
      );
    }
  }
  onResized(e: ResizedEvent) {
    // console.log('resize');

    if (this.showDropDown) {
      this.showDropDownMenu();
    }
  }
  /**
   *  一定要传path参数
   */
  logoutHandler() {
    this._sessionStorageService.clear();
    this._localStorageService.clear();
    this._cookieService.deleteAll('/');
    this._router.navigateByUrl('/login');
    // console.log('删除cookie');
  }
  navigateToHelp() {
    // window.location.href = 'http://garbage01.51hws.com/help/help.html';
    window.open('http://garbage01.51hws.com/help/help.html');
  }
}
