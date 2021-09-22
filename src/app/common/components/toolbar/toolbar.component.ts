/*
 * @Author: pmx
 * @Date: 2021-09-15 16:02:14
 * @Last Modified by: pmx
 * @Last Modified time: 2021-09-22 10:09:58
 */
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

import zh from '@angular/common/locales/zh';
import { registerLocaleData } from '@angular/common';

registerLocaleData(zh, 'zh-CN');

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.less'],
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  today: number = Date.now();
  constructor() {
    interval(1000).subscribe((n) => (this.today = Date.now()));
  }

  ngOnInit(): void {}
  ngAfterViewInit() {}
}
