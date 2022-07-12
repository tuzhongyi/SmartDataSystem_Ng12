import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import Config from 'src/assets/json/system-mode.json';

@Component({
  selector: 'app-system-mode',
  templateUrl: './system-mode.component.html',
  styleUrls: ['./system-mode.component.less'],
})
export class AIOPSystemModeComponent implements OnInit {
  config = Config.data;
  constructor(private _title: Title, private _router: Router) {
    this._title.setTitle('生活垃圾分类全程监管平台');
  }

  ngOnInit(): void { }

  navigate(path: string) {
    // console.log('path', path);
    if (path == '/aiop/aiop-manage/garbage-events') return
    this._router.navigateByUrl(path);
  }
}
