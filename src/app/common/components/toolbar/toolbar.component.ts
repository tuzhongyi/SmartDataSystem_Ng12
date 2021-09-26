/*
 * @Author: pmx
 * @Date: 2021-09-15 16:02:14
 * @Last Modified by: pmx
 * @Last Modified time: 2021-09-23 09:35:25
 */
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { interval } from 'rxjs';

import zh from '@angular/common/locales/zh';
import { registerLocaleData } from '@angular/common';
import { ResizedEvent } from 'angular-resize-event';

registerLocaleData(zh, 'zh-CN');

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.less'],
})
export class ToolbarComponent implements OnInit {
  today: number = Date.now();
  showDropDown = false;

  @ViewChild('logout') logout!: ElementRef<HTMLDivElement>;

  @ViewChild('dropdown') dropdown!: ElementRef<HTMLDivElement>;

  @ViewChild('toolbar') toolbar!: ElementRef<HTMLDivElement>;

  constructor(private _render: Renderer2) {
    interval(1000).subscribe((n) => (this.today = Date.now()));
  }

  ngOnInit(): void {}
  toggleDropDownHandler(e: MouseEvent) {
    this.showDropDown = !this.showDropDown;
    e.stopPropagation();

    this.showDropDownMenu();
  }
  /**
   * 如果有滚动条，则必须改成 offsetLeft和offsetParent
   */
  showDropDownMenu() {
    console.log('show drop down menu');
    if (this.logout && this.dropdown) {
      let toolbarDiv = this.toolbar.nativeElement;
      let totalWidth = toolbarDiv.clientWidth;
      let dropDownDiv = this.dropdown.nativeElement;
      let w = 160; //dropDownDiv.clientWidth;
      let x = totalWidth - w;

      let logOutDiv = this.logout.nativeElement;
      let rect = logOutDiv.getBoundingClientRect();
      console.log(rect);
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
    console.log('resize');

    if (this.showDropDown) {
      this.showDropDownMenu();
    }
  }
}
